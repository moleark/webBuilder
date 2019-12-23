import * as React from "react";
import { consts } from "consts";
import { CMedia } from "./CMedia";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, LMR, EasyTime, SearchBox } from "tonva";
import { VEdit } from "./VEdit";

export class VMain extends VPage<CMedia> {
    async open() {
    }

    render(member: any): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { pageMedia, searchMadiaKey, onAddClick } = this.controller;
        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchMadiaKey(key)}
                placeholder="请输入图片标题" />
            <button className="btn btn-success btn-sm ml-4 mr-2 align-self-center" onClick={onAddClick}>
                <FA name="plus" />
            </button>
        </div>;
        return <Page header="图片" headerClassName={consts.headerClass} right={right} onScrollBottom={this.onScrollBottom}>
            <List items={pageMedia} item={{ render: this.renderItem}} />
        </Page>;
    })

    private itemClick = (item: any) => {
        // this.controller.showMedia(item.id);
    }

    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }

    private renderItem = (item: any, index: number) => {
        let { caption, path, $create } = item;
        let right = <div className="border p-2"><img className="h-4c w-4c" src={path} /></div>;
        return <LMR className="px-3 py-2 border" right={right}>
            <div><b>{caption}</b></div>
            <div className="small">{path}</div>
            <small className="text-muted"><EasyTime date={$create} /></small>
            <button type="button" className=" btn btn-primary btn-sm mt-1 align-self-center text-small">打包</button>
        </LMR>;
    }
}