import * as React from 'react';
import { CPosts } from "./CPosts";
import { VPage, UiSchema, Schema, Page, UiInputItem, UiIdItem, tv, Edit, ItemSchema, FA } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { setting } from 'configuration';
import classNames from "classnames";
import { observable } from 'mobx';
export class VEdit extends VPage<CPosts> {

    @observable isOn: boolean;
    @observable isOnLanguage: boolean;
    private textarea: HTMLTextAreaElement;

    async open() {

        let { current } = this.controller;
        let { emphasis, language } = current;
        this.isOn = emphasis === 1;
        this.isOnLanguage = language === 1;
        this.openPage(this.page);
    }

    private onClickSaveButton = async () => {

        let { current } = this.controller;
        let id = current && current.id;
        current.content = this.textarea.value;
        current.emphasis = this.isOn ? 1 : 0;
        current.language = this.isOnLanguage ? 1 : 0;

        await this.controller.savePost(id, current);
        this.closePage();
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.controller.current[name] = newValue;
    }

    private imageContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { caption } = values;
            return <>{caption}</>;
        });
    }

    private uiSchema: UiSchema = {
        items: {
            caption: { widget: 'text', label: this.t('title'), placeholder: this.t('title') } as UiInputItem,
            discription: {
                widget: 'textarea', label: this.t('describe'), placeholder: this.t('describe'), rows: 3
            } as UiInputItem,
            image: {
                widget: 'id', label: this.t('picture'), pickId: this.controller.pickImage, Templet: this.imageContent
            } as UiIdItem,
            url: {
                widget: 'text', label: this.t('url'), placeholder: this.t('url'),
                rules: (value: string) => {
                    if ((value && !/^\/[\w-\/]+$/.test(value)))
                        return 'url必须以/开头，其后只允许出现数字、字母、连字符-或斜杠/';
                }
            } as UiInputItem,
            submit: { widget: 'button', label: this.t('submit') }
        }
    };

    private schema: Schema = [
        { name: 'caption', type: 'string', required: true },
        { name: 'discription', type: 'string', required: false },
        { name: 'image', type: 'id', required: true },
        { name: 'url', type: 'string', required: true },
    ];

    render(): JSX.Element {
        return <this.page />
    }

    private onOff = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.isOn = evt.currentTarget.value === 'veryimport';
    }

    private isImportant() {
        let cnButton = ['btn', 'btn-outline-primary', 'btn-sm', 'text-nowrap'];
        return <div className="px-sm-2 d-flex align-items-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={classNames(cnButton, { active: !this.isOn })}>
                    <input type="radio" name="options" value="general" defaultChecked={false} onChange={this.onOff} />
                    <span className="d-inline d-sm-none">{this.t('general')}</span>
                    <span className="d-none d-sm-inline">{this.t('general')}</span>
                </label>
                <label className={classNames(cnButton, { active: this.isOn })}>
                    <input type="radio" name="options" value="veryimport" defaultChecked={true} onChange={this.onOff} />
                    <span className="d-inline d-sm-none">{this.t('important')}</span>
                    <span className="d-none d-sm-inline">{this.t('important')}</span>
                </label>
            </div>
        </div>
    }

    private onOffLanguage = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.isOnLanguage = evt.currentTarget.value === 'veryimport';
    }
    private language() {
        let cnButton = ['btn', 'btn-outline-primary', 'btn-sm', 'text-nowrap'];
        return <div className="px-sm-2 d-flex align-items-center">
            <div className="btn-group btn-group-toggle mx-2" data-toggle="buttons">
                <label className={classNames(cnButton, { active: !this.isOnLanguage })}>
                    <input type="radio" name="options" value="general" onChange={this.onOffLanguage} />
                    <span className="d-inline d-sm-none">{this.t('ch')}</span>
                    <span className="d-none d-sm-inline">{this.t('ch')}</span>
                </label>
                <label className={classNames(cnButton, { active: this.isOnLanguage })}>
                    <input type="radio" name="options" value="veryimport" onChange={this.onOffLanguage} />
                    <span className="d-inline d-sm-none">{this.t('en')}</span>
                    <span className="d-none d-sm-inline">{this.t('en')}</span>
                </label>
            </div>
        </div>
    }

    private page = observer(() => {

        let { current, showPostProductCatalog, showPostSubject, showPostDomain, showPostProduct } = this.controller;

        let right = <div>
            <button type="button"
                className="btn btn-sm btn-success mr-3"
                onClick={this.onClickSaveButton} >{this.t('submit')}
            </button>
        </div>;
        return <Page header={this.t('editorpost')} right={right} headerClassName={consts.headerClass}>
            <div className="mx-3 py-2 h-100 d-flex flex-column">
                <textarea ref={tt => this.textarea = tt} className="flex-fill mb-2" defaultValue={current.content} rows={20} />
                <Edit data={current}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onItemChanged={this.onItemChanged}
                />
                {current.id && branch("目录", showPostProductCatalog)}
                {current.id && branch("栏目", showPostSubject)}
                {current.id && branch("领域", showPostDomain)}
                {current.id && (setting.BusinessScope !== 2) && branch("产品", showPostProduct)}
                <div className="bg-white py-2 d-flex justify-content-end cursor-pointer ">
                    {this.language()}{this.isImportant()}
                </div>
            </div >
        </Page >
    })
}

function branch(name: string, action: any): JSX.Element {
    return <div className="bg-white py-2 d-flex justify-content-between cursor-pointer mb-1" onClick={action}>
        <div>
            <span className="ml-1 mx-3">{name}</span>
        </div>
        <div >
            <FA name='angle-right  mx-3'></FA>
        </div>
    </div >
}