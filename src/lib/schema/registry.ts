export type { ComponentMeta } from './component-meta';

export {
	applyGenerationHintNormalization,
	buildLegacyComponentRegistryFromModules,
	buildLectioManifest,
	componentRegistry,
	defaultGenerationHint,
	getComponentById,
	getComponentFieldMap,
	getComponentsByGroup,
	getComponentsForSubject,
	getStableComponents,
	lectioComponentModules,
	lectioComponents,
	lectioContentModules
} from '$lib/lectio/registry';
