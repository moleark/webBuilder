import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observable } from "mobx";

export class VDomain extends VPage<CPosts> {
    @observable name: any;
    @observable pageDomain: any;
    async open(param: any) {
        this.pageDomain = param.domain;
        this.name = param.name;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.name} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageDomain} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showDomainPost, showDomain } = this.controller;
        console.log(model)
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex ">
                <div className="mx-2 w-50 small" >
                    <span>{model.name}</span>
                </div>
                <div className="w-25 text-right w-7c" onClick={() => showDomainPost(model, "")} >
                    <span className="p-2 small pl-4 text-primary cursor-pointer">
                        贴  文
                </span>
                </div>
                <div className="w-25  text-right w-7c" onClick={() => showDomain(model)} >
                    <span className="p-2 small pl-4 text-primary cursor-pointer">
                        下一级
                </span>
                </div>
            </div >
            /* <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                 <div className="d-flex flex-fill mx-2" >
                     <span>{model.name}</span>
                 </div>
                 <div onClick={() => showDomainPost(model, "")} >
                     <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                         <button className="btn btn-outline-info mx-2 px-3">
                             贴  文
                         </button>
                     </div>
                 </div>
                 <div onClick={() => showDomain(model)} >
                     <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                         <button className="btn btn-outline-info mx-2 px-3">
                             下一级
                         </button>
                     </div>
                 </div>
             </div >*/
        );
    };
}