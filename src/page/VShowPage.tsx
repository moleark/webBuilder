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
        let { current, onRedact, itemsModule, onCommonalityModule } = this.controller;
        let { titel, name, author, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let addModule = <div>
            <strong className="py-2 mt-2 h6" onClick={() => onCommonalityModule()}>关联模块</strong>
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
                    <div className="py-2 mt-2 h6" style={{ fontWeight: 700 }}>我的模块  :</div>
                </LMR>
                {
                    itemsModule.length > 0 ? <List items={itemsModule} item={{ render: this.renderItem }} /> : <span>[无]</span>
                }
            </div>
        </Page>;
    })
    private itemClick = (item: any) => {
        this.controller.showDetailModule(item);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { author, sort, content, $update, branchType } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small"><EasyTime date={$update} /></div>

        </div>;

        return <div className="px-4 py-1" style={{ display: 'flex' }}>
            <div className="col-11" onClick={() => this.itemClick(item)}>
                <b>{content}</b>
                <div>{sort}</div>
            </div>
            <div>
                <strong style={{ color: 'rgb(21, 161, 21)' }} onClick={() => this.controller.onRemove(item.id)}>删除</strong>
            </div>

        </div>;
    });
}