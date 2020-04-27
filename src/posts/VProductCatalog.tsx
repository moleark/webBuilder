import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observable } from "mobx";

export class VProductCatalog extends VPage<CPosts> {

    @observable caption: any = "产品目录树";
    @observable pageProductCatalog: any;

    async open(param: any) {
        this.pageProductCatalog = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={"产品目录树"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageProductCatalog} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private nextCatalog = async (model: any) => {
        await this.controller.searchProductCatalogChildrenKeys(model.productCategory.id)
        this.caption = model.name;
    }

    private renderItem = (model: any, index: number) => {
        let { productCategory, name } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{name}</span>
                </div>
                <div>
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => this.controller.showProductCatalogDetil(productCategory.id)} >
                            贴  文
                        </button>
                        <button className="btn btn-outline-info" onClick={() => this.nextCatalog(model)} >
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}