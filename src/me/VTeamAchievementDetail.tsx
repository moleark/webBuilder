import * as React from 'react';
import { VPage, Page, Loading } from 'tonva';
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

    private page = observer(() => {
        let header: any;
        if (this.type == "week") {
            header = <div>周报表明细</div>
        } else if (this.type == "all") {
            header = <div>合计报表明细</div>
        } else {
            header = <div>{this.type}月  报表明细</div>
        }

        let { teamAchievementDetail } = this.controller;
        let { items, loading } = teamAchievementDetail;
        let divItems: any;
        if (!items) {
            divItems = (loading === true) ?
                <div className="m-5"><Loading /></div>
                :
                <div className="my-3 mx-2 text-warning">
                    <span className="text-primary" >{this.t('nopicture')}</span>
                </div>;
        }
        else {
            divItems = items.map((v, index) => {
                return this.renderItem(v, index)
            });
        }
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div>
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
                        {divItems}
                    </tbody>
                </table>
            </div>
        </Page >
    })

    private renderItem = (item: any, index: number) => {
        let { author, postPubSum, postTranSum, postHitSum } = item;
        let authorname = this.controller.cApp.renderUser(author.id);
        return <tr className="col dec px-3 py-2 bg-white" >
            <td className="w-3">{authorname}</td>
            <td className="w-3">{postPubSum}</td>
            <td className="w-3">{postTranSum}</td>
            <td className="w-3">{postHitSum}</td>
        </tr >;
    }

}