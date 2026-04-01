import type { SectionContent, SimulationContent } from './types';

export function getSectionSimulations(
	section: Pick<SectionContent, 'simulations' | 'simulation'>
): SimulationContent[] {
	if (section.simulations?.length) {
		return section.simulations;
	}

	return section.simulation ? [section.simulation] : [];
}
