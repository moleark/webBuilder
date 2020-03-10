import * as React from "react";
import { VPage, Page, List, EasyTime, SearchBox } from "tonva";
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
            <div onClick={this.onAddClick}>
                <span className="ml-2 iconfont icon-jiahao1 mr-2"
                    style={{ fontSize: "26px", color: "white" }}>
                </span>
            </div>
        </div>;

        let none = <div className="my-3 mx-2 text-warning">
            <span className="text-primary" > 没有模板，请添加！</span>
        </div>;

        return <Page header="模板" headerClassName={consts.headerClass} right={right} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageTemplate} item={{ render: this.renderItem }} />
        </Page>;
    });

    private onAddClick = () => {
        this.openVPage(VEdit);
    }


    private onScrollBottom = async () => {
        await this.controller.pageTemplate.more();
    }

    private onPreview = (id: number) => {
        window.open('https://c.jkchemical.com/webBuilder/template/' + id, '_blank')
    }

    private renderItem = (item: any, index: number) => {
        let { caption, $update } = item;
        let right = <div>
            <small className="text-muted"><EasyTime date={$update} /></small>
            <button
                style={{ fontWeight: 550, padding: '0 5px', fontSize: '12px' }} className="mt-2 btn btn-outline-primary"
                onClick={() => this.onPreview(item.id)}
            >预览
            </button>
        </div>
        // return <LMR className="px-3 py-2 border-bottom" right={right}>
        //     <div>
        //         <span className=" iconfont icon-mobanguanli mr-2"
        //             style={{ fontSize: "24px", verticalAlign: 'middle', color: '#0066cc' }}>
        //         </span>
        //         <span>{caption}</span>
        //     </div>
        // </LMR>;
        return <div className="col-12 py-2 cursor-pointer">
            <div className="col-10 p-0" onClick={() => this.controller.showDetail(item.id)}>
                <span className=" iconfont icon-mobanguanli mr-2"
                    style={{ fontSize: "24px", verticalAlign: 'middle', color: '#0066cc' }}>
                </span>
                <span>{caption}</span>
            </div>
            <div className="col-2 text-right p-0">
                <small className="text-muted"><EasyTime date={$update} /></small>
                <button
                    style={{ fontWeight: 550, padding: '0 5px', fontSize: '12px' }} className="mt-2 btn btn-outline-primary"
                    onClick={() => this.onPreview(item.id)}
                >预览
                 </button>
            </div>
        </div>

    }
}
