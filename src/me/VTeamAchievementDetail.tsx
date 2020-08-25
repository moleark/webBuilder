import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { Chart, LineAdvance, Slider } from 'bizcharts';

export class VTeamAchievementDetail extends VPage<CMe> {

    // @observable type: any;
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { teamAchievementDetail, teamAchievementlist } = this.controller;
        let dataDayPubSumdetail: any = []
        let dataDayHitSumdetail: any = []
        let dataDaypercentdetail: any = []

        teamAchievementlist.forEach(v => {
            let { day, postPubSum, postHitSum, percent, author, name } = v;
            if (name) {
                dataDayPubSumdetail.push(
                    {
                        date: day,
                        type: `${name}`,
                        value: postPubSum
                    },
                )
                dataDayHitSumdetail.push(
                    {
                        date: day,
                        type: `${name}`,
                        value: postHitSum
                    },
                )
                dataDaypercentdetail.push(
                    {
                        date: day,
                        type: `${name}`,
                        value: percent
                    },
                )
            }
        })
        let header: any = <div> 日报明细</div>
        let flag = false;
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <div className="py-4 text-center text-muted">
                    <strong> 生产量/人</strong>
                </div>
                <Chart scale={{ value: { min: 0 } }} autoFit={true} height={400} data={dataDayPubSumdetail} padding={[20, 10, 130, 40]}>
                    {this.Lineadvance}
                    <Slider start={0.8}
                        formatter={(v, d, i) => {
                            flag = !flag;
                            let v1 = v.substring(5)
                            return `${v1}${flag ? "" : ""}`;
                        }}
                        handlerStyle={{ height: '6', }}
                    />
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 浏览量/人</strong>
                </div>
                <Chart scale={{ value: { min: 0 } }} autoFit height={400} data={dataDayHitSumdetail} padding={[20, 10, 130, 40]}>
                    {this.Lineadvance}
                    <Slider start={0.8}
                        formatter={(v, d, i) => {
                            flag = !flag;
                            let v1 = v.substring(5)
                            return `${v1}${flag ? "" : ""}`;
                        }}
                        handlerStyle={{ height: '6', }}
                    />
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 转化率/人</strong>
                </div>
                <Chart scale={{ value: { min: 0 } }} autoFit height={400} data={dataDaypercentdetail} padding={[20, 10, 120, 40]}>
                    {this.Lineadvance}
                    <Slider start={0.8}
                        formatter={(v, d, i) => {
                            flag = !flag;
                            let v1 = v.substring(5)
                            return `${v1}${flag ? "" : ""}`;
                        }}
                        handlerStyle={{ height: '5', }}
                    />
                </Chart>
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