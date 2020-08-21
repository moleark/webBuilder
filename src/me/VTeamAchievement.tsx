import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { Chart, LineAdvance } from 'bizcharts';

export class VTeamAchievement extends VPage<CMe> {
    async open(param: any) {
        this.openPage(this.page);
    }
    private page = observer(() => {

        let { teamAchievementDay, teamAchievementMonthchart, addInputPostSum } = this.controller;
        let dataDay: any = []
        teamAchievementDay.forEach(v => {
            let { day, postPubSum, postTranSum, postHitSum, percent } = v;
            dataDay.push(
                {
                    date: day,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: day,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: day,
                    type: '发布量',
                    value: postPubSum
                },
                {
                    date: day,
                    type: '转换率',
                    value: percent
                }
            )
        })
        let dataMonth: any = []
        let dataSource: any = []
        teamAchievementMonthchart.forEach(val => {
            let { month, postPubSum, postTranSum, postHitSum, percent, hitWeb, hitAgent, hitAssist, hitEmail, hitOther } = val;
            month = month + "月";
            dataMonth.push(
                {
                    date: month,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: month,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: month,
                    type: '发布量',
                    value: postPubSum
                },
                {
                    date: month,
                    type: '转换率',
                    value: percent
                }
            )
            dataSource.push(
                {
                    date: month,
                    type: '网站',
                    value: hitWeb
                },
                {
                    date: month,
                    type: '轻代理',
                    value: hitAgent
                },
                {
                    date: month,
                    type: '销售助手',
                    value: hitAssist
                },
                {
                    date: month,
                    type: '邮件',
                    value: hitEmail
                },
                {
                    date: month,
                    type: '其他',
                    value: hitOther
                }
            )
        })
        let right = <div onClick={addInputPostSum}>
            <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>
        return <Page header={'数据折线图'} headerClassName={setting.pageHeaderCss} right={right}>
            <div className='pb-4'>
                <Chart scale={{ value: { min: 0 } }} autoFit height={400} data={dataDay} padding={[20, 10, 90, 40]}
                    onPlotClick={this.handleClickDaydetail}>
                    {this.lineAdvance}
                </Chart>
                <h3 className='p-3 small text-center'>贴文系统运行日报</h3>
                <Chart scale={{ value: { min: 0 }, type: 'linear' }} autoFit height={400} data={dataMonth} padding={[20, 10, 50, 40]}
                    onAxisClick={(e: any) => {
                        let month = e.target.attrs.text;
                        month = month.replace("月", "");
                        if (month !== '0') {
                            this.controller.showTeamAchievementMonDetail(month)
                        }
                    }}
                >
                    {this.lineAdvance}
                </Chart>
                <h3 className='p-3 small text-center'>贴文系统运行月报</h3>
                <Chart scale={{ value: { min: 0 } }} autoFit height={400} data={dataSource} padding={[20, 10, 50, 40]}
                    onAxisClick={(e: any) => {
                        let month = e.target.attrs.text
                        month = month.replace("月", "");
                        if (month !== '0') {
                            this.controller.showTeamAchievementPipeDetail(month)
                        }
                    }}>
                    {this.lineAdvance}
                </Chart>
                <h3 className='p-3 small text-center'>渠道报表</h3>
            </div>
        </Page >
    })
    private lineAdvance = <LineAdvance
        shape="smooth"
        area
        position="date*value"
        color="type"
    />

    private handleClickDaydetail = (e: any) => {
        this.controller.showTeamAchievementDetail()
    }
}