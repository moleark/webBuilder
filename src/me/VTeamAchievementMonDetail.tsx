import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Chart, Interval } from 'bizcharts';

/* eslint-disable */
export class VTeamAchievementMonDetail extends VPage<CMe> {
    @observable Month: any;
    async open(param: any) {
        this.Month = param
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { teamAchievementMonDetail } = this.controller;
        let dataMonPubSumdetail: any = [];
        let dataMonHitSumdetail: any = []
        let dataMonpercentdetail: any = []
        const teamAchievementlist = teamAchievementMonDetail.map(item => {
            const obj = { ...item }
            if (item.author && item.author.id) {
                obj.name = this.controller.cApp.renderUser(item.author.id);
            }
            return obj
        })
        teamAchievementlist.forEach(v => {
            let { month, postPubSum, postHitSum, percent, author, name } = v;
            // let authorname = author ? this.controller.cApp.renderUser(author.id) : name;
            if (name) {
                dataMonPubSumdetail.push(
                    {
                        date: month,
                        type: `${name}`,
                        value: postPubSum
                    },
                )
                dataMonHitSumdetail.push(
                    {
                        date: month,
                        type: `${name}`,
                        value: postHitSum
                    },
                )
                dataMonpercentdetail.push(
                    {
                        date: month,
                        type: `${name}`,
                        value: percent
                    },
                )
            }
        })
        dataMonPubSumdetail.sort(creatCompare("value"))
        dataMonHitSumdetail.sort(creatCompare("value"))
        dataMonpercentdetail.sort(creatCompare("value"))
        let header: any = <div> {this.Month}月报明细</div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className='pb-4'>
                <div className="py-4 text-center text-muted">
                    <strong> 生产量/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataMonPubSumdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 浏览量/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataMonHitSumdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
                <div className="py-4 text-center text-muted">
                    <strong> 转化率/人</strong>
                </div>
                <Chart scale={{ date: { type: 'time' }, value: { min: 0 } }} autoFit height={400} data={dataMonpercentdetail} padding={[20, 10, 90, 40]}>
                    {this.interval}
                </Chart>
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
        if (value1 < value2) {
            return 1
        } else if (value1 > value2) {
            return -1
        } else {
            return 0
        }
    }
}