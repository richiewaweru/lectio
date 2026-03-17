import { basePresetMap } from "$lib/presets/base-presets";
import { componentRegistry } from "$lib/registry";
import type {
  TemplateContract,
  TemplateDefinition,
  TemplateValidationResult
} from "$lib/template-types";
import type { SectionContent } from "$lib/types";

const componentFieldMap: Record<string, keyof SectionContent | "header"> = {
  "section-header": "header",
  "hook-hero": "hook",
  "explanation-block": "explanation",
  "prerequisite-strip": "prerequisites",
  "what-next-bridge": "what_next",
  "interview-anchor": "interview",
  "definition-card": "definition",
  "definition-family": "definition_family",
  "glossary-rail": "glossary",
  "glossary-inline": "glossary",
  "insight-strip": "insight_strip",
  "worked-example-card": "worked_example",
  "process-steps": "process",
  "practice-stack": "practice",
  "quiz-check": "quiz",
  "reflection-prompt": "reflection",
  "pitfall-alert": "pitfall",
  "diagram-block": "diagram",
  "diagram-compare": "diagram_compare",
  "diagram-series": "diagram_series",
  "comparison-grid": "comparison_grid",
  "timeline-block": "timeline"
};

function findComponentMeta(componentId: string) {
  return Object.values(componentRegistry).find(
    (component) => component.id === componentId
  );
}

function hasPreviewField(section: SectionContent, componentId: string) {
  const field = componentFieldMap[componentId];

  if (!field) {
    return false;
  }

  if (field === "header") {
    return Boolean(section.header);
  }

  return Boolean(section[field]);
}

export function validateTemplateContract(contract: TemplateContract): TemplateValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!contract.tagline.trim()) {
    errors.push(`${contract.id}: tagline is required.`);
  }

  if (!contract.bestFor.length || !contract.notIdealFor.length) {
    errors.push(`${contract.id}: bestFor and notIdealFor are required.`);
  }

  if (!contract.requiredComponents.length) {
    errors.push(`${contract.id}: requiredComponents must not be empty.`);
  }

  const componentIds = [
    ...contract.requiredComponents,
    ...contract.optionalComponents
  ];

  for (const componentId of componentIds) {
    const componentMeta = findComponentMeta(componentId);

    if (!componentMeta) {
      errors.push(`${contract.id}: unknown component "${componentId}".`);
    }
  }

  for (const [componentId, behaviour] of Object.entries(contract.defaultBehaviours)) {
    const componentMeta = findComponentMeta(componentId);

    if (!componentMeta) {
      errors.push(`${contract.id}: behaviour set for unknown component "${componentId}".`);
      continue;
    }

    if (!behaviour) {
      continue;
    }

    if (!componentMeta.behaviourModes.includes(behaviour)) {
      errors.push(
        `${contract.id}: behaviour "${behaviour}" is not supported by "${componentId}".`
      );
    }
  }

  for (const presetId of contract.allowedPresets) {
    if (!basePresetMap[presetId]) {
      errors.push(`${contract.id}: unknown preset "${presetId}".`);
    }
  }

  if (contract.interactionLevel === "none" && Object.keys(contract.defaultBehaviours).length) {
    warnings.push(
      `${contract.id}: interactionLevel is "none" but defaultBehaviours is not empty.`
    );
  }

  return { errors, warnings };
}

export function validateTemplatePreview(
  definition: TemplateDefinition
): TemplateValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const componentId of definition.contract.requiredComponents) {
    if (!hasPreviewField(definition.preview.section, componentId)) {
      errors.push(
        `${definition.contract.id}: preview is missing content for required component "${componentId}".`
      );
    }
  }

  return { errors, warnings };
}

export function validateTemplateDefinition(
  definition: TemplateDefinition
): TemplateValidationResult {
  const contractResult = validateTemplateContract(definition.contract);
  const previewResult = validateTemplatePreview(definition);

  return {
    errors: [...contractResult.errors, ...previewResult.errors],
    warnings: [...contractResult.warnings, ...previewResult.warnings]
  };
}
