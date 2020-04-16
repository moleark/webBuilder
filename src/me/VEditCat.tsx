import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, UiSchema, Schema, Form, UiInputItem } from "tonva";
import { observable } from "mobx";
import { CMe } from "./CMe";

export class VEditCat extends VPage<CMe> {
    @observable capton: any = "图片分类";
    private form: Form;
    private templet: any;
    async open() {
        this.openPage(this.page);
    }


    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '名称', placeholder: '请填写图片分类名称', rows: 8 } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'name', type: 'string', required: true }
    ];

    private page = observer(() => {
        let right = <div>
            <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>;
        return <Page header={this.capton} headerClassName={consts.headerClass} right={right}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={this.templet}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    requiredFlag={true}
                />
            </div>
            <div className="text-content" style={{ textAlign: "center" }}>
                <button type="button" className=" btn btn-primary px-4">保存</button>
            </div>
        </Page >;
    })



}
