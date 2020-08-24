import * as React from 'react';
import { VPage, Page, Form, UiSchema, Schema, Context, UiInputItem } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CPosts } from './CPosts';
import { observable } from 'mobx';

export class VSubjectAdd extends VPage<CPosts> {
    @observable capton: any = "栏目";
    private form: Form;
    private subject: any;
    async open(subject: any) {
        this.subject = subject;
        this.openPage(this.page);
    }

    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '名称', placeholder: '请填写栏目名称', rows: 8 } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'name', type: 'string', required: true }
    ];


    private onSaveCat = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (names: string, context: Context) => {
        let { name } = context.form.data;
        let { saveSubject } = this.controller;
        if (this.subject.id === -1) {
            await saveSubject(null, this.subject.parent, name, 1);
        } else {
            await saveSubject(this.subject.id, this.subject.parent, name, 1);
        }

        this.closePage();

    }

    private page = observer(() => {

        return <Page header={this.capton} headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={this.subject}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="text-content" style={{ textAlign: "center" }}>
                <button type="button" className=" btn btn-primary px-4" onClick={this.onSaveCat} >{this.t('submit')}</button>
            </div>
        </Page >;
    })
}
