import * as React from 'react';
import { VPage, Page, LMR, List, SearchBox } from "tonva";
import { observer } from 'mobx-react';
import { CMe } from './CMe';

export class VTeamPostSource extends VPage<CMe> {

    async open() {
        this.openPage(this.page);
    }

    render(): JSX.Element {
        return <this.page />
    }
    private itemClick = (item: any) => {
        // this.controller.onPickedSoure(item.id);
    };
    private page = observer(() => {
        return <Page header={'渠道来源'} back="close" >
            <div id='a' className="px-3 py-2 text-muted border bg-white text-center" onClick={this.itemClick}> 网站 </div>
            <div className="px-3 py-2 text-muted border bg-white text-center"> <b>轻代理</b></div>
            <div className="px-3 py-2 text-muted border bg-white text-center"> <b>销售助手</b></div>
            <div className="px-3 py-2 text-muted border bg-white text-center"> <b>邮件</b> </div>
            <div className="px-3 py-2 text-muted border bg-white text-center"> <b>其他</b> </div>
        </Page>
    });
}
