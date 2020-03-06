import * as React from 'react';
import _ from 'lodash';
import { VPage, Form, Context, UiSchema, Schema, Page, UiInputItem, UiIdItem, tv, Edit, ItemSchema } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CMedia } from './CMedia';


export class VChangeNames extends VPage<CMedia> {
    private form: Form;
    async open() {
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.controller.current[name] = newValue;
    }
    private onClickSaveButton = async () => {
        let { current } = this.controller;
        let id = current && current.id;
        console.log(id,'id')
        await this.controller.saveItem(id, current);
        this.closePage();
    }

    private uiSchema: UiSchema = {
        items: {
            caption: { widget: 'text', label: this.t('title') },
            submit: { widget: 'button', label: this.t('submit') }
        }
    };

    private schema: Schema = [
        { name: 'caption', type: 'string', required: true },
    ];
    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { current } = this.controller;
        let right = <div>
            <button type="button"
                className="btn btn-sm btn-success mr-3"
                onClick={this.onClickSaveButton} >{this.t('submit')}
            </button>
        </div>;
        return <Page header={this.t('editorpost')}
            right={right}
            headerClassName={consts.headerClass}>
            <div className="mx-3 py-2 h-100 d-flex flex-column">
                <Edit data={current}
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onItemChanged={this.onItemChanged}
                />
            </div>
        </Page>
    })
}