// Capacity warnings — not hard errors, just console warnings
// Prevents content from quietly overflowing components

import type { SectionContent } from './types';

function countWords(text: string): number {
	return text.trim().split(/\s+/).length;
}

export function validateSection(section: SectionContent): string[] {
	const warnings: string[] = [];

	// Hook
	if (countWords(section.hook.headline) > 12)
		warnings.push(`HookHero: headline exceeds 12 words (${countWords(section.hook.headline)})`);
	if (countWords(section.hook.body) > 80)
		warnings.push(`HookHero: body exceeds 80 words (${countWords(section.hook.body)})`);

	// Explanation
	if (countWords(section.explanation.body) > 350)
		warnings.push(`ExplanationBlock: body exceeds 350 words`);
	if (section.explanation.emphasis.length > 3)
		warnings.push(`ExplanationBlock: more than 3 emphasis items`);

	// Definition
	if (section.definition) {
		if (countWords(section.definition.formal) > 80)
			warnings.push(`DefinitionCard: formal definition exceeds 80 words`);
		if (countWords(section.definition.plain) > 60)
			warnings.push(`DefinitionCard: plain definition exceeds 60 words`);
	}

	// Worked example
	if (section.worked_example) {
		const ex = section.worked_example;
		if (ex.steps.length > 6) warnings.push(`WorkedExampleCard: ${ex.steps.length} steps — max is 6`);
		else if (ex.steps.length > 4)
			warnings.push(`WorkedExampleCard: ${ex.steps.length} steps — consider trimming to 4`);
		ex.steps.forEach((step, i) => {
			if (countWords(step.label) > 12)
				warnings.push(`WorkedExampleCard step ${i + 1}: label exceeds 12 words`);
			if (countWords(step.content) > 80)
				warnings.push(`WorkedExampleCard step ${i + 1}: content exceeds 80 words`);
		});
	}

	// Practice
	section.practice.problems.forEach((p, i) => {
		if (countWords(p.question) > 100)
			warnings.push(`PracticeStack problem ${i + 1}: question exceeds 100 words`);
		if (countWords(p.hint) > 60)
			warnings.push(`PracticeStack problem ${i + 1}: hint exceeds 60 words`);
	});

	// Glossary
	if (section.glossary) {
		if (section.glossary.terms.length > 8)
			warnings.push(`GlossaryRail: ${section.glossary.terms.length} terms — max is 8`);
		else if (section.glossary.terms.length > 6)
			warnings.push(`GlossaryRail: ${section.glossary.terms.length} terms — consider trimming to 6`);
		section.glossary.terms.forEach((t, i) => {
			if (countWords(t.definition) > 30)
				warnings.push(`GlossaryRail term ${i + 1}: definition exceeds 30 words`);
		});
	}

	return warnings;
}

// Call this in dev — shows warnings in console
export function warnIfInvalid(section: SectionContent): void {
	if (typeof window === 'undefined') return;
	const warnings = validateSection(section);
	warnings.forEach((w) => console.warn(`[Lectio] ${w}`));
}
