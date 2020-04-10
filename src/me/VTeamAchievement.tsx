import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
/* eslint-disable */
export class VTeamAchievement extends VPage<CMe> {

    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        console.log(this.version, 'this.version');
        this.openPage(this.page);
    }

    private teamAchievement = observer(() => {
        let { teamAchievement, getTeamAchievementDetail } = this.controller
        let content = teamAchievement.map((v, index) => {
            let { yeara, montha, postPubSum, postTranSum, postHitSum } = v;
            let typeshow: any;
            if (montha == "week") {
                typeshow = "近一周"
            } else if (montha == "all") {
                typeshow = "合计"
            } else {
                typeshow = montha + "月";
            }

            return <tr className="col dec px-3 py-2 bg-white">
                <td className="w-3"> {typeshow}</td >
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
                <td className="w-3 text-primary" onClick={() => getTeamAchievementDetail(0, yeara, montha)}>查看</td>
            </tr >;
        });

        return <table className="table text-center small">
            <thead className="text-primary">
                <tr className="bg-white">
                    <th>月份</th>
                    <th>发布量</th>
                    <th>转发量</th>
                    <th>浏览量</th>
                    <th>明细</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>

    });

    private teamAchievementDetail = observer(() => {
        let { teamAchievementDetail } = this.controller;
        if (!teamAchievementDetail) return;

        let contentdetail = teamAchievementDetail.map((v, index) => {
            let { author, montha, postPubSum, postTranSum, postHitSum } = v;
            let typeshow: any;
            if (montha == "week") {
                typeshow = "近一周"
            } else if (montha == "all") {
                typeshow = "合计"
            } else {
                typeshow = montha + "月";
            }

            return <tr className="col dec px-3 py-2 bg-white">
                <td className="w-3"> {typeshow}</td >
                <td className="w-3"> {author.id}</td >
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
            </tr >;
        });

        return <table className="table text-center small">
            <thead className="text-primary">
                <tr className="bg-white">
                    <th>范围</th>
                    <th>员工</th>
                    <th>发布量</th>
                    <th>转发量</th>
                    <th>浏览量</th>
                </tr>
            </thead>
            <tbody>
                {contentdetail}
            </tbody>
        </table>
    });

    private page = observer(() => {
        let header: any = <div>{this.t('团队业绩')}</div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <this.teamAchievement />
            <this.teamAchievementDetail />
        </Page >
    })

}