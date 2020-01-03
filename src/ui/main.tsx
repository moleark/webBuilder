import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { CApp } from '../CApp';
const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }
    // opensrc = () => {
    //     window.open(setting.downloadAppurl);
    // }

    render = (param?: any): JSX.Element => {
        let { cMe, cPosts, cMedia, cTemplets, cPage, cBranch } = this.controller;
        let faceTabs = [
            { name: 'home', label: '帖文', icon: 'tasks', content: cPosts.tab, onShown: cPosts.loadList, notify: undefined/*store.homeCount*/ },
            { name: 'image', label: '图片', icon: 'vcard', content: cMedia.tab, onShown: cMedia.loadList },
            { name: 'templet', label: '模板', icon: 'vcard', content: cTemplets.tab, onShown: cTemplets.loadList },
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab },
            { name: 'page', label: '网页', icon: 'user', content: cPage.tab, onShown: cPage.loadList },
            { name: 'branch', label: '子模块', icon: 'user', content: cBranch.tab, onShown: cBranch.loadList }
        ].map(v => {
            let { name, label, icon, content, notify, onShown } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                onShown: onShown,
            }
        });
        return <Page header={false} headerClassName={"bg-info"} >
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
