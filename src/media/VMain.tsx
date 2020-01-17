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
            <div onClick={onAddClick}>
                <span className="ml-4 iconfont icon-jiahao1 mr-2"
                    style={{ fontSize: "26px", color: "white" }}>
                </span>
            </div>
        </div>;
        let none = <div className="my-3 mx-2 text-warning">
            <span className="text-primary" > 没有图片，请添加！</span>
        </div>;
        return <Page header="图片" headerClassName={consts.headerClass} right={right} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageMedia} item={{ render: this.renderItem }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }

    private copyClick = (e: any) => {
        copy(e.target.previousElementSibling.innerText)
        alert('拷贝成功')
    }
    private preview = (path: any) => {
        window.open(path, '_blank')
    }

    private renderItem = (item: any, index: number) => {
        let { caption, path, $create } = item;
        let right = <div className="border p-1"><img className="h-4c w-4c" src={path} /></div>;
        return <LMR className="px-3 py-2 border-bottom cursor-pointer" right={right}>
            <div><b>{caption}</b></div>
            <div className="smallPath small">{path}</div>
            <button
                style={{ fontWeight: 550, padding: '0 5px', fontSize: '12px' }}
                className="mt-2 btn btn-outline-primary"
                onClick={this.copyClick}>
                拷贝
            </button >
            <button style={{ fontWeight: 550, padding: '0 5px', fontSize: '12px' }}
                className="mt-2 btn btn-outline-primary ml-2"
                onClick={() => this.preview(item.path)}
            >
                预览
            </button>

        </LMR >;
    }
}