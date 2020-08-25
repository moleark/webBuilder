import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Chart, Interval } from 'bizcharts';

/* eslint-disable */
export class VTeamMonthPipeDetail extends VPage<CMe> {
    @observable Month: any;
    async open(param: any) {
        this.Month = param
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { teamAchievementMonDetail } = this.controller;
        let datahitWebdetail: any = [];
        let datahitAgentdetail: any = []
        let datahitAssistdetail: any = []
        const teamAchievementlist = teamAchievementMonDetail.map(item => {
            const obj = { ...item }
            if (item.author && item.author.id) {
                obj.name = this.controller.cApp.renderUser(item.author.id);
            }
            return obj
        })
        teamAchievementlist.forEach(v => {
            let { year, day, month, hitWeb, hitAgent, hitAssist, author, name } = v;
            // let authorname = author ? this.controller.cApp.renderUser(author.id) : name;
            if (name) {
                datahitWebdetail.push(
                    {
                        date: month,
                        type: `${name}`,
                        value: hitWeb
                    },
                )

            } datahitAgentdetail.push(
                {
                    date: month,
                    type: `${name}`,
                    value: hitAgent
                },
            )
            datahitAssistdetail.push(
                {
                    date: month,
                    type: `${name}`,
                    value: hitAssist
                },
            )
        })
        datahitWebdetail.sort(creatCompare("value"))
        datahitAgentdetail.sort(creatCompare("value"))
        datahitAssistdetail.sort(creatCompare("value"))
        let header: any = <div> {this.Month}月渠道详情</div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={datahitWebdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
                <h3 className='p-3 small text-center'>网站浏览量/人</h3>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={datahitAgentdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
                <h3 className='p-3 small text-center'>轻代理/人</h3>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={datahitAssistdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
                <h3 className='p-3 small text-center'>销售助手/人</h3>
            </div>
        </Page >
    })
    private interval = <Interval position="type*value"
        label={
            ['type*value', (type, value) => {
                return {
                    content: (originData) => {
                        if (value !== 0) {
                            return value;
                        }
                    },
                };
            }]}
    />
}

/**
 * 
 * 排序函数
 */
export function creatCompare(propertyName: any) {
    return function (obj1: any, obj2: any) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (value1 > value2) {
            return -1
        } else if (value1 < value2) {
            return 1
        } else {
            return 0
        }
    }
}