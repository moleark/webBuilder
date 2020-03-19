import * as React from 'react';
import { CTemplets } from "./CTemplets";
import { VPage, Form, Context, UiSchema, Schema, Page, UiInputItem } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VEdit extends VPage<CTemplets> {
    private templet: any;
    private form: Form;
    async open(templet: any) {
        this.templet = templet;
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let id = this.templet && this.templet.id;
        await this.controller.saveItem(id, context.form.data);
        this.closePage();
    }

    private uiSchema: UiSchema = {
        items: {
            caption: { widget: 'text', label: '标题' },
            content: { widget: 'textarea', label: 'PC模板', placeholder: '请填写模板内容', rows: 8 } as UiInputItem,
            contentModule: { widget: 'textarea', label: '移动端模板', placeholder: '请填写模板内容', rows: 8 } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'caption', type: 'string', required: true },
        { name: 'content', type: 'string', required: true },
        { name: 'contentModule', type: 'string', required: true },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        /*
        let right = <div className="cursor-pointer py-1" >
            <span className="iconfont  mx-3 icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span>
        </div>;
        */
        return <Page header="编辑模板" headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={this.templet}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="text-content" style={{ textAlign: "center" }}>
                <button type="button" className="col-12 btn btn-primary mx-2" onClick={this.onClickSaveButton} >保存</button>
            </div>
        </Page>
    })
}
