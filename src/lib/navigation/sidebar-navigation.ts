import { getStableComponents } from '$lib/registry';
import { templateRegistry } from '$lib/template-registry';

export interface SidebarNavigationItem {
	href: string;
	label: string;
	meta: string;
}

export interface SidebarNavigationData {
	components: SidebarNavigationItem[];
	templates: SidebarNavigationItem[];
}

export function getSidebarNavigation(): SidebarNavigationData {
	return {
		components: getStableComponents().map((component) => ({
			href: `/components#${component.id}`,
			label: component.name,
			meta: `Group ${component.group} - ${component.cognitiveJob}`
		})),
		templates: [
			{
				href: '/templates',
				label: 'Template gallery',
				meta: `${templateRegistry.length} starter templates`
			},
			...templateRegistry.map(({ contract }) => ({
				href: `/templates/${contract.id}`,
				label: contract.name,
				meta: contract.family
			}))
		]
	};
}
