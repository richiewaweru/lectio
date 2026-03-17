// Capacity warnings — not hard errors, just console warnings
// Prevents content from quietly overflowing components

import type { SectionContent } from './types';
import type { ComparisonGridContent, TimelineContent } from './types';

function words(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

function warn(location: string, message: string): string {
	return `[Lectio/${location}] ${message}`;
}

function validateComparisonGrid(content: ComparisonGridContent, warnings: string[]) {
	if (words(content.title) > 10) warnings.push(warn('ComparisonGrid', 'title exceeds 10 words'));
	if (content.intro && words(content.intro) > 60)
		warnings.push(warn('ComparisonGrid', 'intro exceeds 60 words'));
	if (content.columns.length < 2 || content.columns.length > 4)
		warnings.push(
			warn('ComparisonGrid', `has ${content.columns.length} columns; expected between 2 and 4`)
		);

	content.columns.forEach((column, index) => {
		if (words(column.title) > 6)
			warnings.push(warn('ComparisonGrid', `column ${index + 1} title exceeds 6 words`));
		if (words(column.summary) > 24)
			warnings.push(warn('ComparisonGrid', `column ${index + 1} summary exceeds 24 words`));
		if (column.detail && words(column.detail) > 50)
			warnings.push(warn('ComparisonGrid', `column ${index + 1} detail exceeds 50 words`));
	});

	if (content.rows.length > 6)
		warnings.push(warn('ComparisonGrid', `has ${content.rows.length} rows; max is 6`));

	content.rows.forEach((row, index) => {
		if (words(row.criterion) > 8)
			warnings.push(warn('ComparisonGrid', `row ${index + 1} criterion exceeds 8 words`));
		if (row.values.length !== content.columns.length)
			warnings.push(
				warn(
					'ComparisonGrid',
					`row ${index + 1} has ${row.values.length} values; expected ${content.columns.length}`
				)
			);
		row.values.forEach((value, valueIndex) => {
			if (words(value) > 20)
				warnings.push(
					warn('ComparisonGrid', `row ${index + 1} value ${valueIndex + 1} exceeds 20 words`)
				);
		});
		if (row.takeaway && words(row.takeaway) > 24)
			warnings.push(warn('ComparisonGrid', `row ${index + 1} takeaway exceeds 24 words`));
	});
}

function validateTimeline(content: TimelineContent, warnings: string[]) {
	if (words(content.title) > 10) warnings.push(warn('TimelineBlock', 'title exceeds 10 words'));
	if (content.intro && words(content.intro) > 60)
		warnings.push(warn('TimelineBlock', 'intro exceeds 60 words'));
	if (content.events.length < 3) warnings.push(warn('TimelineBlock', 'requires at least 3 events'));
	if (content.events.length > 8)
		warnings.push(warn('TimelineBlock', `has ${content.events.length} events; max is 8`));

	content.events.forEach((event, index) => {
		if (words(event.title) > 8)
			warnings.push(warn('TimelineBlock', `event ${index + 1} title exceeds 8 words`));
		if (words(event.summary) > 50)
			warnings.push(warn('TimelineBlock', `event ${index + 1} summary exceeds 50 words`));
		if (event.impact && words(event.impact) > 24)
			warnings.push(warn('TimelineBlock', `event ${index + 1} impact exceeds 24 words`));
		if (event.tags && event.tags.length > 3)
			warnings.push(
				warn('TimelineBlock', `event ${index + 1} has ${event.tags.length} tags; max is 3`)
			);
	});

	if (content.closing_takeaway && words(content.closing_takeaway) > 40)
		warnings.push(warn('TimelineBlock', 'closing_takeaway exceeds 40 words'));
}

export function validateSection(section: SectionContent): string[] {
	const w: string[] = [];

	// Header
	if (words(section.header.title) > 12)
		w.push(warn('SectionHeader', 'title exceeds 12 words'));
	if (section.header.objective && words(section.header.objective) > 30)
		w.push(warn('SectionHeader', 'objective exceeds 30 words'));

	// Hook
	if (words(section.hook.headline) > 12)
		w.push(warn('HookHero', 'headline exceeds 12 words'));
	if (words(section.hook.body) > 80)
		w.push(warn('HookHero', 'body exceeds 80 words'));
	if (section.hook.question_options && section.hook.question_options.length > 3)
		w.push(warn('HookHero', 'question_options max 3'));

	// Explanation
	if (words(section.explanation.body) > 350)
		w.push(warn('ExplanationBlock', 'body exceeds 350 words'));
	if (section.explanation.emphasis.length > 3)
		w.push(warn('ExplanationBlock', 'emphasis max 3 items'));
	if (section.explanation.callouts) {
		if (section.explanation.callouts.length > 3)
			w.push(warn('ExplanationBlock', 'callouts max 3'));
		section.explanation.callouts.forEach((c, i) => {
			if (words(c.text) > 60)
				w.push(warn(`ExplanationBlock callout ${i + 1}`, 'text exceeds 60 words'));
		});
	}

	// Prerequisites
	if (section.prerequisites && section.prerequisites.items.length > 4)
		w.push(warn('PrerequisiteStrip', 'items max 4'));

	// Definition
	if (section.definition) {
		if (words(section.definition.formal) > 80)
			w.push(warn('DefinitionCard', 'formal exceeds 80 words'));
		if (words(section.definition.plain) > 60)
			w.push(warn('DefinitionCard', 'plain exceeds 60 words'));
		if (section.definition.examples) {
			if (section.definition.examples.length > 3)
				w.push(warn('DefinitionCard', 'examples max 3'));
			section.definition.examples.forEach((ex, i) => {
				if (words(ex) > 30)
					w.push(warn(`DefinitionCard example ${i + 1}`, 'exceeds 30 words'));
			});
		}
	}

	// Definition family
	if (section.definition_family) {
		if (section.definition_family.definitions.length > 4)
			w.push(warn('DefinitionFamily', 'definitions max 4'));
	}

	// Worked example(s)
	const examples = [
		...(section.worked_example ? [section.worked_example] : []),
		...(section.worked_examples ?? []),
	];
	examples.forEach((ex, ei) => {
		const label = `WorkedExampleCard[${ei}]`;
		if (ex.steps.length > 6) w.push(warn(label, 'steps max 6'));
		else if (ex.steps.length > 4)
			w.push(warn(label, `${ex.steps.length} steps — consider trimming (warning at 4)`));
		ex.steps.forEach((s, si) => {
			if (words(s.label) > 12)
				w.push(warn(`${label} step ${si + 1}`, 'label exceeds 12 words'));
			if (words(s.content) > 80)
				w.push(warn(`${label} step ${si + 1}`, 'content exceeds 80 words'));
		});
	});

	// Process
	if (section.process) {
		if (section.process.steps.length > 8) w.push(warn('ProcessSteps', 'steps max 8'));
	}

	// Pitfall(s)
	const pitfalls = [
		...(section.pitfall ? [section.pitfall] : []),
		...(section.pitfalls ?? []),
	];
	pitfalls.forEach((p, i) => {
		if (words(p.misconception) > 20)
			w.push(warn(`PitfallAlert[${i}]`, 'misconception exceeds 20 words'));
		if (words(p.correction) > 80)
			w.push(warn(`PitfallAlert[${i}]`, 'correction exceeds 80 words'));
	});

	// Practice
	if (section.practice.problems.length < 2)
		w.push(warn('PracticeStack', 'minimum 2 problems'));
	if (section.practice.problems.length > 5)
		w.push(warn('PracticeStack', 'maximum 5 problems'));
	section.practice.problems.forEach((p, i) => {
		if (words(p.question) > 100)
			w.push(warn(`PracticeStack problem ${i + 1}`, 'question exceeds 100 words'));
		if (p.hints.length > 3)
			w.push(warn(`PracticeStack problem ${i + 1}`, 'hints max 3'));
		p.hints.forEach((h, hi) => {
			if (words(h.text) > 60)
				w.push(warn(`PracticeStack problem ${i + 1} hint ${hi + 1}`, 'hint exceeds 60 words'));
		});
	});

	// Insight strip
	if (section.insight_strip) {
		if (section.insight_strip.cells.length > 3)
			w.push(warn('InsightStrip', 'cells max 3'));
		if (section.insight_strip.cells.length < 2)
			w.push(warn('InsightStrip', 'cells min 2'));
	}

	if (section.comparison_grid) {
		validateComparisonGrid(section.comparison_grid, w);
	}

	// Glossary
	if (section.glossary) {
		if (section.glossary.terms.length > 8)
			w.push(warn('GlossaryRail', 'terms max 8'));
		else if (section.glossary.terms.length > 6)
			w.push(
				warn(
					'GlossaryRail',
					`${section.glossary.terms.length} terms — approaching limit (warning at 6)`
				)
			);
		section.glossary.terms.forEach((t, i) => {
			if (words(t.definition) > 30)
				w.push(warn(`GlossaryRail term ${i + 1}`, 'definition exceeds 30 words'));
		});
	}

	if (section.timeline) {
		validateTimeline(section.timeline, w);
	}

	// What next
	if (words(section.what_next.body) > 50)
		w.push(warn('WhatNextBridge', 'body exceeds 50 words'));

	return w;
}

// Call this in dev — shows warnings in console
export function warnIfInvalid(section: SectionContent): void {
	if (typeof window === 'undefined') return;
	const warnings = validateSection(section);
	if (warnings.length === 0) return;
	console.group('[Lectio] Content validation warnings');
	warnings.forEach((msg) => console.warn(msg));
	console.groupEnd();
}
