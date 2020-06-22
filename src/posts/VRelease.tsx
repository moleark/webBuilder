import * as React from 'react';
import { CPosts } from './CPosts';
import { VPage, Page, Widget, UiSchema, UiCustom, Form, Schema, Context, setRes } from 'tonva';
import { consts } from 'consts';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const res: { [prop: string]: string | any } = {
    sales: '销售助手',
    agent: '轻代理',
    privateSite: '内部网站',
    publicSite: '内容网站',
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


    //private result: ReleaseType[] = observable.array([], { deep: true });
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
        let result: any = this.value || {};
        result[val] = sel;
        this.setValue(result);
    }

    render = () => {
        let list = [
            { value: 1, title: tt('sales'), name: 'a', checked: this.value['1'] },
            { value: 2, title: tt('agent'), name: 'a', checked: this.value['2'] },
            { value: 3, title: tt('privateSite'), name: 'a', checked: this.value['3'] },
            {
                value: 4, title: tt('publicSite'), name: 'a', checked: this.value['4'],
                subList: [
                    { value: 5, title: 'a', name: 'a', checked: true },
                    { value: 6, title: 'b', name: 'a', checked: false },
                    { value: 7, title: 'c', name: 'a', checked: false },
                    { value: 8, title: 'd', name: 'a', checked: false }
                ]
            }
        ];

        return <div className="form-control" style={{ height: 'auto' }}>
            {list.map((v, index) => {
                let { value, name, title, checked } = v;
                return <div key={index} className="my-1 mx-3">
                    <label>
                        <input type="checkbox" value={value}
                            name={name} defaultChecked={checked}
                            onChange={this.onChange} /> {title} &nbsp;
                    </label>
                </div>
            })}
        </div>
    };

}

const schema: Schema = [
    { name: 'discount', type: 'string', required: false },
    //{name: 'submit', type: 'submit' },
];



export class VRelease extends VPage<CPosts>  {
    private form: Form;
    @observable showTips: any = "none";
    @observable startdate: any;
    @observable enddate: any;
    @observable starttimes: any;

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
            submit: { widget: 'button', label: this.t('publish'), className: 'btn btn-primary w-8c' },
        }
    }

    private onPublish = async () => {
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { publishPost } = this.controller;
        let { discount } = context.data;
        let arr = [];
        for (let i in discount) {
            if (discount[i] === true) arr.push(Number(i))
        }
        publishPost(arr, this.startdate, this.enddate);
    }

    private page = observer(() => {
        let { showPostPublishForProduct } = this.controller;
        let def = {
            discount: {
                "1": true,
                "2": true,
                "3": true,
                "4": true
            }
        };
        return <Page header={this.t('publish')} headerClassName={consts.headerClass} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
                fieldLabelSize={2}
                formData={def} />

            <div className="bg-white m-3 p-3 text-center">
                <form className="form-inline p-2 justify-content-center">
                    <label className="mr-4 pl-2 "  >
                        <input id="input1" type="radio" name="reselse" value="reselse1" onClick={() => this.changeType("")} />
                        <span className="px-2">定时发布</span>
                    </label>
                    <label className="ml-4 pr-2">
                        <input type="radio" name="reselse" value="reselse2" checked onClick={() => this.changeType("none")} />
                        <span className="px-2"> 长期有效 </span>
                    </label>
                </form>
                <div className="small" style={{ display: this.showTips }}>
                    <div><label> 开始日期：<input type="date" onChange={this.onChangeStartdate} /></label></div>
                    <div><label> 结束日期：<input type="date" onChange={this.onChangeEnddate} /></label>
                        <p id="tipun" style={{ color: "red" }}></p>
                    </div>
                </div>
                <div className="p-3 my-3">
                    <button type="button" className="btn btn-outline-info ml-2" onClick={this.onPublish} >
                        {this.t('ordinarypublish')}
                    </button>
                    <button type="button" className="btn btn-primary ml-4" onClick={showPostPublishForProduct} >
                        {this.t('productpublish')}
                    </button>
                </div>
            </div>


        </Page >

    });

    private onChangeStartdate = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.startdate = evt.currentTarget.value;
        this.starttimes = Date.parse(this.startdate.replace(/-/g, "/"))
    }

    private onChangeEnddate = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.enddate = evt.currentTarget.value;
        let endtimes = Date.parse(this.enddate.replace(/-/g, "/"))
        if (this.startdate !== "" && this.enddate !== "" && this.starttimes > endtimes) {
            document.getElementById('tipun').innerHTML = ("开始时间必须小于或者等于结束时间！");
            evt.currentTarget.value = null
        } else {
            this.enddate = evt.currentTarget.value;
        }

    }
    private changeType = (type: any) => {
        this.showTips = type;
        alert("asas")
    }

}
