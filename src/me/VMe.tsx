import * as React from 'react';
import { nav, Image, VPage, Prop, ImageUploader, FA, PropGrid, LMR, Page } from 'tonva';
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

    // private onupload = () => {
    //     this.openPageElement(<ImageUploader onSaved={this.onSaved} />)
    // }
    private page = observer(() => {

        let { onAlterImg, onSet, user, PostTotal, PageTotal,  } = this.controller;
        if (!user) return;
        // let left = <div className="ml-2 border text-center mr-4 p-1">
        //     {
        //         this.mediaPath ? <div onClick={onAlterImg} className="border p-1"><img className="h-4c w-4c" src={this.mediaPath} /></div> : <FA className="w-3 p-2 h-3c text-center" name="camera" size="2x" />
        //     }
        // </div>
        let left = <Image className="ml-2 border text-center mr-4 p-1" src={user.icon} />
        let right = <div style={{ padding: '10px' }}><span className="iconfont icon-jiantou1" style={{ fontSize: '20px' }}></span></div>
        //let right = <FA className="align-self-end" name="angle-right" />
        return <Page header="我的" headerClassName={consts.headerClass}>
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
            <div className="bg-white py-2 d-flex px-3 mt-1" style={{ justifyContent: 'space-between' }}>

                <div className="iconfont icon-yewuzongliang text-primary" style={{ fontSize: '16px' }}><span className="ml-1">贴文</span>
                    <div className="text-muted " style={{ fontSize: '12px' }}>浏览量：{PostTotal}</div>
                </div>
                <div className="text-primary small" style={{ padding: ' 10px 0' }}><span className="ml-2 iconfont icon-jiantou1" style={{ fontSize: '16px' }}></span></div>
            </div>
            <div className="bg-white py-2 d-flex px-3 mt-1" style={{ justifyContent: 'space-between' }}>
                <p className="iconfont icon-shuangsechangyongtubiao- text-primary m-0" style={{ fontSize: '16px' }}><span className="ml-1">网页</span>
                    <div className="text-muted " style={{ fontSize: '12px' }}>浏览量：{PageTotal}</div></p>
                <div style={{ padding: ' 10px 0' }}><span className="text-primary iconfont icon-jiantou1" style={{ fontSize: '16px' }}></span></div>

            </div>
            <div className="bg-white py-2 d-flex px-3 mt-1" style={{ justifyContent: 'space-between' }} onClick={onSet}>
                <p className="iconfont icon-shezhi3 text-primary m-0" style={{ fontSize: '16px' }}><span className="ml-1">设置</span>  </p>
                <div style={{ padding: ' 10px 0' }}><span className="text-primary iconfont icon-jiantou1" style={{ fontSize: '16px' }}></span></div>
            </div>
        </Page>;
    })
}

function userSpan(name: string, nick: string): JSX.Element {
    return <small className="muted">{name}</small>
        
}