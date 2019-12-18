import * as React from 'react';
import _ from 'lodash';
import { CPosts } from "./CPosts";
import { VPage, Form, Context, UiSchema, Schema, Page, UiInputItem, UiIdItem } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { tv } from 'tonva/CApp/cUq/reactBoxId';

export class VEdit extends VPage<CPosts> {
    private form: Form;
    async open() { 
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let {current} = this.controller;
        let id = current && current.id;
        await this.controller.saveItem(id, context.form.data);
        this.closePage();
    }

    private imageContent = (boxId:any) => {
        return tv(boxId, (values) => {
            let {caption} = values;
            return <>{caption}</>;
        });
    }

    private templateContent = (boxId:any) => {
        return tv(boxId, (values) => {
            let {caption} = values;
            return <>{caption}</>;
        });
    }

    private uiSchema: UiSchema = {
        items: {
            caption: { widget: 'text', label: '标题' },

            discription: { widget: 'textarea', label: '链接描述',
             placeholder: '链接上用描述', rows: 3 } as UiInputItem,

            content: { widget: 'textarea', label: '内容',
             placeholder: '请填写模板内容', rows: 8 } as UiInputItem,

            image: { widget: 'id', label: '链接图片', 
            pickId: this.controller.pickImage, Templet: this.imageContent } as UiIdItem,

            template: { widget: 'id', label: '布局模板',
             pickId: this.controller.pickTemplate, 
             
             Templet: this.templateContent } as UiIdItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'caption', type: 'string', required: true },
        { name: 'discription', type: 'string', required: false },
        { name: 'content', type: 'string', required: true },
        { name: 'image', type: 'id', required: false },
        { name: 'template', type: 'id', required: false },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let {current} = this.controller;
        return <Page header="编辑帖文" headerClassName={consts.headerClass}>
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
