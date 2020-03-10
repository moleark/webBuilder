import * as React from 'react';
import { Page, VPage, ItemSchema, ImageSchema, UiSchema, UiImageItem, Edit, nav, userApi } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';

export class EditMeInfo extends VPage<CMe> {
    @observable private data: any;

    async open(param: any) {
        this.openPage(this.page);
    }
    private schema: ItemSchema[] = [
        // { name: 'nick', type: 'string' } as StringSchema,
        { name: 'icon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            // nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' } as UiTextItem,
            icon: { widget: 'image', label: this.t('headportrait') } as UiImageItem,
        }
    }

    constructor(props: any) {
        super(props);
        let { nick, icon } = nav.user;
        this.data = {
            nick: nick,
            icon: icon,
        };

    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        (nav.user as any)[name] = newValue;
        nav.saveLocalUser();
    }

    private page = () => {
        let { schema, uiSchema, data, onItemChanged } = this;
        return <Page header={this.t('personalinformation')}>
            <Edit schema={schema} uiSchema={uiSchema}
                data={data}
                onItemChanged={onItemChanged} />
        </Page>;
    }
}