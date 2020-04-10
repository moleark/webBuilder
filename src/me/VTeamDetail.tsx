import * as React from 'react';
import { Page, VPage } from 'tonva';
import { CMe } from './CMe';
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VTeamDetail extends VPage<CMe> {

    async open(id: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { postPubSum, postTranSum, postHitSum } = this.controller.nowAchievement;
        return <Page header={this.t('privatedetail')} headerClassName={consts.headerClass}>
            <div className='px-3 py-2 border bg-white'>发布量：{postPubSum}</div>
            <div className='px-3 py-2 border bg-white'>转发量：{postTranSum}</div>
            <div className='px-3 py-2 border bg-white'>浏览量：{postHitSum}</div>
        </Page>;

    })
}