import * as React from "react";
import { consts } from "consts";
import { CMedia } from "./CMedia";
import { observer } from "mobx-react";
import { VPage, Page, SearchBox, FA, List } from "tonva";
import copy from 'copy-to-clipboard';

export class VFile extends VPage<CMedia> {
    async open() {
        this.openPage(this.page)
    }

    private page = observer(() => {

        let { pageFile, searchMadiaKey, addAddFile, onScrollBottom } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80 mt-1 mr-2" size='sm' onSearch={(key: string) => searchMadiaKey(key, 2)} placeholder={this.t('搜索文件')} />
            <div onClick={addAddFile}>
                <span className="ml-2 iconfont icon-jiahao1 mr-2"
                    style={{ fontSize: "26px", color: "white" }}>
                </span>
            </div>
        </div>;

        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );

        return <Page header={this.t('文件')} headerClassName={consts.headerClass} right={right} onScrollBottom={onScrollBottom}>
            <List before={""} none={none} items={pageFile} item={{ render: this.renderItem }} />
        </Page>;
    })


    private copyClick = (e: any, path: any) => {
        let el = e.target as HTMLElement;
        let innerHTML = el.innerHTML;
        copy(path);
        el.innerHTML = '<div class="text-center text-danger w-100"> <span style="color:transparent">- - - - - -</span> url ' + this.t('copysuccess') + '<span style="color:transparent">- - - - - -</span> </div>';
        setTimeout(() => {
            el.innerHTML = innerHTML;
        }, 1000);

    }

    private preview = (path: any) => {
        window.open(path, '_blank')
    }

    private renderItem = (item: any, index: number) => {
        let { onRem } = this.controller;
        let { caption, path, id } = item;
        let { onimgNames } = this.controller
        return <div key={index} className="col px-3 py-2 border-bottom border-dark">
            <div className="text-info bg-light p-2 d-flex text-nowrap cursor-pointer border-bottom">
                <div className="d-flex flex-fill" onClick={() => onimgNames(id)} >
                    <div className="overflow-hidden flex-fill small">{caption}</div>
                    <div className=""><FA name="edit" /></div>
                </div>
                <div className="iconfont icon-shanchu pl-1" onClick={() => onRem(id)}></div>
            </div>

            <div className="d-flex align-items-center bg-white rounded  cursor-pointer"
                onClick={() => this.preview(item.path)}>
            </div>
            <div className="smallPath small my-2 text-muted cursor-pointer"
                onClick={(e) => this.copyClick(e, path)}>
                <span>{path}</span>
                <span><small className=" text-muted float-right" >{this.t('copy')}</small></span>
            </div>
        </div>
    }
}
