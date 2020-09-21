import * as React from 'react';
import { CMe } from "./CMe";
import { observer } from 'mobx-react';
import { VPage, UiSchema, Schema, Page, UiInputItem, tv, Context, Form } from "tonva";
import { consts } from 'consts';
import { observable } from 'mobx';

export class VTeamInputPost extends VPage<CMe> {
    @observable showTips: any = "none";
    private form: Form;
    private sourcename: any
    async open() {
        this.openPage(this.page);
    }
    private onAdd = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private handleClick = (e: any) => {
        this.sourcename = e.target.value - 0
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        if (this.sourcename !== undefined) {
            let { post, postReadSum, date } = context.form.data;
            let source = this.sourcename
            await this.controller.addSourceHit({ post, source, postReadSum, date });
        } else { this.showTips = '' }
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
            // source: { widget: 'id', label: this.t('渠道'), pickId: this.controller.pickSource, Templet: this.postContent } as UiInputItem,
            postReadSum: { widget: 'text', label: this.t('浏览量') } as UiInputItem,
            date: { widget: 'date', label: this.t('日期') } as UiInputItem,
            submit: { widget: 'button', label: this.t('submit') }
        }
    };

    private schema: Schema = [
        { name: 'post', type: 'id', required: true },
        // { name: 'source', type: 'id', required: true },
        { name: 'postReadSum', type: 'number', required: true },
        { name: 'date', type: 'date', required: true },
    ];

    private page = observer(() => {
        return <Page header={this.t('editorentering')} headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={''}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
                <form className='w-100' id='myform' method="get" >
                    <span> 渠道 </span><span className='text-danger pb-1'>*</span>
                    <select id='selectId' name="selectId" className='w-100 py-2 text-muted mt-1' style={{ border: '1px solid #1E90FF', borderRadius: "5px" }}
                        onChange={this.handleClick}>
                        <option >--请选择渠道--</option>
                        <option value="0">网站</option>
                        <option value="1">轻代理</option>
                        <option value="2">销售助手</option>
                        <option value="3">邮件</option>
                        <option value="4">其他</option>
                    </select>
                    <span className='small text-danger' style={{ display: this.showTips }} >请选择渠道来源</span>
                </form>
            </div>
            <div className="text-content pt-4 mx-4 px-4" style={{ textAlign: "center" }}>
                <button type="button" className="btn btn-primary  py-2 w-100"
                    onClick={this.onAdd} >提交</button>
            </div>
        </Page >
    })
}

