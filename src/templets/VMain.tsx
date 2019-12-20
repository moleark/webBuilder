import * as React from "react";
import { VPage, UiSchema, Schema, UiInputItem, tv, Page, Form, Context, List, LMR, EasyTime, FA, Tuid, SearchBox } from "tonva";
import { consts } from "consts";
import { CTemplets } from "./CTemplets";
import { observer } from "mobx-react";
import { VEdit } from './VEdit';

export class VMain extends VPage<CTemplets> {
    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }
    private page = observer(() => {
        let { pageTemplate, searchTemplateKey } = this.controller;
        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchTemplateKey(key)}
                placeholder="请输入模板标题" />
            <button className="btn btn-success btn-sm ml-4 mr-2 align-self-center" onClick={this.onAddClick}>
                <FA name="plus" />
            </button>
        </div>;
        return <Page header="模板" headerClassName={consts.headerClass} right={right} onScrollBottom={this.onScrollBottom}>
            <List items={pageTemplate} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>;
    });

    private onAddClick = () => {
        this.openVPage(VEdit);
    }

    private itemClick = (item: any) => {
        this.controller.showDetail(item.id);
    }

    private onScrollBottom = async () => {
        await this.controller.pageTemplate.more();
    }

    private renderItem = (item: any, index: number) => {
        let { id, caption, content, $create, $update } = item;
        let right = <small className="text-muted"><EasyTime date={$update} /></small>
        return <LMR className="px-3 py-2 border" right={right}>
            {caption}
        </LMR>;
    }
}
