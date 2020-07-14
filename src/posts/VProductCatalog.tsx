import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observable } from "mobx";

export class VProductCatalog extends VPage<CPosts> {

    @observable caption: any;
    @observable pageProductCatalog: any;

    async open(param: any) {
        this.pageProductCatalog = param.data;
        this.caption = param.name;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.caption} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageProductCatalog} item={{ render: this.renderItem }} />
            </Page>
        );
    });


    private renderItem = (model: any, index: number) => {
        // let { name } = model;
        let { showProductCatalogDetil, searchProductCatalogChildrenKeys } = this.controller;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex ">
                <div className="d-flex  mx-2 w-50 small" >
                    <span>{model.name}</span>
                </div>
                <div className="w-25 text-right w-7c" onClick={() => showProductCatalogDetil(model)} >
                    <span className="p-2 small pl-4 text-primary cursor-pointer">
                        贴  文
                </span>
                </div>
                <div className="w-25  text-right w-7c" onClick={() => searchProductCatalogChildrenKeys(model)} >
                    <span className="p-2 small pl-4 text-primary cursor-pointer">
                        下一级
                </span>
                </div>
            </div >
            /*<div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-2 d-flex align-items-center ">
                <div className="d-flex align-items-center flex-fill mx-2 " >
                    <span>{model.name}</span>
                </div>
                <div>
                    <div className="small d-flex align-items-center cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => showProductCatalogDetil(model)} >
                            贴  文
                        </button>
                        <button className="btn btn-outline-info" onClick={() => searchProductCatalogChildrenKeys(model)} >
                            下一级
                        </button>
                    </div>
                </div>
            </div >*/
        );
    };
}