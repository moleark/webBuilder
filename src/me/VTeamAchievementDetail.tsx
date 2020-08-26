import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { LineChart } from 'bizcharts';

export class VTeamAchievementDetail extends VPage<CMe> {

    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { teamAchievementlist } = this.controller;
        let dataDayPubSumdetail: any = []
        let dataDayHitSumdetail: any = []
        let dataDaypercentdetail: any = []

        teamAchievementlist.forEach(v => {
            let { day, postPubSum, postHitSum, percent, name } = v;
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
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <LineChart forceFit padding={[150, 40, 30, 40]} smooth
                    data={dataDayHitSumdetail}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '浏览量/人',
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
                        offsetY: 6,
                        text: {
                            style: {
                                fontSize: 16,
                                fill: 'grey',
                            }
                        }
                    }}
                />
                <div className='py-3 my-3'>
                    <LineChart forceFit height={400} padding={[150, 40, 30, 40]} smooth
                        data={dataDayPubSumdetail}
                        title={{
                            visible: true,
                            alignTo: 'middle',
                            text: '生产量/人',
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
                            offsetY: 6,
                            text: {
                                style: {
                                    fontSize: 16,
                                    fill: 'grey',
                                }
                            }
                        }} />
                </div>
                <LineChart forceFit height={400} padding={[140, 40, 30, 40]} smooth
                    data={dataDaypercentdetail}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '转化率/人',
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
                        offsetY: 6,
                        text: {
                            style: {
                                fontSize: 16,
                                fill: 'grey',
                            }
                        }
                    }}
                />
            </div>
        </Page >
    })
}