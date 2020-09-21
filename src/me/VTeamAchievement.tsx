import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { LineChart } from 'bizcharts';

export class VTeamAchievement extends VPage<CMe> {
    async open() {
        this.openPage(this.page);
    }
    private page = observer(() => {

        let { teamAchievementDay, teamAchievementMonthchart, addInputPostSum, showTeamAchievementDetail } = this.controller;
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
            <span className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>
        return <Page header={this.t('team')} headerClassName={setting.pageHeaderCss} right={right}>
            <div className='pb-4'>
                <LineChart forceFit height={400} padding={[60, 40, 50, 40]} smooth
                    data={dataDay}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '贴文系统运行日报',
                    }}
                    xField='date'
                    yField='value'
                    seriesField="type"
                    interactions={[
                        {
                            type: 'slider',
                            cfg: {
                                start: 0.8,
                                end: 1,
                            },
                        },
                    ]}
                    legend={{
                        offsetY: 4,
                        text: {
                            style: {
                                fontSize: 16,
                                fill: 'grey',
                            }
                        }
                    }}
                    events={{
                        onLineClick: (event) => showTeamAchievementDetail()
                    }}
                />
                <LineChart forceFit height={400} padding={[70, 10, 50, 40]} smooth
                    data={dataMonth}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '贴文系统运行月报',
                    }}
                    xField='date'
                    yField='value'
                    seriesField="type"
                    legend={{
                        offsetY: 4,
                        text: {
                            style: {
                                fontSize: 16,
                                fill: 'grey',
                            }
                        }
                    }}
                    events={{
                        onAxisClick: (event) => {
                            let month = event.target.attrs.text;
                            month = month.replace("月", "");
                            if (month !== '0') {
                                this.controller.showTeamAchievementMonDetail(month)
                            }
                        }
                    }}
                />
                <LineChart forceFit height={400} padding={[60, 10, 30, 40]} smooth
                    data={dataSource}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '渠道报表',
                    }}
                    xField='date'
                    yField='value'
                    seriesField="type"
                    legend={{
                        offsetY: 4,
                        text: {
                            style: {
                                fontSize: 16,
                                fill: 'grey',
                            }
                        }
                    }}
                    events={{
                        onAxisClick: (event) => {
                            let month = event.target.attrs.text;
                            month = month.replace("月", "");
                            if (month !== '0') {
                                this.controller.showTeamAchievementPipeDetail(month)
                            }
                        }
                    }}
                />
            </div>
        </Page >
    })
}