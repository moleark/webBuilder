import * as React from 'react';
import { nav, Image, VPage, Prop, ImageUploader, FA, PropGrid, LMR, Page } from 'tonva';
import { CMe } from './CMe';
import { consts } from 'consts';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

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

    private onupload = () => {
        this.openPageElement(<ImageUploader onSaved={this.onSaved} />)
    }
    // logout={true}
    private page = observer(() => {
        let { pageMedia, searchMadiaKey } = this.controller;
        // let { caption, path, $create } = pageMedia;
        // let right = <div className="border p-1"><img className="h-4c w-4c" src={path} /></div>;
        let { user } = this.controller;
        console.log(pageMedia, 'nam')
        let left = <div onClick={() => this.onupload()} className="border text-center mr-4 p-1"><FA className="w-3 p-2 h-3c text-center" name="camera" size="2x" /></div>
        return <Page header="我的" headerClassName={consts.headerClass}>
            <LMR left={left}>
                <div>
                    <div>我的账号：{user.name}</div>
                </div>
            </LMR>

        </Page>;
    })



}
