import type { SectionContent } from './types';

export const calculusSection: SectionContent = {
	section_id: 'calc-01',
	title: 'Why does calculus exist?',
	subtitle: 'Two questions algebra cannot answer',
	subject: 'Mathematics',
	grade_band: 'secondary',
	template_id: 'guided_concept_path_v1',

	hook: {
		headline: 'How fast is something moving at this exact instant?',
		body: 'You can measure where a ball is at two moments and calculate how far it moved. But what if you need its speed at one precise instant — not over a span, but at a single frozen moment? Algebra gives you averages. It cannot give you an instant.',
		anchor: 'the gap between average speed and instantaneous speed',
		image: {
			url: '/images/falling-ball.jpg',
			alt: 'A ball frozen mid-fall against a ruler, illustrating instantaneous position',
		},
	},

	explanation: {
		body: 'This question forced mathematicians to invent an entirely new branch of mathematics. Algebra can find averages — how fast something moved over ten seconds, how much water flowed in an hour. But it breaks down at the boundary: the speed at one instant, the exact area under a curve. Calculus was invented to cross that boundary. It introduced two core tools: derivatives (which measure instantaneous rates of change) and integrals (which measure total accumulation). These tools turn out to be opposites of each other — a discovery called the Fundamental Theorem of Calculus that connects the two halves into one unified framework.',
		emphasis: ['derivatives', 'integrals', 'opposites of each other'],
		callouts: [
			{
				type: 'insight',
				text: 'Derivatives and integrals being inverses of each other is not obvious — it took Newton and Leibniz to see it, and it remains the most important single theorem in calculus.',
			},
			{
				type: 'remember',
				text: 'Derivative = rate of change. Integral = total accumulation. They undo each other.',
			},
		],
	},

	definition: {
		term: 'Calculus',
		formal:
			'The mathematical study of continuous change, consisting of differential calculus (rates of change and slopes of curves) and integral calculus (accumulation of quantities and areas under or between curves).',
		plain: 'A branch of mathematics built to answer two questions: how fast is something changing right now, and how much has it accumulated over time?',
		etymology: 'From Latin calculus — a small stone used for counting.',
		examples: [
			'Differential calculus focuses on rates; integral calculus focuses on accumulation.',
			'The calculus of variations extends these ideas to functions of functions.',
		],
		related_terms: ['Derivative', 'Integral', 'Limit'],
	},

	worked_example: {
		title: 'Finding instantaneous speed from a position function',
		setup: "A ball dropped from a 100-foot building has height h(t) = 100 − 16t² at time t seconds. What is the ball's speed at exactly t = 2?",
		steps: [
			{
				label: 'Find the position at t = 2',
				content:
					'h(2) = 100 − 16(4) = 36 feet. The ball is 36 feet above the ground at t = 2.',
			},
			{
				label: 'Calculate average speed over one second',
				content:
					'h(3) = −44 feet. Average speed = (−44 − 36) ÷ 1 = −80 ft/s. But this is an average, not instantaneous.',
			},
			{
				label: 'Shrink the interval',
				content:
					'Over 0.1 seconds the average is −65.6 ft/s. Over 0.01 seconds it is −64.16 ft/s. The numbers are converging.',
			},
			{
				label: 'The limit gives the exact answer',
				content:
					'As the interval approaches zero, the average speed approaches −64 ft/s. This limit is the derivative — the instantaneous speed.',
			},
		],
		conclusion:
			'The instantaneous speed at t = 2 is exactly −64 ft/s — found by taking the limit of average speeds as the time interval shrinks to zero.',
		answer: '−64 ft/s downward',
		alternatives: [
			"Use the power rule directly: h'(t) = −32t, so h'(2) = −64 ft/s.",
			'Graphical method: find the slope of the tangent line to h(t) at t = 2.',
		],
	},

	pitfall: {
		misconception: 'Calculus is just faster algebra for the same problems',
		correction:
			'Calculus solves problems algebra genuinely cannot. Instantaneous speed, exact areas under curves, and rates of change at a point are all impossible with algebra alone.',
		example:
			'Any algebraic attempt to find instantaneous speed requires dividing by zero — an operation algebra forbids but calculus resolves through limits.',
		examples: [
			'Any algebraic attempt to find instantaneous speed requires dividing by zero — an operation algebra forbids but calculus resolves through limits.',
			'Trying to find the exact area under y = x² from 0 to 1 with algebra only gives approximations, never the exact value.',
		],
		why: 'Because algebra handles every other speed calculation students have seen, it is natural to assume it handles this one too.',
	},

	practice: {
		problems: [
			{
				difficulty: 'warm',
				question:
					"A car is at mile marker 10 at 1 PM, mile marker 35 at 2 PM, and mile marker 80 at 4 PM. What is the car's average speed from 1–2 PM? From 2–4 PM? Why can't these averages tell you the car's speed at exactly 3 PM?",
				hint: 'Average speed = distance ÷ time. Calculate separately for 1–2 PM and 2–4 PM. Then think about what happens between 2 and 4.',
				answer: '25 mph for 1–2 PM, 22.5 mph for 2–4 PM. The car could have been going any speed at 3 PM — averages hide the instantaneous value.',
				writein_lines: 4,
			},
			{
				difficulty: 'medium',
				question:
					'The height of a ball thrown upward is h(t) = 40t − 5t². Calculate the average speed over [1, 2], then [1, 1.5], then [1, 1.1]. What does the pattern suggest about the speed at t = 1?',
				hint: 'Use (h(b) − h(a)) ÷ (b − a) for each interval and notice what happens as b gets closer to 1.',
				hints: [
					'Start by calculating h(1), h(2), h(1.5), and h(1.1) using the formula.',
					'Use (h(b) − h(a)) ÷ (b − a) for each interval.',
					'Watch what happens to the average speed as the interval shrinks — that limit is the instantaneous speed.',
				],
				answer: 'The averages converge toward 30 m/s, suggesting the instantaneous speed at t = 1 is 30 m/s.',
				solution: 'h(1) = 35, h(2) = 60, h(1.5) = 48.75, h(1.1) = 37.95. Average over [1,2] = 25 m/s, over [1,1.5] = 27.5 m/s, over [1,1.1] = 29.5 m/s. As the interval shrinks, the average approaches 30 m/s.',
				writein_lines: 5,
			},
			{
				difficulty: 'cold',
				question:
					'Explain without calculus why it is impossible to find the speed of an object at a single instant using only algebra. What fundamental operation breaks down?',
				hint: 'Speed requires distance divided by time. What happens to the time value at a single instant?',
				hints: [
					'Speed is defined as distance divided by time.',
					'At a single instant, the time interval is zero — what does dividing by zero mean?',
					'Algebra has no tool for dividing by zero. Calculus invented limits to get around this.',
				],
				writein_lines: 6,
			},
		],
	},

	glossary: {
		terms: [
			{
				term: 'Derivative',
				definition: 'The instantaneous rate of change of a function at a given point.',
				used_in: 'Explanation, Worked Example',
				related: ['Limit', 'Integral'],
			},
			{
				term: 'Integral',
				definition: 'The total accumulated change — the area under a curve over an interval.',
				used_in: 'Explanation',
				related: ['Derivative', 'Limit'],
			},
			{
				term: 'Limit',
				definition:
					'What a value approaches as a variable gets infinitely close to a target.',
				used_in: 'Worked Example',
				related: ['Derivative', 'Instantaneous'],
			},
			{
				term: 'Instantaneous',
				definition: 'At a single exact moment, not averaged over any interval.',
				related: ['Limit', 'Derivative'],
			},
		],
	},

	what_next: {
		body: 'Now that we understand why calculus exists, we need the precise tool that makes instantaneous measurement possible.',
		next: 'Section 2 — Limits: The Foundation of Calculus',
		prerequisites: ['Average rate of change', 'Function notation', 'Algebraic fractions'],
	},
};
