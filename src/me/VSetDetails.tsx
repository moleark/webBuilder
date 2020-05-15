import * as React from 'react';
import { CMe } from './CMe';
import { VPage, Page, Prop, PropGrid, nav } from 'tonva';
import { observer } from 'mobx-react';
import { appConfig, setting } from 'configuration';
import { consts } from 'consts';

export class VSetDetails extends VPage<CMe> {
    private version: any;
    async open() {
        this.version = await nav.checkVersion();
        this.openPage(this.page)
    }

    private logouts = () => {
        nav.showLogout();
    }

    private changePassword = async () => {
        await nav.changePassword();
    }


    private page = observer(() => {
        let rows: Prop[] = [
            '',
            {
                type: 'component',
                component: <div className="bg-white p-2 mb-1 text-primary">
                    <span className="iconfont icon-yonggongzongliang" style={{ fontSize: '24px', verticalAlign: 'middle' }}></span> {this.t('account')}
                </div>,
                // onClick: this.controller.showAccount
            },
            '',
            {
                type: 'component',
                component: <div className="bg-white p-2 mb-1 text-primary">
                    <span className="iconfont icon-mima" style={{ fontSize: '24px', verticalAlign: 'middle' }}></span> {this.t('password')}
                </div>,
                onClick: this.changePassword
            },
            '',
            {
                type: 'component',
                component: <div className="text-primary w-100 d-flex p-2 justify-content-between" onClick={() => this.controller.showAbout()}>
                    <div>
                        <i className="iconfont icon-guanyu text-primary " style={{ fontSize: "20px", color: "#2aa515" }}></i> {this.t('about')}{setting.appName}
                    </div>
                    <div className="py-2 small text-muted">V {appConfig.version}</div>
                </div>,
            },
            '',
            {
                type: 'component',
                component: <div className="bg-white p-2 mb-1 text-center col-12" onClick={this.logouts}>
                    <span>{this.t('logout')}</span>

                </div>,
            },
            ''
        ];
        return <Page header={this.t('set')} headerClassName={consts.headerClass}>
            <PropGrid rows={rows} values={{}} />
        </Page>
    })
}