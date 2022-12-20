import { UmbWorkspaceWithStoreContext } from "../shared/workspace-context/workspace-with-store.context";
import type { DocumentDetails } from "@umbraco-cms/models";

const DefaultDocumentData = ({
	key: '',
	name: '',
	icon: '',
	type: '',
	hasChildren: false,
	parentKey: '',
	isTrashed: false,
	properties: [
		/*{
			alias: '',
			label: '',
			description: '',
			dataTypeKey: '',
		},*/
	],
	data: [
		{
			alias: '',
			value: '',
		},
	],
	variants: [
		{
			name: '',
		},
	],
}) as DocumentDetails;


export class UmbWorkspaceDocumentContext extends UmbWorkspaceWithStoreContext<DocumentDetails> {

	constructor(target:HTMLElement, entityType: string, entityKey: string) {
		super(target, DefaultDocumentData, 'umbDocumentStore', entityType, entityKey);
	}

}

