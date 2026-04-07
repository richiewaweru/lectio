import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import HookHero from '$lib/components/lectio/HookHero.svelte';
import DefinitionFamily from '$lib/components/lectio/DefinitionFamily.svelte';
import DiagramBlock from '$lib/components/lectio/DiagramBlock.svelte';
import DiagramSeries from '$lib/components/lectio/DiagramSeries.svelte';
import DiagramCompare from '$lib/components/lectio/DiagramCompare.svelte';
import GlossaryInline from '$lib/components/lectio/GlossaryInline.svelte';
import PrerequisiteStrip from '$lib/components/lectio/PrerequisiteStrip.svelte';
import QuizCheck from '$lib/components/lectio/QuizCheck.svelte';
import SimulationBlock from '$lib/components/lectio/SimulationBlock.svelte';
import GuidedConceptPath from '$lib/templates/GuidedConceptPath.svelte';
import EnrichedLearningPath from '$lib/templates/EnrichedLearningPath.svelte';
import InteractiveLabLayout from '$lib/templates/interactive-lab/layout.svelte';
import { calculusSection, physicsSection } from '$lib/dummy-content';
import { componentRegistry, getComponentFieldMap, getStableComponents } from '$lib/registry';
import { validateSection } from '$lib/validate';

const repeatWords = (word: string, count: number) =>
	Array.from({ length: count }, () => word).join(' ');
const primarySimulation = physicsSection.simulations![0];

