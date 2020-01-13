import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, Form, UiSchema, UiInputItem, Schema, Context, Widget, UiCustom } from 'tonva';
import { observable } from 'mobx';


class Discount extends Widget {
    @observable dateVisible = false;
    private list = [
        { value: 1, title: '私有', name: 'a', checked: true },
        { value: 0, title: '公有', name: 'a', checked: false },
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        this.setValue(val);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                let { value, name, title } = v;
                return <label key={index} className="my-1 mx-3">
                    <input type="radio" value={value}
                        name={name} defaultChecked={value === this.value}
                        onChange={this.onChange} /> {title} &nbsp; </label>
            })}
        </div>
    };
}

export class VResacModule extends VPage<CPage> {
    private form: Form;
    async open() {
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { currentModule } = this.controller;
        let id = currentModule && currentModule.id;
        await this.controller.saveItemModule(id, context.form.data);
        await this.controller.onAddMap()
        this.closePage();
    }

    private uiSchema: UiSchema = {
        items: {
            content: {
                widget: 'textarea', label: '内容', placeholder: '请填写内容', rows: 10
            } as UiInputItem,
            sort: {
                widget: 'updown', label: '排序', placeholder: '请填写数字'
            } as UiInputItem,
            branchType: {
                widget: 'custom',
                label: '请选择',
                WidgetClass: Discount,
                defaultValue: "1",
            } as UiCustom,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'content', type: 'string', required: true },
        { name: 'sort', type: 'number', required: true },
        { name: 'branchType', type: 'number', required: true },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { currentModule } = this.controller;
        console.log(currentModule,'currentModule')
        return <Page header="编辑子模块" headerClassName={consts.headerClass}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    formData={currentModule}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={true}
                />
            </div>
            <div className="px-1 ">
                <div className="text-content" style={{ textAlign: "center" }}>
                    <button type="button" className="btn btn-primary mx-2"
                        onClick={this.onClickSaveButton} >保存</button>
                </div>
            </div>
        </Page>
    })
}