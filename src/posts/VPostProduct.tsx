import * as React from 'react';
import { VPage, Page, List, tv } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import classNames from 'classnames';

export class VPostProduct extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { showProduct, searchPostProduct, pagePostProduct, postProductType } = this.controller;
        let changeProductType = async (type: number) => {
            this.controller.postProductType = type;
            await searchPostProduct();
        };
        let right = (
            <div className="px-3" onClick={showProduct}>
                <div>
                    <span className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        let checkPostProductTypeUI: JSX.Element = <div className="text-center py-2">
            {
                [{type:1, desc:"帖文附加产品"},{type:2, desc:"产品应用"}].map((el: any) => {
                    return <button onClick={()=>{changeProductType(el.type) }}
                        className={classNames("btn btn-sm", postProductType === el.type ? "btn-primary" : "btn-outline-primary")}>{el.desc}</button>
                })
            }
        </div>;
        return <Page headerClassName={consts.headerClass} header={this.t('postproduct')} right={right}>
            {checkPostProductTypeUI}
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