describe('Lectio component harmonization', () => {
	it('renders inline hook SVG ahead of image fallback when both are present', () => {
		const { container } = render(HookHero, {
			props: {
				content: {
					headline: 'Why does the line tip so sharply?',
					body: 'The visual should render directly in the attached panel.',
					anchor: 'slope changing at a point',
					svg_content:
						'<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><text x="10" y="45">Visual hook</text></svg>',
					image: {
						url: '/images/fallback.png',
						alt: 'Fallback illustration'
					}
				}
			}
		});

		expect(container.querySelector('svg')).toBeInTheDocument();
		expect(container.querySelector('img')).not.toBeInTheDocument();
		expect(screen.getByText('Visual intuition')).toBeInTheDocument();
	});

	it('renders definition families as accordion triggers with expandable content', async () => {
		render(DefinitionFamily, {
			props: { content: physicsSection.definition_family! }
		});

		const trigger = screen.getByRole('button', { name: /Mass \(m\)/i });
		expect(trigger).toBeInTheDocument();

		await fireEvent.click(trigger);

		expect(screen.getByText(/How much stuff is in an object/i)).toBeInTheDocument();
	});

	it('keeps diagram series progress and navigation in sync', async () => {
		render(DiagramSeries, {
			props: { content: physicsSection.diagram_series! }
		});

		expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
		expect(screen.getByText('How mass affects acceleration')).toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: /Next/i }));

		expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
		expect(
			screen.getByText('Applying force F to mass m produces acceleration a = F/m.')
		).toBeInTheDocument();
	});

	it('renders image-backed diagram series steps without requiring SVG markup', () => {
		const imageSeries = {
			title: 'Image-backed steps',
			diagrams: [
				{
					step_label: 'Observation',
					caption: 'A raster step for the series.',
					image_url: 'https://example.com/series-step-1.png'
				}
			]
		};
		const { container } = render(DiagramSeries, {
			props: { content: imageSeries }
		});

		const img = container.querySelector('img');
		expect(img).toBeInTheDocument();
		expect(img?.getAttribute('src')).toBe('https://example.com/series-step-1.png');
		expect(img?.getAttribute('alt')).toBe('A raster step for the series.');
		expect(container.querySelector('svg')).not.toBeInTheDocument();
	});

	it('keeps mixed image and SVG series steps in sync while navigating', async () => {
		render(DiagramSeries, {
			props: {
				content: {
					title: 'Mixed steps',
					diagrams: [
						{
							step_label: 'Photo step',
							caption: 'The first step uses a generated image.',
							image_url: 'https://example.com/series-step-1.png'
						},
						{
							step_label: 'SVG step',
							caption: 'The second step falls back to inline SVG.',
							svg_content:
								'<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><text x="10" y="35">Series SVG</text></svg>'
						}
					]
				}
			}
		});

		expect(screen.getByRole('img', { name: 'The first step uses a generated image.' })).toBeInTheDocument();
		expect(screen.queryByText('Series SVG')).not.toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: /Next/i }));

		expect(screen.getByText('Step 2 of 2')).toBeInTheDocument();
		expect(screen.getByText('Series SVG')).toBeInTheDocument();
		expect(screen.queryByRole('img', { name: 'The first step uses a generated image.' })).not.toBeInTheDocument();
	});

	it('recovers when the diagrams array shrinks after the current step is selected', async () => {
		const { rerender } = render(DiagramSeries, {
			props: { content: physicsSection.diagram_series! }
		});

		await fireEvent.click(screen.getByRole('button', { name: /Next/i }));
		expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();

		await rerender({
			content: {
				...physicsSection.diagram_series!,
				diagrams: [physicsSection.diagram_series!.diagrams[0]]
			}
		});

		expect(screen.getByText('Step 1 of 1')).toBeInTheDocument();
		expect(screen.getByText('An object at rest with no applied force remains at rest (First Law).')).toBeInTheDocument();
	});

	it('reveals after-state details progressively in diagram compare', async () => {
		render(DiagramCompare, {
			props: { content: physicsSection.diagram_compare! }
		});

		expect(
			screen.getByText('Move the slider to begin revealing what changes in the after state.')
		).toBeInTheDocument();

		const slider = screen.getByLabelText('Reveal the after state');
		await fireEvent.input(slider, { target: { value: '50' } });

		expect(screen.getByText('Mass is still 5 kg.')).toBeInTheDocument();
		expect(screen.queryByText('Move the slider to begin revealing what changes in the after state.')).not.toBeInTheDocument();
	});

	it('renders labeled diagram callout buttons with guidance text', () => {
		const { container } = render(DiagramBlock, {
			props: { content: physicsSection.diagram! }
		});

		const calloutButtons = Array.from(
			container.querySelectorAll<HTMLButtonElement>('button[data-popover-trigger]')
		).map((button) => button.getAttribute('aria-label'));

		expect(calloutButtons).toContain('Applied force');
		expect(calloutButtons).toContain('Friction');
		expect(calloutButtons).toContain('Net force');
		expect(
			screen.getByText(/Tap a numbered point to see the labeled detail/i)
		).toBeInTheDocument();
	});

	it('opens diagram inspect content in a centered viewport-bounded dialog', async () => {
		render(DiagramBlock, {
			props: { content: physicsSection.diagram! }
		});

		await fireEvent.click(screen.getByRole('img', { name: physicsSection.diagram!.alt_text }));

		expect(screen.getAllByRole('img', { name: physicsSection.diagram!.alt_text })).toHaveLength(2);
		expect(screen.getAllByText(physicsSection.diagram!.caption)).toHaveLength(2);

		const centeredDialog = Array.from(document.body.querySelectorAll<HTMLElement>('div')).find(
			(element) =>
				element.className.includes('fixed') &&
				element.className.includes('left-1/2') &&
				element.className.includes('top-1/2')
		);

		expect(centeredDialog).toBeTruthy();
		expect(centeredDialog?.className).toContain('-translate-x-1/2');
		expect(centeredDialog?.className).toContain('-translate-y-1/2');
		expect(centeredDialog?.className).toContain('overflow-y-auto');
	});

	it('renders image-backed diagrams as a plain figure without a zoom dialog', async () => {
		const imageDiagram = {
			caption: 'A raster-backed diagram.',
			alt_text: 'Raster diagram fallback',
			image_url: 'https://example.com/diagram.png',
			svg_content: ''
		};
		const { container } = render(DiagramBlock, { props: { content: imageDiagram } });

		// Image rendered inside a <figure>
		const img = container.querySelector('figure img');
		expect(img).toBeInTheDocument();
		expect(img?.getAttribute('alt')).toBe(imageDiagram.alt_text);
		expect(img?.getAttribute('src')).toBe(imageDiagram.image_url);

		// Caption in <figcaption>
		expect(container.querySelector('figcaption')).toHaveTextContent(imageDiagram.caption);

		// No Dialog opened
		expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();

		// No callout guidance text
		expect(screen.queryByText(/Tap a numbered point/i)).not.toBeInTheDocument();
	});

	it('renders hook-image content when no inline SVG is supplied', () => {
		const { container } = render(HookHero, {
			props: {
				content: {
					headline: 'A real-world visual arrives first',
					body: 'This hook should render with the generated image path only.',
					anchor: 'connect the idea to a concrete scene',
					image: {
						url: '/images/hook-realism.png',
						alt: 'A concrete realism hook'
					}
				}
			}
		});

		const img = container.querySelector('img');
		expect(img).toBeInTheDocument();
		expect(img?.getAttribute('src')).toBe('/images/hook-realism.png');
		expect(img?.getAttribute('alt')).toBe('A concrete realism hook');
		expect(container.querySelector('svg')).not.toBeInTheDocument();
		expect(screen.getByText('Visual intuition')).toBeInTheDocument();
	});

	it('evaluates quiz answers immediately and resets with Try again', async () => {
		render(QuizCheck, {
			props: { content: physicsSection.quiz! }
		});

		await fireEvent.click(screen.getByRole('button', { name: /^0\.25 m\/s²/i }));

		expect(screen.getByText('Not quite!')).toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

		expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
	});

	it('renders the simulation block with live content and metadata', () => {
		render(SimulationBlock, {
			props: { content: primarySimulation }
		});

		expect(screen.getByText('Manipulate and discover')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Expand simulation/i })).toBeInTheDocument();
		expect(screen.getByTitle(primarySimulation.spec.goal)).toBeInTheDocument();
		expect(screen.getAllByText('graph slider').length).toBeGreaterThan(0);
		expect(screen.getByText('static_diagram')).toBeInTheDocument();
	});

	it('renders multiple simulations in high-interaction templates', () => {
		const secondSimulation = {
			...primarySimulation,
			explanation: 'A second simulation reinforces the same law from another angle.',
			spec: {
				...primarySimulation.spec,
				goal: 'Observe how a second interaction compares force and acceleration.'
			}
		};

		render(InteractiveLabLayout, {
			props: {
				section: {
					...physicsSection,
					simulations: [primarySimulation, secondSimulation]
				}
			}
		});

		expect(screen.getAllByRole('button', { name: /Expand simulation/i })).toHaveLength(2);
	});

	it('still renders a legacy singular simulation once', () => {
		render(InteractiveLabLayout, {
			props: {
				section: {
					...physicsSection,
					simulations: undefined,
					simulation: primarySimulation
				}
			}
		});

		expect(screen.getAllByRole('button', { name: /Expand simulation/i })).toHaveLength(1);
	});

	it('adds descriptive aria-labels to refresher and glossary triggers', () => {
		render(PrerequisiteStrip, {
			props: {
				content: {
					label: 'Before we begin',
					items: [{ concept: 'Force', refresher: 'A push or pull.' }]
				}
			}
		});
		render(GlossaryInline, {
			props: {
				term: 'Derivative',
				definition: 'The local slope at a point.'
			}
		});

		expect(screen.getByRole('button', { name: 'Show refresher for Force' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Definition of Derivative' })).toBeInTheDocument();
	});

	it('reports the new validation coverage for simulation, diagrams, quiz, reflection, interview, and what-next content', () => {
		const oversizedCallouts = Array.from({ length: 7 }, (_, index) => ({
			...physicsSection.diagram!.callouts![0],
			id: `callout-${index}`
		}));
		const warnings = validateSection({
			...physicsSection,
			interview: {
				...physicsSection.interview!,
				prompt: repeatWords('prompt', 36),
				audience: repeatWords('audience', 11),
				follow_up: repeatWords('follow', 26)
			},
			quiz: {
				...physicsSection.quiz!,
				question: repeatWords('question', 61),
				options: [
					{
						...physicsSection.quiz!.options[0],
						text: repeatWords('option', 21),
						explanation: repeatWords('explanation', 41)
					},
					...physicsSection.quiz!.options.slice(1),
					{
						text: 'Extra option',
						correct: false,
						explanation: 'Extra explanation'
					}
				],
				feedback_correct: repeatWords('correct', 31),
				feedback_incorrect: repeatWords('incorrect', 31)
			},
			reflection: {
				...physicsSection.reflection!,
				prompt: repeatWords('reflection', 41),
				space: 7
			},
			diagram: {
				...physicsSection.diagram!,
				caption: repeatWords('caption', 61),
				alt_text: repeatWords('alt', 81),
				callouts: oversizedCallouts
			},
			diagram_compare: {
				...physicsSection.diagram_compare!,
				before_label: repeatWords('before', 7),
				after_label: repeatWords('after', 7),
				caption: repeatWords('compare', 61)
			},
			diagram_series: {
				...physicsSection.diagram_series!,
				title: repeatWords('series', 11),
				diagrams: [
					{
						...physicsSection.diagram_series!.diagrams[0],
						step_label: repeatWords('step', 9),
						caption: repeatWords('seriescaption', 41)
					},
					...physicsSection.diagram_series!.diagrams.slice(1),
					physicsSection.diagram_series!.diagrams[0],
					physicsSection.diagram_series!.diagrams[1]
				]
			},
			simulations: [
				{
					...primarySimulation,
					explanation: repeatWords('simulation', 61),
					spec: {
						...primarySimulation.spec,
						goal: repeatWords('goal', 41),
						dimensions: {
							...primarySimulation.spec.dimensions,
							height: 0
						}
					},
					fallback_diagram: {
						...physicsSection.diagram!,
						caption: repeatWords('fallback', 61),
						alt_text: repeatWords('fallbackalt', 81),
						callouts: oversizedCallouts
					}
				}
			],
			what_next: {
				...physicsSection.what_next,
				next: repeatWords('next', 16),
				preview: repeatWords('preview', 31),
				prerequisites: ['one', 'two', 'three', 'four', 'five']
			}
		});

		expect(warnings).toEqual(
			expect.arrayContaining([
				'[Lectio/InterviewAnchor] prompt exceeds 35 words',
				'[Lectio/InterviewAnchor] audience exceeds 10 words',
				'[Lectio/InterviewAnchor] follow_up exceeds 25 words',
				'[Lectio/QuizCheck] question exceeds 60 words',
				'[Lectio/QuizCheck] options must be 3-4',
				'[Lectio/QuizCheck] option 1 text exceeds 20 words',
				'[Lectio/QuizCheck] option 1 explanation exceeds 40 words',
				'[Lectio/ReflectionPrompt] prompt exceeds 40 words',
				'[Lectio/ReflectionPrompt] space exceeds 6 lines',
				'[Lectio/DiagramBlock] caption exceeds 60 words',
				'[Lectio/DiagramBlock] alt_text exceeds 80 words',
				'[Lectio/DiagramBlock] callouts max 6',
				'[Lectio/DiagramCompare] before_label exceeds 6 words',
				'[Lectio/DiagramCompare] after_label exceeds 6 words',
				'[Lectio/DiagramCompare] caption exceeds 60 words',
				'[Lectio/DiagramSeries] title exceeds 10 words',
				'[Lectio/DiagramSeries] diagrams max 4',
				'[Lectio/DiagramSeries] diagram 1 step_label exceeds 8 words',
				'[Lectio/DiagramSeries] diagram 1 caption exceeds 40 words',
				'[Lectio/SimulationBlock] goal exceeds 40 words',
				'[Lectio/SimulationBlock] explanation exceeds 60 words',
				'[Lectio/SimulationBlock] dimensions.height must be positive',
				'[Lectio/SimulationBlock/FallbackDiagram] caption exceeds 60 words',
				'[Lectio/SimulationBlock/FallbackDiagram] alt_text exceeds 80 words',
				'[Lectio/SimulationBlock/FallbackDiagram] callouts max 6',
				'[Lectio/WhatNextBridge] next exceeds 15 words',
				'[Lectio/WhatNextBridge] preview exceeds 30 words',
				'[Lectio/WhatNextBridge] prerequisites max 4'
			])
		);
	});

	it('keeps SimulationBlock in the stable component surfaces while it remains beta', () => {
		expect(getStableComponents().some((component) => component.name === 'SimulationBlock')).toBe(
			true
		);
	});

	it('derives a non-empty component field map from the registry', () => {
		const map = getComponentFieldMap();
		expect(Object.keys(map).length).toBeGreaterThan(0);
	});

	it('includes every registry component with a non-null sectionField in the field map', () => {
		const map = getComponentFieldMap();
		for (const component of Object.values(componentRegistry)) {
			if (component.sectionField !== null) {
				expect(map[component.id]).toBe(component.sectionField);
			}
		}
	});

	it('excludes GlossaryInline (sectionField: null) from the field map', () => {
		const map = getComponentFieldMap();
		expect(map['glossary-inline']).toBeUndefined();
	});

	it('includes SimulationBlock in the field map (bug fix verification)', () => {
		const map = getComponentFieldMap();
		expect(map['simulation-block']).toBe('simulations');
	});

	it('validates every simulation in the plural array and still supports the legacy singular field', () => {
		const simulationWarnings = validateSection({
			...physicsSection,
			simulations: [
				{
					...primarySimulation,
					spec: {
						...primarySimulation.spec,
						goal: repeatWords('goal', 41)
					}
				},
				{
					...primarySimulation,
					spec: {
						...primarySimulation.spec,
						goal: repeatWords('goal', 41)
					}
				}
			]
		});

		expect(
			simulationWarnings.filter((warning) => warning === '[Lectio/SimulationBlock] goal exceeds 40 words')
		).toHaveLength(2);

		const legacyWarnings = validateSection({
			...physicsSection,
			simulations: undefined,
			simulation: {
				...primarySimulation,
				spec: {
					...primarySimulation.spec,
					goal: repeatWords('goal', 41)
				}
			}
		});

		expect(legacyWarnings).toContain('[Lectio/SimulationBlock] goal exceeds 40 words');
	});

	it('accepts image-backed diagrams without requiring SVG content', () => {
		const warnings = validateSection({
			...physicsSection,
			diagram: {
				caption: 'Image diagram',
				alt_text: 'Raster-backed diagram',
				image_url: 'https://example.com/diagram.png'
			}
		});

		expect(warnings).not.toContain('[Lectio/DiagramBlock] requires svg_content or image_url');
		expect(warnings).not.toContain('[Lectio/DiagramBlock] callouts require svg_content');
	});

	it('accepts image-backed diagram series steps and warns when a step has no visual', () => {
		const warnings = validateSection({
			...physicsSection,
			diagram_series: {
				title: 'Series checks',
				diagrams: [
					{
						step_label: 'Image step',
						caption: 'A valid raster-backed step.',
						image_url: 'https://example.com/series-step-1.png'
					},
					{
						step_label: 'Missing visual',
						caption: 'This step is missing both svg and image.'
					}
				]
			}
		});

		expect(warnings).not.toContain('[Lectio/DiagramSeries] diagram 1 requires svg_content or image_url');
		expect(warnings).toContain('[Lectio/DiagramSeries] diagram 2 requires svg_content or image_url');
	});

	it('renders GuidedConceptPath and EnrichedLearningPath without breaking key content', () => {
		const guided = render(GuidedConceptPath, {
			props: { section: calculusSection }
		});

		expect(screen.getByText('How fast is something moving at this exact instant?')).toBeInTheDocument();
		expect(screen.getByText(/Practice problems/i)).toBeInTheDocument();

		guided.unmount();

		render(EnrichedLearningPath, {
			props: { section: physicsSection }
		});

		expect(screen.getByText("Newton's Second Law of Motion")).toBeInTheDocument();
		expect(screen.getByText('Before we begin')).toBeInTheDocument();
		expect(screen.getByText('Manipulate and discover')).toBeInTheDocument();
	});
});
