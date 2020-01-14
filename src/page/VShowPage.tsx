import * as React from 'react';
import { consts } from 'consts';
import { CPage } from "./CPage";
import { observer } from 'mobx-react';
import { VEditPage } from './VEditPage';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid, List } from "tonva";
import { observable } from 'mobx';

export class VShowPage extends VPage<CPage> {

    async open() {
        this.openPage(this.page);
    }



    private page = observer(() => {
        let { current, onRedact, itemsModule, onCommonalityModule, ondisplay, lock } = this.controller;
        let { titel, name, author, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        // let addModule = <div className="d-flex px-2 mt-1 ">
        //     <button style={{ fontWeight: 550, padding:'0 5px',marginBottom:0}}  className="h6 btn btn-outline-primary">关联模块</button>
        //     <div className="ml-4" >
        //         <i className="iconfont icon-icon--tianjia" style={{ fontSize: '28px', color: '#0066cc' }}></i>
        //     </div>
        // </div>
        let addModule = <div className="d-flex" style={{ color: '#0066cc' }}>
            <div onClick={() => onCommonalityModule()}><span className="iconfont icon-tubiao106 mr-2" style={{ fontSize: "24px" }}></span></div>
            <div onClick={onRedact}><span className="iconfont icon-icon--tianjia mr-2" style={{ fontSize: "24px" }}></span></div>
        </div>
        let right = isMe && <div onClick={() => this.openVPage(VEditPage)}><span className="iconfont icon-xiugai1 mr-2" style={{ fontSize: "26px", color: "white" }}></span></div>

        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header={name} headerClassName={consts.headerClass} right={right}>
            <div className="px-3 pt-2 pb-0">
                <div className="small text-muted p-1">标题 :</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{titel}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1" >链接描述 :</div>
                <LMR className="mb-3 bg-white px-3 h6">
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1" >名字 :</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{name}</pre>
                <div className="small text-muted p-1">布局模板 :</div>
                <div className=" px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>
            <LMR className="px-3 h6" right={addModule}>
                <div className="mt-2 h6 mb-0" style={{ color: '#0066cc' }} onClick={() => ondisplay()}>我的模块<i className="iconfont icon-jiantouarrow483"></i></div>
            </LMR>
            {
                lock ?
                    (itemsModule.length > 0 ? <List items={itemsModule} item={{ render: this.renderItem }} /> : <span className="pl-3">[无，请添加]</span>)
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
                <div className="text-muted">模块：{sort}</div>
                <div className="text-truncate" style={{ height: '20px' }}>内容：{content}</div>
            </div>
            <div className="px-0 col-1 text-right mr-1">
                <i className="iconfont icon-shanchu" style={{ fontSize: '25px', color: '#009900' }} onClick={() => this.controller.onRemove(item.id)}></i>
            </div>
        </div>;
    });
}