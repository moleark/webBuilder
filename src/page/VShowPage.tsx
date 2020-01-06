import * as React from 'react';
import { consts } from 'consts';
import { CPage } from "./CPage";
import { observer } from 'mobx-react';
import { VEditPage } from './VEditPage';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid, List } from "tonva";

export class VShowPage extends VPage<CPage> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current, onRedact, itemsModule, onMyContent } = this.controller;
        let { ...ret } = itemsModule;
        console.log(ret,'item')
        let { titel, name, author, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let addModule = <div>
        <button
            className="btn btn-success btn-sm ml-4 mr-2 mt-2 align-self-center"
            onClick={onRedact} >
            <FA name="plus" />
        </button>
        </div>
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center" onClick={() => this.openVPage(VEditPage)}><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header={name + '网页详情'} headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{titel}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1">链接描述</div>
                <LMR className="mb-3 bg-white px-3 h6">
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1">名字</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{name}</pre>
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
                <LMR className="bg-white px-3 h6" right={addModule}>
                    <div className="py-2 mt-2 h6" style={{fontWeight: 700}}>子模块</div>
                </LMR>
                <List items={itemsModule} item={{ render: this.renderItem, onClick: this.itemClick }} />
            </div>
        </Page>;
    })
    private itemClick = (item: any) => {
        this.controller.showDetailModule(item.id);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { author, content, $update } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small"><EasyTime date={$update} /></div>
        </div>;

        return <LMR className="px-4 py-1" right={right}>
            <b>{content}</b>
        </LMR>;
    });
}