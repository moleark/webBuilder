import * as React from "react";
import { consts } from "consts";
import { CMedia } from "./CMedia";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, LMR, EasyTime } from "tonva";
import { VEdit } from "./VEdit";

export class VMain extends VPage<CMedia> {
    async open() {
    }

    render(member: any): JSX.Element {
        return <this.page />
    }

    private onAddClick = () => {
        this.openVPage(VEdit);
    }

    private page = observer(() => {
        let {items} = this.controller;
        let right = <button className="btn btn-success btn-sm mr-2 align-self-center" onClick={this.onAddClick}>
            <FA name="plus" />
        </button>;
        return <Page header="图片" headerClassName={consts.headerClass} right={right}>
            <List items={items} item={{render:this.renderItem, onClick:this.itemClick}} />
        </Page>;
    })

    private itemClick = (item:any) => {
        //this.controller.showTemplet(item.id);
    }

    private renderItem = (item:any, index:number) => {
        let {caption, path, $create} = item;
        let right = <img className="h-max-12c" src={path} />;
        return <LMR className="px-3 py-2" right={right}>
            <div><b>{caption}</b></div>
            <div>{path}</div>
            <small className="text-muted"><EasyTime date={$create} /></small>
        </LMR>;
    }
}