import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { LineChart } from 'bizcharts';
/* eslint-disable */
export class VAchievement extends VPage<CMe> {

    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        console.log(this.version, 'this.version');
        this.openPage(this.page);
    }
    private page = observer(() => {
        let { AchievementMonth, AchievementWeek } = this.controller;
        let dataDay: any = []
        AchievementWeek.forEach(v => {
            let { week, postPubSum, postTranSum, postHitSum } = v;
            dataDay.push(
                {
                    date: week,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: week,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: week,
                    type: '发布量',
                    value: postPubSum
                }
            )
        })
        let dataMonth: any = []
        AchievementMonth.forEach(val => {
            let { montha, postPubSum, postTranSum, postHitSum } = val;
            montha = montha + "月";
            dataMonth.push(
                {
                    date: montha,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: montha,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: montha,
                    type: '发布量',
                    value: postPubSum
                }
            )
        })
        return <Page header={this.t('performance')} headerClassName={setting.pageHeaderCss}>
            <div className='pb-4'>
                <LineChart forceFit height={400} padding={[40, 10, 50, 40]} smooth
                    data={dataDay}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '周报表',
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
                />
                <LineChart forceFit height={400} padding={[50, 10, 50, 40]} smooth
                    data={dataMonth}
                    title={{
                        visible: true,
                        alignTo: 'middle',
                        text: '月报表',
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
                />
            </div>
            <div className="footer small px-3 text-primary bg-white">
                <div> 注：</div>
                <div className=" px-3">
                    <li className="py-1">周报：显示近一周产生的业绩。</li>
                    <li className="py-1">月报：按照自然月统计业绩。</li>
                    <li className="py-1">发布量：统计时间范围内，发布贴文的次数。</li>
                    <li className="py-1">转发量：所有贴文在统计时间范围内，被营销转发的次数。</li>
                    <li className="py-1">浏览量：所有贴文在统计时间范围内，被客户浏览的次数。</li>
                </div>
            </div>
        </Page >
    })
}
