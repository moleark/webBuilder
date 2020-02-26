import * as React from 'react';
import { CPosts } from './CPosts';
import { VPage, Page, Widget, UiSchema, UiCustom, Form, Schema, Context } from 'tonva';
import { consts } from 'consts';
import { observe, observable } from 'mobx';
import _, { List } from "lodash"

interface ReleaseType {
    id: string
    list: any[];
}

class Discount extends Widget {

    @observable dateVisible = false;
    private result: ReleaseType[] = observable.array([], { deep: true });
    private list = [
        { value: 1, title: '内部销售', name: 'a', checked: true },
        { value: 2, title: '轻代理', name: 'a', checked: false },
        { value: 3, title: '内部网页', name: 'a', checked: false },
        {
            value: 4, title: '公开网页', name: 'a', checked: false,
            subList: [
                { value: 5, title: 'a', name: 'a', checked: true },
                { value: 6, title: 'b', name: 'a', checked: false },
                { value: 7, title: 'c', name: 'a', checked: false },
                { value: 8, title: 'd', name: 'a', checked: false }
            ]
        }
    ];

    private publicList = [
        { value: 5, title: 'a', name: 'a', checked: true },
        { value: 6, title: 'b', name: 'a', checked: undefined },
        { value: 7, title: 'c', name: 'a', checked: undefined },
        { value: 8, title: 'd', name: 'a', checked: undefined }
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        let sel = evt.currentTarget.checked;
        // this.dateVisible = val === '4' && sel === true;
        if (sel) {
            let a: ReleaseType = { id: val, list: undefined }
            this.result.push(a);
        } else {
            let index = this.result.findIndex(v => v.id === val);
            this.result.splice(index, 1);
        }
        this.setValue(this.result);
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
                            <input type="checkbox" value={value} name={name} defaultChecked={value === this.value} /> {title} &nbsp;
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
    async open() {
        this.openPage(this.page);
    }
    private uiSchema: UiSchema = {
        items: {
            discount: {
                widget: 'custom',
                label: this.t('pleaseselect'),
                WidgetClass: Discount,
            } as UiCustom,
            submit: { widget: 'button', label: this.t('submit'), className: 'btn btn-primary w-8c' },
        }
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        let { publishPost } = this.controller;
        let data = _.clone(context.data);
        let { discount } = data;
        let arr = [];
        for (let i = 0; i < discount.length; i++) {
            arr.push(discount[i].id)
        }
        publishPost(arr);

    }

    private page = () => {
        return <Page header={this.t('publish')} headerClassName={consts.headerClass} >
            <Form className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false} />
        </Page>
    }
}