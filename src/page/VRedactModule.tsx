import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, Form, UiSchema, UiInputItem, Schema, Context } from 'tonva';

export class VResacModule extends VPage<CPage> {
    private form: Form;
    async open() {
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { currentModule } = this.controller;
        let id = currentModule && currentModule.id;
        await this.controller.saveItemModule(id, context.form.data);
        this.closePage();
    }

    private uiSchema: UiSchema = {
        items: {
            content: {
                widget: 'textarea', label: '内容', placeholder: '请填写内容', rows: 3
            } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'content', type: 'string', required: true },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { currentModule } = this.controller;
        return <Page header="编辑子模块" headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={currentModule}
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