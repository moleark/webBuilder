import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Chart, LineAdvance } from 'bizcharts';

/* eslint-disable */
export class VTeamAchievementDetail2 extends VPage<CMe> {

    @observable type: any;
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { teamAchievementDetail2 } = this.controller;
        let dataDayPubSumdetail: any = []
        let dataDayHitSumdetail: any = []
        let dataDaypercentdetail: any = []

        const teamAchievementlist = teamAchievementDetail2.map(item => {
            const obj = { ...item }
            if (item.author && item.author.id) {
                obj.name = item.author.id
            }
            return obj
        })
        teamAchievementlist.forEach(v => {
            let { day, postPubSum, postHitSum, percent, author, name } = v;
            let authorname = author ? this.controller.cApp.renderUser(author.id) : name;
            if (authorname) {
                dataDayPubSumdetail.push(
                    {
                        date: day,
                        type: authorname,
                        value: postPubSum
                    },
                )
                dataDayHitSumdetail.push(
                    {
                        date: day,
                        type: authorname,
                        value: postHitSum
                    },
                )
                dataDaypercentdetail.push(
                    {
                        date: day,
                        type: authorname,
                        value: percent
                    },
                )
            }
        })

        let header: any = <div> 日报明细</div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit={true} height={400} data={dataDayPubSumdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                </Chart>
                <h3 className='p-3 small text-center'>生产量/人</h3>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataDayHitSumdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                </Chart>
                <h3 className='p-3 small text-center'>浏览量/人</h3>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataDaypercentdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                </Chart>
                <h3 className='p-3 small text-center'>转化率/人</h3>
            </div>
        </Page >
    })
    private Lineadvance = <LineAdvance
        shape="smooth"
        area
        position="date*value"
        color="type"
    />
}