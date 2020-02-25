import * as React from "react";
import { VPage, Page, Schema, UiTagSingle, Edit, Form } from "tonva";
import { CTag } from "./CTag";
import { consts } from "consts";
import { observer } from "mobx-react";

export class VTag extends VPage<CTag> {
    async open() {
        this.openPage(this.page);
    }
    private schema: Schema = [
        { name: "b", type: "string" },
        { name: "submit", type: "submit" }
    ];

    private page = observer(() => {
        let uiSchema = {
            items: {
                b: {
                    label: "单选Radio",
                    widget: "tagSingle",
                    valuesView: this.controller.values1.view //list: this.controller.tagText2Values
                } as UiTagSingle,
                submit: {
                    label: "提交",
                    widget: "button",
                    className: "btn btn-primary"
                }
            }
        };
        return (
            <Page header="标签" headerClassName={consts.headerClass}>
                        
                <Form
                    className="p-3"
                    schema={this.schema}
                    uiSchema={uiSchema}
                    formData={{ b: 3, c: "2\n4" }}
                    fieldLabelSize={2}
                />
            </Page>
        );
    });
}
