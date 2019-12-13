import * as React from "react";
import { consts } from "consts";
import { CTask } from "./CTask";
import { observer } from "mobx-react";
import { Content } from "./model/content"
// import classNames from "classnames";
import { VPage, UiSchema, Schema, UiInputItem, tv, Page, Form, Context } from "tonva";

export class VMain extends VPage<CTask> {
    private content: any;
    private form: Form;
    private saveType: any = 1;
    async open() {
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
        this.saveType = 1;
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        console.log(this.content, 'this.task')
        await this.controller.createTask(context.form.data);
        this.closePage();
    }

    private uiSchema: UiSchema = {
        items: {
            content: { widget: 'textarea', label: '内容', placeholder: '请填写内容描述', rows: 6 } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'content', type: 'string', required: true },
    ];

    render(member: any): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let right = <div className="cursor-pointer py-1" >
            <span className="iconfont  mx-3 icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span>
        </div>;
        return <Page header="网页" headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="px-1 ">
                <div className="text-content" style={{ textAlign: "center" }}>
                    <button type="button" className="btn btn-primary mx-2" onClick={this.onAddSalesTask} >新建</button>
                </div>
            </div>
        </Page>
    })
}