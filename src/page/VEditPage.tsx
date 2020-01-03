import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, Form, UiSchema, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';

export class VEditPage extends VPage<CPage> {
    private form: Form;
    async open() {
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { current } = this.controller;
        let id = current && current.id;
        await this.controller.saveItem(id, context.form.data);
        this.closePage();
    }

    private templateContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { caption } = values;
            return <>{caption}</>;
        });
    }

    private uiSchema: UiSchema = {
        items: {
            titel: { widget: 'text', label: '标题' }, 

            discription: {
                widget: 'textarea', label: '链接描述', placeholder: '链接上用描述', rows: 3
            } as UiInputItem,

            name: {
                widget: 'textarea', label: '名字', placeholder: '请填写模板名字', rows: 3
            } as UiInputItem,
    
            template: {
                widget: 'id', label: '布局模板', pickId: this.controller.pickTemplate, Templet: this.templateContent
            } as UiIdItem,

            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'titel', type: 'string', required: true },
        { name: 'discription', type: 'string', required: false },
        { name: 'name', type: 'string', required: true },
        // { name: 'brach', type: 'id', required: false },
        { name: 'template', type: 'id', required: true },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { current } = this.controller;
        return <Page header="编辑网页" headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={current}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="px-1 ">
                <div className="text-content" style={{ textAlign: "center" }}>
                    <button type="button" className="btn btn-primary mx-2"
                        onClick={this.onClickSaveButton} >保存</button>
                </div>
            </div>
        </Page>
    })
}