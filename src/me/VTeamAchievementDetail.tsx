import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Chart, LineAdvance, Slider } from 'bizcharts';

/* eslint-disable */
export class VTeamAchievementDetail extends VPage<CMe> {

    @observable type: any;
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { teamAchievementDetail } = this.controller;
        let dataDayPubSumdetail: any = []
        let dataDayHitSumdetail: any = []
        let dataDaypercentdetail: any = []

        const teamAchievementlist = teamAchievementDetail.map(item => {
            const obj = { ...item }
            if (item.author && item.author.id) {
                obj.name = this.controller.cApp.renderUser(item.author.id);
            }
            return obj
        })
        teamAchievementlist.forEach(v => {
            let { day, postPubSum, postHitSum, percent, author, name } = v;
            // let authorname = author ? this.controller.cApp.renderUser(author.id) : name;
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
        let flag = false
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <div className="py-4 text-center text-muted">
                    <strong> 生产量/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit={true} height={400} data={dataDayPubSumdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                    {/* <Slider start={0.5}
                        formatter={(val, d, i) => {
                            flag = !flag;
                            return `${val}${flag ? "开始" : "结束"}`;
                        }}
                        handlerStyle={{ height: '4', }}
                    /> */}
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 浏览量/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataDayHitSumdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                    {/* <Slider start={0.5}
                        formatter={(val, d, i) => {
                            flag = !flag;
                            return `${val}${flag ? "开始" : "结束"}`;
                        }}
                        handlerStyle={{ height: '4', }}
                    /> */}
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 转化率/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataDaypercentdetail} padding={[20, 10, 90, 40]}>
                    {this.Lineadvance}
                    {/* <Slider start={0.5}
                        formatter={(v, d, i) => {
                            flag = !flag;
                            return `${v}${flag ? "开始" : "结束"}`;
                        }}
                        handlerStyle={{ height: '4', }}
                    /> */}
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