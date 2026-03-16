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
	if (section.explanation.callouts) {
		if (section.explanation.callouts.length > 3)
			warnings.push(`ExplanationBlock: more than 3 callouts`);
		section.explanation.callouts.forEach((c, i) => {
			if (countWords(c.text) > 60)
				warnings.push(`ExplanationBlock callout ${i + 1}: text exceeds 60 words`);
		});
	}

	// Definition
	if (section.definition) {
		if (countWords(section.definition.formal) > 80)
			warnings.push(`DefinitionCard: formal definition exceeds 80 words`);
		if (countWords(section.definition.plain) > 60)
			warnings.push(`DefinitionCard: plain definition exceeds 60 words`);
		if (section.definition.examples) {
			if (section.definition.examples.length > 3)
				warnings.push(`DefinitionCard: more than 3 usage examples`);
			section.definition.examples.forEach((ex, i) => {
				if (countWords(ex) > 30)
					warnings.push(`DefinitionCard example ${i + 1}: exceeds 30 words`);
			});
		}
		if (section.definition.related_terms && section.definition.related_terms.length > 4)
			warnings.push(`DefinitionCard: more than 4 related terms`);
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
		if (ex.answer && countWords(ex.answer) > 30)
			warnings.push(`WorkedExampleCard: answer exceeds 30 words`);
		if (ex.alternatives) {
			if (ex.alternatives.length > 3)
				warnings.push(`WorkedExampleCard: more than 3 alternatives`);
			ex.alternatives.forEach((alt, i) => {
				if (countWords(alt) > 40)
					warnings.push(`WorkedExampleCard alternative ${i + 1}: exceeds 40 words`);
			});
		}
	}

	// Practice
	if (section.practice.problems.length > 6)
		warnings.push(`PracticeStack: ${section.practice.problems.length} problems — max is 6`);
	else if (section.practice.problems.length > 4)
		warnings.push(`PracticeStack: ${section.practice.problems.length} problems — consider trimming to 4`);
	section.practice.problems.forEach((p, i) => {
		if (countWords(p.question) > 100)
			warnings.push(`PracticeStack problem ${i + 1}: question exceeds 100 words`);
		if (countWords(p.hint) > 60)
			warnings.push(`PracticeStack problem ${i + 1}: hint exceeds 60 words`);
		if (p.hints) {
			if (p.hints.length > 3)
				warnings.push(`PracticeStack problem ${i + 1}: more than 3 tiered hints`);
			p.hints.forEach((h, j) => {
				if (countWords(h) > 60)
					warnings.push(`PracticeStack problem ${i + 1} hint ${j + 1}: exceeds 60 words`);
			});
		}
		if (p.answer && countWords(p.answer) > 40)
			warnings.push(`PracticeStack problem ${i + 1}: answer exceeds 40 words`);
		if (p.solution && countWords(p.solution) > 120)
			warnings.push(`PracticeStack problem ${i + 1}: solution exceeds 120 words`);
	});

	// Pitfall
	if (section.pitfall) {
		if (section.pitfall.why && countWords(section.pitfall.why) > 60)
			warnings.push(`PitfallAlert: why field exceeds 60 words`);
		if (section.pitfall.examples) {
			if (section.pitfall.examples.length > 3)
				warnings.push(`PitfallAlert: more than 3 examples`);
			section.pitfall.examples.forEach((ex, i) => {
				if (countWords(ex) > 40)
					warnings.push(`PitfallAlert example ${i + 1}: exceeds 40 words`);
			});
		}
	}

	// Glossary
	if (section.glossary) {
		if (section.glossary.terms.length > 8)
			warnings.push(`GlossaryRail: ${section.glossary.terms.length} terms — max is 8`);
		else if (section.glossary.terms.length > 6)
			warnings.push(`GlossaryRail: ${section.glossary.terms.length} terms — consider trimming to 6`);
		section.glossary.terms.forEach((t, i) => {
			if (countWords(t.definition) > 30)
				warnings.push(`GlossaryRail term ${i + 1}: definition exceeds 30 words`);
			if (t.related && t.related.length > 3)
				warnings.push(`GlossaryRail term ${i + 1}: more than 3 related terms`);
		});
	}

	// WhatNext
	if (section.what_next.prerequisites && section.what_next.prerequisites.length > 4)
		warnings.push(`WhatNextBridge: more than 4 prerequisites`);

	return warnings;
}

// Call this in dev — shows warnings in console
export function warnIfInvalid(section: SectionContent): void {
	if (typeof window === 'undefined') return;
	const warnings = validateSection(section);
	warnings.forEach((w) => console.warn(`[Lectio] ${w}`));
}
