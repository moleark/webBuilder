import * as React from 'react';
import { VPage, Page, List } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { setting } from 'configuration';

export class VPostSubject extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pagePostSubject, pickSubject } = this.controller;
        let right = (
            <div className="d-flex align-items-center" onClick={() => pickSubject("10000" + setting.BusinessScope)}>
                <div>
                    <span className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        return <Page headerClassName={consts.headerClass} header={this.t('postcatalog')} right={right}>
            {pagePostSubject.length > 0 && <List before={""} none="无" items={pagePostSubject} item={{ render: this.renderItem }} />}
        </Page>
    });

    private renderItem = (item: any, index: number) => {
        let { delPostSubject } = this.controller;
        return (
            <div className=" px-3 py-2 d-flex justify-content-between">
                <div>
                    {item.name}
                </div>
                <div>
                    <span className="text-danger" onClick={() => delPostSubject(item.subject.id)}>
                        <div className="iconfont icon-shanchu pl-1"></div>
                    </span>
                </div>
            </div>
        );
    };

}