import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { UUIInputElement } from '@umbraco-ui/uui';
import { UmbTemplatingInsertMenuElement } from '../../components/insert-menu/templating-insert-menu.element';
import { UMB_MODAL_TEMPLATING_INSERT_SECTION_MODAL } from '../../modals/insert-section-modal/insert-section-modal.element';
import { UmbTemplateWorkspaceContext } from './template-workspace.context';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UMB_MODAL_CONTEXT_TOKEN, UMB_TEMPLATE_PICKER_MODAL, UmbModalContext } from '@umbraco-cms/backoffice/modal';
import { UmbCodeEditorElement } from '@umbraco-cms/backoffice/core/components';

@customElement('umb-template-workspace-edit')
export class UmbTemplateWorkspaceEditElement extends UmbLitElement {
	@state()
	private _name?: string | null = '';

	@state()
	private _content?: string | null = '';

	@state()
	private _masterTemplateName?: string | null = null;

	@query('umb-code-editor')
	private _codeEditor?: UmbCodeEditorElement;

	#templateWorkspaceContext?: UmbTemplateWorkspaceContext;
	#isNew = false;

	#masterTemplateId: string | null = null;

	constructor() {
		super();

		this.consumeContext(UMB_MODAL_CONTEXT_TOKEN, (instance) => {
			this._modalContext = instance;
		});

		this.consumeContext('UmbEntityWorkspaceContext', (workspaceContext: UmbTemplateWorkspaceContext) => {
			this.#templateWorkspaceContext = workspaceContext;
			this.observe(this.#templateWorkspaceContext.name, (name) => {
				this._name = name;
			});

			this.observe(this.#templateWorkspaceContext.content, (content) => {
				this._content = content;
				this._masterTemplateName = this.#getMasterTemplateId();
			});

			this.observe(this.#templateWorkspaceContext.isNew, (isNew) => {
				this.#isNew = !!isNew;
			});
		});
	}

	// TODO: temp code for testing create and save
	#onNameInput(event: Event) {
		const target = event.target as UUIInputElement;
		const value = target.value as string;
		this.#templateWorkspaceContext?.setName(value);
	}

	//TODO - debounce that
	#onCodeEditorInput(event: Event) {
		const target = event.target as UmbCodeEditorElement;
		const value = target.code as string;
		this.#templateWorkspaceContext?.setContent(value);
	}

	#insertCode(event: Event) {
		const target = event.target as UmbTemplatingInsertMenuElement;
		const value = target.value as string;

		this._codeEditor?.insert(value);
	}

	private _modalContext?: UmbModalContext;

	#openInsertSectionModal() {
		const sectionModal = this._modalContext?.open(UMB_MODAL_TEMPLATING_INSERT_SECTION_MODAL);
		sectionModal?.onSubmit().then((insertSectionModalResult) => {
			console.log(insertSectionModalResult);
		});
	}

	#getMasterTemplateId() {
		const RegexString = /(@{[\s\S][^if]*?Layout\s*?=\s*?)("[^"]*?"|null)(;[\s\S]*?})/gi;
		const match = RegexString.exec(this._content ?? '');

		if (match) {
			return match[2].replace(/"/g, '');
		}

		return null;
	}

	#openMasterTemplatePicker() {
		// TODO: Change experience, so its not multi selectable. But instead already picked templates should be unpickable. (awaiting general picker features for such)
		const modalHandler = this._modalContext?.open(UMB_TEMPLATE_PICKER_MODAL, {
			selection: [this.#masterTemplateId],
		});

		const RegexString = /(@{[\s\S][^if]*?Layout\s*?=\s*?)("[^"]*?"|null)(;[\s\S]*?})/gi;
		modalHandler?.onSubmit().then((data) => {
			if (!data.selection) return;
			console.log(data.selection);

			const string = this._codeEditor?.code.replace(RegexString, `$1"${data.selection[0]}"$3`);
			debugger;
		});
	}

	#renderMasterTemplatePicker() {
		return html`
			<uui-button-group>
				<uui-button
					@click=${this.#openMasterTemplatePicker}
					look="secondary"
					id="master-template-button"
					label="Change Master template"
					>Master template: ${this._masterTemplateName ?? 'No master'}</uui-button
				>
				<uui-button look="secondary" id="save-button" label="Remove master template" compact
					><uui-icon name="umb:delete"></uui-icon
				></uui-button>
			</uui-button-group>
		`;
	}

	render() {
		// TODO: add correct UI elements
		return html`<umb-body-layout alias="Umb.Workspace.Template">
			<uui-input slot="header" .value=${this._name} @input=${this.#onNameInput}></uui-input>
			<uui-box>
				<div slot="header" id="code-editor-menu-container">
					${this.#renderMasterTemplatePicker()}
					<div>
						<umb-templating-insert-menu @insert=${this.#insertCode}></umb-templating-insert-menu>
						<uui-button look="secondary" id="query-builder-button" label="Query builder">
							<uui-icon name="umb:wand"></uui-icon>Query builder
						</uui-button>
						<uui-button
							look="secondary"
							id="sections-button"
							label="Query builder"
							@click=${this.#openInsertSectionModal}>
							<uui-icon name="umb:indent"></uui-icon>Sections
						</uui-button>
					</div>
				</div>

				<umb-code-editor
					language="razor"
					id="content"
					.code=${this._content ?? ''}
					@input=${this.#onCodeEditorInput}></umb-code-editor>
			</uui-box>
		</umb-body-layout>`;
	}

	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}

			umb-code-editor {
				margin-top: var(--uui-size-space-3);
				--editor-height: calc(100dvh - 300px);
			}

			uui-box {
				margin: var(--uui-size-layout-1);
				--uui-box-default-padding: 0;
			}

			uui-input {
				width: 100%;
				margin: 1em;
			}

			#code-editor-menu-container uui-icon {
				margin-right: var(--uui-size-space-3);
			}

			#insert-menu {
				margin: 0;
				padding: 0;
				margin-top: var(--uui-size-space-3);
				background-color: var(--uui-color-surface);
				box-shadow: var(--uui-shadow-depth-3);
				min-width: calc(100% + var(--uui-size-8, 24px));
			}

			#insert-menu > li,
			ul {
				padding: 0;
				width: 100%;
				list-style: none;
			}

			.insert-menu-item {
				width: 100%;
			}

			#code-editor-menu-container {
				display: flex;
				justify-content: space-between;
				gap: var(--uui-size-space-3);
			}
		`,
	];
}

export default UmbTemplateWorkspaceEditElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-template-workspace-edit': UmbTemplateWorkspaceEditElement;
	}
}
