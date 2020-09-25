import * as React from 'react';
import { nav, Image, VPage, LMR } from 'tonva';
import { CMe } from './CMe';
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

    private divTag(titel: string, achievement: number, status: number) {
        let onClick: any;
        return <div className="cursor-pointer" onClick={onClick}>
            {achievement ?
                <div className="h5"><strong>{achievement}</strong> <span className="h6"><small></small></span></div>
                : <div className="h5"> - </div>

            }
            <div className="h6"><small>{titel}</small></div>
        </div >
    }

    private meInfo = () => {
        let { user } = this.controller;
        let left = <Image className="ml-2 border text-center w-3c h-3c mx-3" src={user.icon} />
        return <div
            className="px-4 py-3 cursor-pointer"
            style={{
                backgroundColor: "#f9f9f9",
                width: "90%",
                borderRadius: "8px",
                margin: "-3rem auto 2rem auto",
                boxShadow: "2px 2px 15px #333333"
            }}
        >
            <LMR left={left} onClick={() => { this.openVPage(EditMeInfo) }}>
                <div>
                    <div> <small className="muted">{user.name}</small></div>
                    <div className="small pt-1"><span className="text-muted">ID：</span> {user.id > 10000 ? user.id : String(user.id + 10000).substr(1)}</div>
                </div>
            </LMR>
        </div>
    }

    private achievement = () => {

        let { nowAchievement, showAchievement } = this.controller;
        let { postPubSum, postTranSum, postHitSum } = nowAchievement;

        return <div
            className="text-center text-white pt-4 bg-primary pt-1 pb-5"
            style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}
            onClick={showAchievement}
        >
            <div className="pb-2 cursor-pointer" >
                <div className="text-warning  pt-4" >
                    <span className="h1">{postHitSum ? postHitSum : "0"}</span>
                    <small> 次</small>
                </div>
                <h6 className="text-warning"><small>{this.t('postHitSum')}</small></h6>
            </div >
            <div className="d-flex justify-content-around">
                {this.divTag((this.t('postPubSum')), postPubSum, 1)}
                {this.divTag((this.t('postTranSum')), postTranSum, 2)}
            </div>
            <div className="my-4"></div>
        </div>
    }

    private page = observer(() => {
        let { onSet, user, showCat, showTeamAchievement, cApp } = this.controller;
        if (!user) return;// className="bg-white"
        return <div >
            <this.achievement />
            <this.meInfo />
            {branch(this.t('team'), "icon-Group-", showTeamAchievement)}
            {branch(this.t('set'), "icon-shezhi3", onSet)}
            {branch(this.t('pictureclassify'), "icon-Fill", () => showCat({ name: (this.t('pictureclassify')), id: 0 }))}
            {branch(this.t('subject'), "icon-fenlei", () => cApp.cPosts.showSubjectEdit({ name: (this.t('subject')), id: 0 }))}
            {branch(this.t('sidesubject'), "icon-lanmuguanli", () => this.controller.showSidebar())}
        </div>
    })
}


function branch(name: string, icon: string, action: any): JSX.Element {
    let style = " iconfont text-primary  " + icon;
    return <div className="bg-white py-3 d-flex px-3 mt-1" style={{ justifyContent: 'space-between' }} onClick={action}>
        <div className={style}>
            <span className="ml-1 mx-3">{name}</span>
        </div>
        <div className="text-primary small">
            <span className="ml-2 iconfont icon-more"></span>
        </div>
    </div>
}

