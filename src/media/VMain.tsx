import * as React from "react";
import { consts } from "consts";
import { CMedia } from "./CMedia";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, LMR, EasyTime, SearchBox } from "tonva";
import copy from 'copy-to-clipboard';

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
            <List items={pageMedia} item={{ render: this.renderItem }} />
        </Page>;
    })

    // private itemClick = (item: any) => {
    //     this.controller.showMedia(item.id);
    // }

    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }

    private copyClick = (e: any) => {
        copy(e.target.previousElementSibling.innerText)
        alert('拷贝成功')
    }

    private renderItem = (item: any, index: number) => {
        let { caption, path, $create } = item;
        let right = <div className="border p-1"><img className="h-4c w-4c" src={path} /></div>;
        return <LMR className="px-3 py-2 border-bottom" right={right}>
            <div><b>{caption}</b></div>
            <div className="smallPath small">{path}</div>
            <button style={{ fontWeight: 550, padding:'0 5px'}} className="mt-2 strong btn btn-outline-primary" onClick={this.copyClick}>拷贝</button>
        </LMR >;
    }
}