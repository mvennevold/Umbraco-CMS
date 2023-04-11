import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { UUIInputElement } from '@umbraco-ui/uui';
import { UmbCodeEditorElement } from '../../../shared/components/code-editor/code-editor.element';
import { UmbTemplateWorkspaceContext } from './template-workspace.context';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

@customElement('umb-template-workspace-edit')
export class UmbTemplateWorkspaceEditElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}

			umb-code-editor {
				--editor-height: calc(100vh - 300px);
			}

			uui-box {
				margin: 1em;
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
				justify-content: flex-end;
				gap: var(--uui-size-space-3);
			}
		`,
	];

	@state()
	private _name?: string | null = '';

	@state()
	private _content?: string | null = '';

	@query('umb-code-editor')
	private _codeEditor?: UmbCodeEditorElement;

	#templateWorkspaceContext?: UmbTemplateWorkspaceContext;
	#isNew = false;

	constructor() {
		super();

		this.consumeContext('umbWorkspaceContext', (workspaceContext: UmbTemplateWorkspaceContext) => {
			this.#templateWorkspaceContext = workspaceContext;
			this.observe(this.#templateWorkspaceContext.name, (name) => {
				this._name = name;
			});

			this.observe(this.#templateWorkspaceContext.content, (content) => {
				this._content = content;
			});

			this.observe(this.#templateWorkspaceContext.isNew, (isNew) => {
				this.#isNew = isNew;
				console.log(this.#isNew);
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
		const target = event.target as UUIInputElement;
		const value = target.value as string;

		this._codeEditor?.insert(`My hovercraft is full of eels`);
	}

	render() {
		// TODO: add correct UI elements
		return html`<umb-workspace-layout alias="Umb.Workspace.Template">
			<uui-input slot="header" .value=${this._name} @input=${this.#onNameInput}></uui-input>
			<uui-box>
				<div slot="header" id="code-editor-menu-container">
					<umb-button-with-dropdown look="secondary" placement="bottom-start" id="insert-button" label="Insert">
						<uui-icon name="umb:add"></uui-icon>Insert
						<ul id="insert-menu" slot="dropdown">
							<li>
								<uui-menu-item class="insert-menu-item" target="_blank" label="Value" title="Value"> </uui-menu-item>
							</li>
							<li>
								<uui-menu-item class="insert-menu-item" label="Macro" title="Macro"> </uui-menu-item>
							</li>
							<li>
								<uui-menu-item class="insert-menu-item" label="Dictionary item" title="Dictionary item">
								</uui-menu-item>
							</li>
						</ul>
					</umb-button-with-dropdown>
					<uui-button look="secondary" id="query-builder-button" label="Query builder">
						<uui-icon name="umb:wand"></uui-icon>Query builder
					</uui-button>
				</div>

				<umb-code-editor
					language="razor"
					id="content"
					.code=${this._content ?? ''}
					@input=${this.#onCodeEditorInput}></umb-code-editor>
			</uui-box>
		</umb-workspace-layout>`;
	}
}

export default UmbTemplateWorkspaceEditElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-template-workspace-edit': UmbTemplateWorkspaceEditElement;
	}
}
