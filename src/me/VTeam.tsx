import * as React from 'react';
import { Page, VPage, ItemSchema, StringSchema, ImageSchema, UiSchema, UiImageItem, UiTextItem, Edit, nav, userApi, List, LMR, tv } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { VTeamDetail } from './VTeamDetail';

export class VTeam extends VPage<CMe> {
    @observable private data: any;

    async open() {
        this.openPage(this.page);
    }


    private page = observer(() => {
        let { pageTeam } = this.controller;
        return <Page header={this.t('myteam')} headerClassName={consts.headerClass}>
            <List items={pageTeam} item={{ render: this.renderItem }} />
        </Page>;
    })

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { onDetail } = this.controller;
        let { webuser } = item;

        console.log(webuser, 'aaa')
        let right = <></>
        return <LMR className="px-3 py-2 border bg-white" right={right} onClick={() => onDetail(webuser.id)}>
            <div>{this.controller.cApp.renderUser(webuser.id)}</div>
        </LMR>;
    });
}