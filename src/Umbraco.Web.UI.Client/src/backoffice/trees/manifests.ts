import type { ManifestTree, ManifestWithLoader } from '@umbraco-cms/models';

export const manifests: Array<ManifestWithLoader<ManifestTree>> = [
	{
		type: 'tree',
		alias: 'Umb.Tree.Extensions',
		name: 'Extensions Tree',
		loader: () => import('./extensions/tree-extensions.element'),
		weight: 400,
		meta: {
			label: 'Extensions',
			icon: 'umb:favorite',
			sections: ['Umb.Section.Settings'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.DocumentTypes',
		name: 'Document Types Tree',
		loader: () => import('./document-types/tree-document-types.element'),
		weight: 300,
		meta: {
			label: 'Document Types',
			icon: 'umb:folder',
			sections: ['Umb.Section.Settings'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.MemberTypes',
		name: 'Member Types Tree',
		loader: () => import('./member-types/tree-member-types.element'),
		weight: 200,
		meta: {
			label: 'Member Types',
			icon: 'umb:folder',
			sections: ['Umb.Section.Settings'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.DataTypes',
		name: 'Data Types Tree',
		loader: () => import('./data-types/tree-data-types.element'),
		weight: 100,
		meta: {
			label: 'Data Types',
			icon: 'umb:folder',
			sections: ['Umb.Section.Settings'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.MemberGroups',
		name: 'Member Groups Tree',
		loader: () => import('./member-groups/tree-member-groups.element'),
		weight: 1,
		meta: {
			label: 'Member Groups',
			icon: 'umb:folder',
			sections: ['Umb.Section.Members'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.Media',
		name: 'Media Tree',
		loader: () => import('./media/tree-media.element'),
		weight: 100,
		meta: {
			label: 'Media',
			icon: 'umb:folder',
			sections: ['Umb.Section.Media'],
		},
	},
	{
		type: 'tree',
		alias: 'Umb.Tree.Documents',
		name: 'Documents Tree',
		loader: () => import('./documents/tree-documents.element'),
		weight: 100,
		meta: {
			label: 'Documents',
			icon: 'umb:folder',
			sections: ['Umb.Section.Content'],
		},
	},
];
