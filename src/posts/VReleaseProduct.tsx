import * as React from 'react';
import { VPage, Page, List, tv } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VReleaseProduct extends VPage<CPosts> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        let pageright = <div onClick={this.controller.showProduct}>
            <span
                className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer"
                style={{ fontSize: "1.7rem", color: "white" }}
            ></span>
        </div>
        return <Page header={this.t('productpublish')} headerClassName={consts.headerClass} right={pageright} >
            <List
                before={""}
                none={none}
                items={this.controller.postProduct}
                item={{ render: this.renderItem }}
            />
        </Page>;
    })

    private renderItem = (item: any, index: number) => {
        let { product, post } = item;
        let { delPostProduct } = this.controller;
        return <div>
            {
                tv(product, vl => <div className="w-100 mx-3 py-3" >
                    <b>{vl.descriptionC}</b>
                    <div className="pt-2">{vl.description}</div>
                    <div className="row row-cols-1 small" >
                        <div className="col d-flex pt-2">品牌：{tv(vl.brand, val => val.name)}</div>
                        <div className="col d-flex pt-2">产品编号：{vl.origin}</div>
                        <div className="col d-flex pt-2">品牌：{tv(vl.brand, val => val.name)}</div>
                        <div className="col d-flex pt-2">产品编号：{vl.origin}</div>
                    </div>
                    <button className="btn btn-outline-info pt-2" onClick={() => delPostProduct(product)}> 删除</button>
                </div>
                )
            }
        </div>
    };
}
