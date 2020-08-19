import * as React from 'react';
import { CMe } from "./CMe";
import { observer } from 'mobx-react';
import { VPage, UiSchema, Schema, Page, UiInputItem, UiIdItem, tv, ItemSchema, Context, Form } from "tonva";
import { consts } from 'consts';
import { setting } from 'configuration';

export class VTeamInputPost extends VPage<CMe> {

    private form: Form;
    async open() {

        this.openPage(this.page);
    }

    private onAdd = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        this.closePage(1);
        let { post, source, postHitSum, date } = context.form.data;
        ///
    }

    private postContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { caption } = values;
            return <>{caption}</>;
        });
    }
    private uiSchema: UiSchema = {
        items: {
            post: { widget: 'id', label: this.t('post'), pickId: this.controller.pickPost, Templet: this.postContent } as UiInputItem,
            source: { widget: 'id', label: this.t('渠道'), pickId: this.controller.pickSource, Templet: this.postContent } as UiInputItem,
            postHitSum: { widget: 'text', label: this.t('浏览量') } as UiInputItem,
            date: { widget: 'date', label: this.t('日期') } as UiInputItem,
            submit: { widget: 'button', label: this.t('submit') }
        }
    };

    private schema: Schema = [
        { name: 'post', type: 'id', required: true },
        { name: 'source', type: 'id', required: true },
        { name: 'postHitSum', type: 'number', required: true },
        { name: 'date', type: 'date', required: true },
    ];

    private page = observer(() => {
        return <Page header={'编辑录入'} headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    /**
                     * 获取数据源
                     */
                    formData={''}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="text-content pt-4" style={{ textAlign: "center" }}>
                <button type="button" className="btn btn-primary mx-2"
                    onClick={this.onAdd} >提交</button>
            </div>

        </Page>
    })
}