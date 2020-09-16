import * as React from 'react';
import { CPosts } from './CPosts';
import { VPage, Page, Widget, UiSchema, UiCustom, Form, Schema, Context, setRes } from 'tonva';
import { consts } from 'consts';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { setting } from 'configuration';

const res: { [prop: string]: string | any } = {
    sales: '销售助手',
    agent: '轻代理',
    publicSite: '内容网站',
    internationSite: '国际网站',
    // privateSite: '内部网站',
    $en: {
        sales: 'Sales',
        agent: 'Agent',
        publicSite: 'Public Site',
        internationSite: 'Internation Site',
        // privateSite: 'Private Site',
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
        let list = [];
        if (setting.BusinessScope === 1) {
            list.push({ value: 1, title: tt('sales'), name: 'a', checked: this.value['1'] });
            list.push({ value: 2, title: tt('agent'), name: 'a', checked: this.value['2'] });
            list.push({ value: 4, title: tt('publicSite'), name: 'a', checked: this.value['4'] });
        } else if (setting.BusinessScope === 2) {
            list.push({
                value: 5, title: tt('空中课堂'), name: 'a', checked: this.value['5']
            });
        } else if (setting.BusinessScope === 3) {
            list.push({
                value: 6, title: tt('BV网站'), name: 'a', checked: this.value['6']
            });
        }

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
            if (discount[i] === true) arr.push(Number(i));
        }
        publishPost(arr, this.startdate, this.enddate);
    }

    private page = observer(() => {
        let def = {
            discount: {
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false
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

            <form className=" w-100 px-3">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <div className=" bg-white text-center py-2" style={{
                            borderRadius: "0.25rem", border: "1px solid #ccc"
                        }} >
                            <label className="p-2 mr-3" >
                                <input type="radio" name="reselse" onClick={() => this.changeType("")} />
                                <span className="">定时发布</span>
                            </label>
                            <label className="p-2 ml-3">
                                <input type="radio" name="reselse" onClick={() => this.changeType("none")} />
                                <span className=""> 长期有效 </span>
                            </label>
                            <div className="small" style={{ display: this.showTips }}>
                                <div><label> 开始日期：<input type="date" onChange={this.onChangeStartdate} /></label></div>
                                <div><label> 结束日期：<input type="date" onChange={this.onChangeEnddate} /></label>
                                    <p id="remind" style={{ color: "red" }}></p >
                                </div>
                            </div>
                        </div></div>
                </div>
            </form>

            <div className="p-3 my-1  text-center">
                <button type="button" className="btn btn-outline-info ml-2" onClick={this.onPublish} >
                    {this.t('ordinarypublish')}
                </button>
            </div>
        </Page >

    });

    private onChangeStartdate = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.startdate = evt.currentTarget.value;
        this.starttimes = Date.parse(this.startdate.replace(/-/g, "/"))
    }

    private onChangeEnddate = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.enddate = evt.currentTarget.value;
        let endtimes = Date.parse(this.enddate.replace(/-/g, "/"));
        if (this.startdate !== "" && this.enddate !== "" && this.starttimes > endtimes) {
            document.getElementById('remind').innerHTML = ("结束时间必须大于或等于开始时间！");
            evt.currentTarget.value = null
        } else {
            document.getElementById('remind').innerHTML = ("");
            this.enddate = evt.currentTarget.value;
        }

    }
    private changeType = (type: any) => {
        this.showTips = type;
    }

}
