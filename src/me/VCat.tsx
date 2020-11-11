import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { observable } from "mobx";
import { CMe } from "./CMe";

export class VCat extends VPage<CMe> {
    @observable pageCat: any;

    async open(param: any) {
        this.pageCat = param.pageCat;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { name } = param;
        let { showAddCat } = this.controller;
        let right = <div onClick={() => showAddCat(param)}>
            <span className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>;
        return <Page header={name} headerClassName={consts.headerClass}
            onScrollBottom={this.onScrollBottom} right={right}>
            <List before={""} items={this.pageCat} item={{ render: this.renderItem }} />
        </Page>;
    })

    // nextCart = async (item: any) => {
    //     await this.controller.searchCat(item);
    //     // this.capton = item.name;
    // }

    private delCat = async (model: any) => {
        let { saveCat, showCat } = this.controller;
        let { id, name } = model;
        await saveCat(id, id, name, 0);
        this.closePage()
        showCat({ name: (this.t('pictureclassify')), id: 0 })
    }


    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }
    private renderItem = (item: any, index: number) => {
        let a = { item }
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex justify-content-between">
                <div className="mx-2 small" >
                    <span>{item.name}</span>
                </div>
                <div className="d-flex">
                    <div className="text-right w-7c" onClick={() => this.delCat(item)} >
                        <span className="p-2 small pl-4 text-primary cursor-pointer">
                            删 除
                </span>
                    </div>
                    <div className="text-right w-7c" onClick={() => this.controller.showEditCat(item)} >
                        <span className="p-2 small pl-4 text-primary cursor-pointer">
                            编 辑
                </span>
                    </div>
                    <div className="  text-right w-7c" onClick={() => this.controller.showCat(item)} >
                        <span className="p-2 small pl-4 text-primary cursor-pointer iconfont icon-more" style={{ fontSize: "12px" }}>
                        </span>
                    </div>
                </div>

            </div >
            /* <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                 <div className="d-flex flex-fill mx-2"  >
                     <span>{item.name}</span>
                 </div>
                 <div className="d-flex">
                     <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                         <button className="btn btn-outline-info mx-2 px-3" onClick={() => this.delCat(item)}>
                             删除
                         </button>
                         <button className="btn btn-outline-info mx-2 px-3" onClick={() => this.controller.showEditCat(item)}>
                             编辑
                         </button>
                         <button className="btn btn-outline-info mx-2 px-3" onClick={() => this.controller.showCat(item)}>
                             下一级
                         </button>
                     </div>
                 </div>
             </div >*/
        );
    };

}
