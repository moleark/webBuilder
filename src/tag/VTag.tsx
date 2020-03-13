import * as React from "react";
import { VPage, Page, Schema, Form, UiButton, UiTagMulti, Context } from "tonva";
import { CTag } from "./CTag";
import { consts } from "consts";
import { observer } from "mobx-react";

export class VTag extends VPage<CTag> {
    async open() {
        this.openPage(this.page);
    }
    private schema: Schema = [
        // { name: "b", type: "string" },
        { name: "cresearch", type: "string" },
        { name: "business", type: "string" },
        { name: "submit", type: "submit" }
    ];

    private page = observer(() => {

        let { ResearchField, Business, postResearchField } = this.controller;
        let uiSchema = {
            items: {
                /**
                b: {
                    label: "单选Radio",
                    widget: "tagSingle",
                    valuesView: this.controller.Test1.view //list: this.controller.tagText2Values
                } as UiTagSingle,
                **/
                cresearch: {
                    label: '研究领域',
                    widget: 'tagMulti',
                    valuesView: ResearchField.view,
                } as UiTagMulti,
                business: {
                    label: '业务部门',
                    widget: 'tagMulti',
                    valuesView: Business.view,
                } as UiTagMulti,
                submit: {
                    label: "提交",
                    widget: "button",
                    className: "btn btn-primary"
                } as UiButton
            }
        };
        return (
            <Page header="标签" headerClassName={consts.headerClass}>
                <Form
                    className="p-3"
                    schema={this.schema}
                    uiSchema={uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    formData={{ cresearch: postResearchField }}
                    fieldLabelSize={2}
                />
            </Page>
        );
    });

    private onFormButtonClick = async (name: string, context: Context) => {
        this.closePage();
        this.controller.saveTag(context.data);
    }
}
