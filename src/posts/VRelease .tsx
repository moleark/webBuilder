import * as React from 'react';
import { CPosts } from './CPosts';
import { VPage, Page, Widget, UiSchema, UiCustom, Form, Schema, Context, setRes } from 'tonva';
import { consts } from 'consts';
import { observable } from 'mobx';
import _ from "lodash"

interface ReleaseType {
    id: string
    list: any[];
}

const res: { [prop: string]: string | any } = {
    sales: '内部销售',
    agent: '轻代理',
    privateSite: '内部网站',
    publicSite: '公开网站',
    $en: {
        sales: 'Sales',
        agent: 'Agent',
        privateSite: 'Private Site',
        publicSite: 'Public Site',
    }
};

const tt = setRes(res, res);


class Discount extends Widget {
    @observable dateVisible = false;
    private result: ReleaseType[] = observable.array([], { deep: true });
    private list = [
        { value: 1, title: tt('sales'), name: 'a', checked: true },
        { value: 2, title: tt('agent'), name: 'a', checked: true },
        { value: 3, title: tt('privateSite'), name: 'a', checked: true },
        { value: 4, title: tt('publicSite'), name: 'a', checked: true },
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        let sel = evt.currentTarget.checked;
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
                    <label>
                        <input type="checkbox" value={value}
                            name={name} defaultChecked={value === this.value}
                            onChange={this.onChange} /> {title} &nbsp;
					</label>
                </div>
            })}
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
				requiredFlag={false}
				fieldLabelSize={2} />
        </Page>
    }
}