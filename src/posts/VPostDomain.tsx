import * as React from 'react';
import { VPage, Page, List, tv } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPostDomain extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pagePostDomain, pickDomain } = this.controller;
        let right = (
            <div className="d-flex align-items-center" onClick={() => pickDomain(0)}>
                <div>
                    <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        return <Page headerClassName={consts.headerClass} header={this.t('贴文领域')} right={right}>
            {pagePostDomain.length > 0 && <List before={""} none="无" items={pagePostDomain} item={{ render: this.renderItem }} />}
        </Page>
    });

    private renderItem = (item: any, index: number) => {
        let { delPostDomain } = this.controller;
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {tv(item.domain, v => v.name)}
                </div>
                <div>
                    <span className="text-danger" onClick={() => delPostDomain(item.domain.id)}>
                        <div className="iconfont icon-shanchu pl-1"></div>
                    </span>
                </div>
            </div>
        );
    };
}