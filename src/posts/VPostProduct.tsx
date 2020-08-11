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
        let { showProduct, pagePostProdut } = this.controller;
        let right = (
            <div className="px-3" onClick={showProduct}>
                <div>
                    <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        return <Page headerClassName={consts.headerClass} header={this.t('贴文产品')} right={right}>
            {pagePostProdut.length > 0 && <List before={""} none="无" className="mt-1" items={pagePostProdut} item={{ render: this.renderItem }} />}
        </Page >
    });

    private renderItem = (item: any, index: number) => {
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {tv(item.product, v => <div>
                        <div>  {v.description}</div>
                        <div>  {v.origin}</div>
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