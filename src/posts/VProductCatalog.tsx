import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";

export class VProductCatalog extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageProductCatalog } = this.controller;
        return (
            <Page header={"产品目录树"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={pageProductCatalog} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { searchProductCatalogChildrenKey, showProductCatalogDetil } = this.controller;
        let { productCategory, name } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{name}</span>
                </div>
                <div>
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => showProductCatalogDetil(productCategory.id)} >
                            贴  文
                        </button>
                        <button className="btn btn-outline-info" onClick={() => searchProductCatalogChildrenKey(productCategory.id)} >
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}