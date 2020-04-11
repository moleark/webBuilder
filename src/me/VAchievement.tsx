import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
/* eslint-disable */
export class VAchievement extends VPage<CMe> {

    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        console.log(this.version, 'this.version');
        this.openPage(this.page);
    }

    private AchievementWeek = observer(() => {
        let { AchievementWeek } = this.controller;

        let content = AchievementWeek.map((v, index) => {
            let { postPubSum, postTranSum, postHitSum } = v;

            return <tr className="col dec px-3 py-2 bg-white">
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
            </tr >;

        });

        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>  周报表</strong>
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th>发布量</th>
                        <th>转发量</th>
                        <th>浏览量</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    });

    private AchievementMonth = observer(() => {
        let { AchievementMonth } = this.controller;

        let content = AchievementMonth.map((v, index) => {
            let { montha, postPubSum, postTranSum, postHitSum } = v;
            let typeshow: any;
            if (montha == "all") {
                typeshow = "合计"
            } else {
                typeshow = montha + "月";
            }
            return <tr className="col dec px-3 py-2 bg-white">
                <td className="w-3"> {typeshow}</td >
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
            </tr >;

        });

        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>月报表</strong>
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th></th>
                        <th>发布量</th>
                        <th>转发量</th>
                        <th>浏览量</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    });

    private page = observer(() => {
        let header: any = <div>{this.t('业绩')}</div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <this.AchievementWeek />
            <this.AchievementMonth />
        </Page >
    })

}