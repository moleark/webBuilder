import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { observable } from "mobx";
import { CMe } from "./CMe";

export class VCat extends VPage<CMe> {
    @observable capton: any = "图片分类";

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageCat, showAddCat } = this.controller;
        let right = <div onClick={showAddCat}>
            <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>;
        return <Page header={this.capton} headerClassName={consts.headerClass} onScrollBottom={this.onScrollBottom} right={right}>
            <List before={""} items={pageCat} item={{ render: this.renderItem }} />
        </Page>;
    })

    nextCart = async (item: any) => {
        await this.controller.searchCat(item.id);
        this.capton = item.name;
    }


    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }
    private renderItem = (item: any, index: number) => {
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2"  >
                    <span>{item.name}</span>
                </div>
                <div className="d-flex">
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => this.nextCart(item)}>
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };

}
