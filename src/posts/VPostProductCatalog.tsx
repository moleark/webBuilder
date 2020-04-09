import * as React from 'react';
import { VPage, Page, List } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPostProductCatalog extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pagePostProductCatalog, pickProductCatalog, pagePostProductCatalogExplain } = this.controller;
        let right = (
            <div className="d-flex align-items-center" onClick={pickProductCatalog}>
                <div>
                    <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        return <Page headerClassName={consts.headerClass} header={this.t('贴文目录')} right={right}>
            {pagePostProductCatalogExplain.length > 0 && < List before={""} none="无" items={pagePostProductCatalogExplain} item={{ render: this.renderItemExplain }} />}
            {pagePostProductCatalog.length > 0 && <List before={""} none="无" className="mt-1" items={pagePostProductCatalog} item={{ render: this.renderItem }} />}

        </Page >
    });

    private renderItem = (item: any, index: number) => {
        let { delPostProductCatalog } = this.controller;
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {item.name}
                </div>
                <div
                    className="px-4 py-3 cursor-pointer"
                    style={{
                        backgroundColor: "#f9f9f9",
                        width: "90%",
                        borderRadius: "8px",
                        margin: "-4rem auto 2rem auto",
                        boxShadow: "2px 2px 15px #333333"
                    }}
                >
                    <span className="small px-2 text-primary">节点分类</span>
                    <span className="text-danger" onClick={() => delPostProductCatalog(item.post.id, item.productCategory.id)}>
                        <span className="iconfont icon-shanchu pl-1"></span>
                    </span>
                </div>
            </div>
        );
    };

    private renderItemExplain = (item: any, index: number) => {
        let { delPostProductCatalogExplain } = this.controller;
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {item.name}
                </div>
                <div>
                    <span className="small px-2 text-primary">节点描述</span>
                    <span className="text-danger" onClick={() => delPostProductCatalogExplain(item.post.id, item.productCategory.id)}>
                        <span className="iconfont icon-shanchu pl-1"></span>
                    </span>
                </div>

            </div>
        );
    };
}