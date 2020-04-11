import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../configuration';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
/* eslint-disable */
export class VTeamAchievementDetail extends VPage<CMe> {

    @observable type: any;
    async open(param: any) {
        this.type = param;
        this.openPage(this.page);
    }

    private teamAchievement = observer(() => {
        let { teamAchievementDetail, showTeamAchievementDetail } = this.controller
        let content = teamAchievementDetail.map((v, index) => {
            let { yeara, montha, author, postPubSum, postTranSum, postHitSum } = v;

            return <tr className="col dec px-3 py-2 bg-white" onClick={() => showTeamAchievementDetail(0, yeara, montha)}>
                <td className="w-3">{author.id}</td>
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
            </tr >;
        });
        return <div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th>员工</th>
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
        let header: any;
        if (this.type == "week") {
            header = <div>周报表明细</div>
        } else if (this.type == "all") {
            header = <div>合计报表明细</div>
        } else {
            header = <div>{this.type}月  报表明细</div>
        }
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <this.teamAchievement />
        </Page >
    })

}