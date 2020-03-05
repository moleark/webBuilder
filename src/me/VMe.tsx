import * as React from 'react';
import { nav, Image, VPage, LMR, Page } from 'tonva';
import { CMe } from './CMe';
import { consts } from 'consts';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { EditMeInfo } from './EditMeInfo'

export class VMe extends VPage<CMe> {
    @observable private mediaPath: string;
    async open(param?: any) {

    }
    private getMediaPath(resId: string): string { return nav.resUrl + (resId.substr(1)) }

    private onSaved = (resId: string): Promise<void> => {
        this.mediaPath = this.getMediaPath(resId);
        this.closePage();
        return;
    }

    render(member: any): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {

        let { onSet, user, PostTotal, PageTotal, cApp, onTeams,Myteam } = this.controller;
        PageTotal = PageTotal ? PageTotal : 0;
        PostTotal = PostTotal ? PostTotal : 0;
        Myteam = Myteam.length ? Myteam.length : 0
        if (!user) return;

        let left = <Image className="ml-2 border text-center w-3c h-3c mx-3" src={user.icon} />
        let right = <div className=" mt-3"><span className="iconfont icon-jiantou1 text-primary px-3"></span></div>
        return <Page header={this.t('me')} headerClassName={consts.headerClass}>
            <LMR
                left={left}
                className="bg-white py-2 border-bottom"
                right={right}
                onClick={() => { this.openVPage(EditMeInfo) }}>
                <div className="mt-1">
                    <div>{userSpan(user.name, user.nick)}</div>
                    <div className="small pt-1"><span className="text-muted">ID：</span> {user.id > 10000 ? user.id : String(user.id + 10000).substr(1)}</div>
                </div>
            </LMR>
            {branch(this.t('post'),null, PostTotal, "icon-yewuzongliang", undefined)}
            {branch(this.t('page'), null, PageTotal, "icon-shuangsechangyongtubiao-", undefined)}
            {branch(this.t('tag'), null, PageTotal, "icon-shuangsechangyongtubiao-", cApp.cTag.showTag)}
            {branch(this.t('team'), Myteam, null, "icon-shezhi3 ", onTeams)}
            {branch(this.t('set'), null, null, "icon-shezhi3 ", onSet)}
        </Page>;
    })
}


function branch(name: string,teams: string, val: string, icon: string, action: any): JSX.Element {
    // console.log(teams,'teams')
    let style = " iconfont text-primary  " + icon;
    let count: any = val ? <div className="text-muted small mx-3 px-3">浏览量：{val}</div> : <div className="text-muted small mx-3 px-3 my-3"></div>;
    return <div className="bg-white py-2 d-flex px-3 mt-1" style={{ justifyContent: 'space-between' }} onClick={action}>
        <div className={style}>
            <span className="ml-1 mx-3">{name}</span>
            {count}
        </div>
        <div className="text-primary small">
            <span className="ml-2 iconfont icon-jiantou1"></span>
        </div>
    </div>
}

function userSpan(name: string, nick: string): JSX.Element {
    return <small className="muted">{name}</small>
}