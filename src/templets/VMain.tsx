import * as React from "react";
import { VPage, UiSchema, Schema, UiInputItem, tv, Page, Form, Context, List, LMR, EasyTime, FA, Tuid } from "tonva";
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
        let {items} = this.controller;
        let right = <button className="btn btn-success btn-sm mr-2 align-self-center" onClick={this.onAddClick}>
            <FA name="plus" />
        </button>;
        return <Page header="模板" headerClassName={consts.headerClass} right={right}>
            <List items={items} item={{render:this.renderItem, onClick:this.itemClick}} />
        </Page>;
    });

    private onAddClick = () => {
        this.openVPage(VEdit);
    }

    private itemClick = (item:any) => {
        this.controller.showDetail(item.id);
    }

    private renderItem = (item:any, index:number) => {
        let {id, caption, content, $create, $update} = item;
        let right = <small className="text-muted"><EasyTime date={$update} /></small>
        return <LMR className="px-3 py-2" right={right}>
            {caption}
        </LMR>;
    }
}
