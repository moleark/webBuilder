import * as React from 'react';
import { consts } from 'consts';
import { CPage } from "./CPage";
import { observer } from 'mobx-react';
import { VEditPage } from './VEditPage';
import { VPage, Page, LMR, tv, EasyTime, Tuid, List } from "tonva";

export class VShowPage extends VPage<CPage> {

    async open() {
        this.openPage(this.page);
    }
    private page = observer(() => {
        let { current, onRedact, itemsModule, onCommonalityModule, ondisplay, lock } = this.controller;
        let { titel, name, author, template, discription, $create, $update } = current;
        const sortItemsModule = itemsModule.sort(function (m, n) {
            if (m.sort < n.sort) return -1
            else if (m.sort > n.sort) return 1
            else return 0
        });
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let addModule = <div className="d-flex" style={{ color: '#0066cc' }}>
            <div onClick={() => onCommonalityModule()}><span className="iconfont icon-tubiao106 mr-2" style={{ fontSize: "24px" }}></span></div>
            <div onClick={onRedact}><span className="iconfont icon-icon--tianjia mr-2" style={{ fontSize: "24px" }}></span></div>
        </div>
        let right = isMe && <div onClick={() => this.openVPage(VEditPage)}><span className="iconfont icon-xiugai1 mr-2" style={{ fontSize: "26px", color: "white" }}></span></div>

        let divUser = this.controller.cApp.renderUser(author.id);
        return <Page header={name} headerClassName={consts.headerClass} right={right}>
            <div className="px-3 pt-2 pb-0">
                <div className="small text-muted p-1">{this.t('titel')} :</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{titel}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    {divUser}
                </LMR>
                <div className="small text-muted p-1" >{this.t('describe')}:</div>
                <LMR className="mb-3 bg-white px-3 h6">
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1" >{this.t('name')} :</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{name}</pre>
                <div className="small text-muted p-1">{this.t('templete')}:</div>
                <div className=" px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>
            <LMR className="px-3 h6" right={addModule}>
                <div className="mt-2 h6 mb-0" style={{ color: '#0066cc' }} onClick={() => ondisplay()}>
                    {this.t('mymodule')}
                    <i className="iconfont icon-jiantouarrow483"></i>
                </div>
            </LMR>
            {
                lock ?
                    (itemsModule.length > 0 ? <List items={sortItemsModule} item={{ render: this.renderItem }} /> : <span className="pl-3">[无，请添加]</span>)
                    : <></>
            }
        </Page>;
    })
    private itemClick = (item: any) => {
        console.log(item, 'item')
        this.controller.showDetailModule(item);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { sort, content } = item;
        return <div className="px-3 pr-4 py-1 d-flex col-12" style={{ borderBottom: '1px dashed #dee2e6' }}>
            <div className="col-11" onClick={() => this.itemClick(item)}>
                <div className="text-muted">{this.t('module')}：{sort}</div>
                <div className="text-truncate" style={{ height: '20px' }}>{this.t('content')}：{content}</div>
            </div>
            <div className="px-0 col-1 text-right mr-1">
                <i className="iconfont icon-shanchu" style={{ fontSize: '25px', color: '#009900' }} onClick={() => this.controller.onRemove(item.id)}></i>
            </div>
        </div>;
    });
}