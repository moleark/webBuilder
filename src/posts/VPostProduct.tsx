import * as React from 'react';
import { VPage, Page, List, tv } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPostProduct extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { showProduct, pagePostProduct } = this.controller;
        let right = (
            <div className="px-3" onClick={showProduct}>
                <div>
                    <span className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        return <Page headerClassName={consts.headerClass} header={this.t('postproduct')} right={right}>
            <List before={""} none="无" className="mt-1" items={pagePostProduct} item={{ render: this.renderItem }} />
        </Page >
    });

    private renderItem = (item: any, index: number) => {
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {tv(item.product, v => <div>
                        <div className="py-1">  {v.description}</div>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 " >
                            <div className="col d-flex align-items-center">
                                <small>品牌： {tv(v.brand, vv => vv.name)}</small>
                            </div>
                            <div className="col d-flex align-items-center">
                                <small>产品编号：{v.origin}</small>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div>
                    <span className="text-danger" >
                        <span className="iconfont icon-shanchu pl-1" onClick={() => this.controller.delPostProduct(item)}></span>
                    </span>
                </div>
            </div>
        );
    };
}