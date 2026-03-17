import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import HookHero from '$lib/components/lectio/HookHero.svelte';
import DefinitionFamily from '$lib/components/lectio/DefinitionFamily.svelte';
import DiagramSeries from '$lib/components/lectio/DiagramSeries.svelte';
import DiagramCompare from '$lib/components/lectio/DiagramCompare.svelte';
import QuizCheck from '$lib/components/lectio/QuizCheck.svelte';
import GuidedConceptPath from '$lib/templates/GuidedConceptPath.svelte';
import EnrichedLearningPath from '$lib/templates/EnrichedLearningPath.svelte';
import { calculusSection, physicsSection } from '$lib/dummy-content';

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

	it('evaluates quiz answers immediately and resets with Try again', async () => {
		render(QuizCheck, {
			props: { content: physicsSection.quiz! }
		});

		await fireEvent.click(screen.getByRole('button', { name: /^0\.25 m\/s²/i }));

		expect(screen.getByText('Not quite!')).toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

		expect(screen.queryByText('Not quite!')).not.toBeInTheDocument();
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
	});
});
