import * as React from 'react';
import { CMe } from './CMe';
import { VPage, Page, Prop, PropGrid, nav } from 'tonva';
import { observer } from 'mobx-react';

export class VSetDetails extends VPage<CMe> {
    async open() {
        this.openPage(this.page)
    }

    private logout = () => {
        console.log(this.controller.PostTotal)
        // nav.showLogout();
    }

    private page = observer(() => {
        let rows: Prop[] = [
            '',
            {
                type: 'component',

                component: <div className="bg-white p-2 mb-1">
                    <span className="iconfont icon-yonggongzongliang" style={{ fontSize: '24px', verticalAlign: 'middle' }}></span> 账户信息
            </div>,
                // onClick: this.controller.showAccount
            },
            '',
            {
                type: 'component',
                component: <div className="bg-white p-2 mb-1">
                    <span className="iconfont icon-accountsecuriyt" style={{ fontSize: '24px', verticalAlign: 'middle' }}></span> 密码
            </div>,
                // onClick: this.changePassword
            },
            '',
            {
                type: 'component',
                component: <div className="bg-white p-2 mb-1 text-center col-12" onClick={this.logout}>
                    <span>退出登陆</span>

                </div>,
            },
            ''
        ];
        return <Page header="个人信息">
            <PropGrid rows={rows} values={{}} />
        </Page>
    })
}