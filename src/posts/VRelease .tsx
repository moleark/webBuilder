import * as React from 'react';
import { CPosts } from './CPosts';
import { VPage, Page, Widget, UiSchema, UiCustom, Form, Schema, Context } from 'tonva';
import { consts } from 'consts';
import { observe, observable } from 'mobx';
import _ from "lodash"

class Discount extends Widget {
    @observable dateVisible = false;
    private result: any = {
        a: 1, b: 2, c: 3, d: [1, 2, 3]
    }
    private list = [
        { value: 1, title: '内部销售', name: 'a', checked: true },
        { value: 2, title: '轻代理', name: 'a', checked: undefined },
        { value: 3, title: '内部网页', name: 'a', checked: undefined },
        { value: 4, title: '公开网页', name: 'a', checked: undefined }
    ];

    private publicList = [
        { value: 5, title: 'a', name: 'a', checked: true },
        { value: 6, title: 'b', name: 'a', checked: undefined },
        { value: 7, title: 'c', name: 'a', checked: undefined },
        { value: 8, title: 'd', name: 'a', checked: undefined }
    ];

    private onDataChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(evt.currentTarget.value);
        this.setValue(this.result);
    }

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        let sel = evt.currentTarget.checked;
        console.log((val && sel), 'aaa')
        if (val === '4') {
            if (sel) {
                this.dateVisible = true;
            } else {
                this.dateVisible = false;
            }
        }
        this.setValue(val);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                let { value, name, title } = v;
                return <div key={index} className="my-1 mx-3">
                    <input type="checkbox" value={value}
                        name={name} defaultChecked={value === this.value}
                        onChange={this.onChange} /> {title} &nbsp;
                </div>
            })}
            <div className="d-flex">
                {this.dateVisible && <div className="my-1 mx-3 d-flex">
                    {this.publicList.map((v, index) => {
                        let { value, name, title } = v;
                        return <div key={index} className="my-1 mx-3">
                            <input type="checkbox" value={value}
                                name={name} defaultChecked={value === this.value}
                                 /> {title} &nbsp;
                            </div>
                    })}
                </div>}
            </div>
        </div>
    };
}

const schema: Schema = [
    { name: 'discount', type: 'string', required: false },
    { name: 'submit', type: 'submit' },
];

export class VRelease extends VPage<CPosts>  {
    @observable private flag: boolean;
    async open() {
        this.openPage(this.page);
    }
    private uiSchema: UiSchema = {
        items: {
            discount: {
                widget: 'custom',
                label: '请选择',
                WidgetClass: Discount,
            } as UiCustom,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },

        }
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        let data = _.clone(context);
        console.log(data, 'data')
    }

    private page = () => {
        return <Page header="发布" headerClassName={consts.headerClass} >
            <Form className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false} />
        </Page>
    }
}