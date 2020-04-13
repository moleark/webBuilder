import * as React from "react";
import { consts } from "consts";
import { CMedia } from "./CMedia";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";

export class VPickCat extends VPage<CMedia> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageCat } = this.controller;
        return <Page header={this.t('picture')} headerClassName={consts.headerClass} onScrollBottom={this.onScrollBottom}>
            <List before={""} items={pageCat} item={{ render: this.renderItem }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    }
    private renderItem = (item: any, index: number) => {
        let { searchCat, onPickCat, current } = this.controller
        let { name, id } = item;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2"  >
                    <span>{name}</span>
                </div>
                <div className="d-flex">
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => onPickCat(current.id, id)}>
                            选择
                        </button>
                    </div>
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3" onClick={() => searchCat(id)}>
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };

}
