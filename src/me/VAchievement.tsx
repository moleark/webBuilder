import * as React from 'react';
import { VPage, Page, nav, List } from 'tonva';
import { CMe } from './CMe';
import { setting, appConfig } from '../configuration';
import { observable, observe } from 'mobx';
import { observer } from 'mobx-react';

export class VAchievement extends VPage<CMe> {

    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        console.log(this.version, 'this.version');
        this.openPage(this.page);
    }
    private page = observer(() => {
        let header: any = <div>{this.t('业绩')}</div>
        let { Achievement } = this.controller;

        let content = Achievement.map((v, index) => {
            let { montha, postPubSum, postTranSum, postHitSum } = v;
            return <tr className="col dec px-3 py-2 bg-white">
                <td className="w-3"> {montha}</td >
                <td className="w-3">{postPubSum}</td>
                <td className="w-3">{postTranSum}</td>
                <td className="w-3">{postHitSum}</td>
            </tr >;

        });

        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th>月份</th>
                        <th>发布量</th>
                        <th>转发量</th>
                        <th>浏览量</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </Page >
    })

}