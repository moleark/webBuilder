import * as React from 'react';
import { CPosts } from "./CPosts";
import { VPage, Context, UiSchema, Schema, Page, UiInputItem, UiIdItem, tv, Edit, ItemSchema } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VEdit extends VPage<CPosts> {

    private textarea: HTMLTextAreaElement;
    async open() {
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        //if (!this.form) return;
        //await this.form.buttonClick("submit");
        let { current } = this.controller;
        let id = current && current.id;
        current.content = this.textarea.value;
        await this.controller.saveItem(id, current);
        this.closePage();
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.controller.current[name] = newValue;
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { current } = this.controller;
        let id = current && current.id;
        await this.controller.saveItem(id, context.form.data);
        this.closePage();
    }

    private imageContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { caption } = values;
            return <>{caption}</>;
        });
    }

    private catalogContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { caption } = values;
            return <>{caption}</>;
        });
    }


    private uiSchema: UiSchema = {
        items: {
            caption: { widget: 'text', label: this.t('title') },
            discription: {
                widget: 'textarea', label: this.t('describe'), placeholder: this.t('describe'), rows: 3
            } as UiInputItem,

            image: {
                widget: 'id', label: this.t('picture'), pickId: this.controller.pickImage, Templet: this.imageContent
            } as UiIdItem,

            productcatalog: {
                widget: 'id', label: "目录", pickId: this.controller.pickProductCatalog, Templet: this.catalogContent
            } as UiIdItem,
            /**
            template: {
                widget: 'id', label: this.t('template'), pickId: this.controller.pickTemplate, Templet: this.templateContent
            } as UiIdItem,
            **/
            submit: { widget: 'button', label: this.t('submit') }
        }
    };

    private schema: Schema = [
        { name: 'caption', type: 'string', required: true },
        { name: 'discription', type: 'string', required: false },
        { name: 'image', type: 'id', required: true },
        { name: 'productcatalog', type: 'id', required: false }
        //{ name: 'content', type: 'string', required: true },
        // { name: 'template', type: 'id', required: true },
    ];
    // ^.{3,6}$
    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {

        let { current, cApp } = this.controller;

        let right = <div>
            <button type="button"
                className="btn btn-sm btn-success mr-3"
                onClick={this.onClickSaveButton} >{this.t('submit')}
            </button>
            <button type="button"
                className="btn btn-sm btn-success mr-3"
                onClick={cApp.cTag.showTag} >{this.t('tag')}
            </button>
        </div>;
        return <Page header={this.t('editorpost')}
            right={right}
            headerClassName={consts.headerClass}>
            <div className="mx-3 py-2 h-100 d-flex flex-column">
                <textarea ref={tt => this.textarea = tt} className="flex-fill mb-2" defaultValue={current.content} />
                <Edit data={current}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onItemChanged={this.onItemChanged}
                />
            </div>
        </Page>
    })
}
/*


<Form ref={v => this.form = v} className="my-3"
formData={current}
schema={this.schema}
uiSchema={this.uiSchema}
onButtonClick={this.onFormButtonClick}
requiredFlag={true}
/>
            <div className="px-1 ">
                <div className="text-content" style={{ textAlign: "center" }}>
                    <button type="button" className="btn btn-primary mx-2"
                        onClick={this.onClickSaveButton} >{this.t('submit')}</button>
                </div>
            </div>
*/