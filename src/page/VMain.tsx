import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, FA, List, Tuid, User, UserView, EasyTime, LMR } from 'tonva';

export class VMain extends VPage<CPage> {
    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { onAdd, searchwebPage } = this.controller;
        let right = <div onClick={onAdd}><span className="iconfont icon-jiahao1 mr-2" style={{ fontSize: "26px", color: "white" }}></span></div>
        return <Page header="网页" headerClassName={consts.headerClass} right={right} >
            <List items={searchwebPage} item={{ render: this.renderItem }} />
        </Page>;
    });

    // private itemClick = (item: any) => {
    //     this.controller.showDetail(item.id);
    // }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { author, name, $update, titel } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right ">
            <div className="small pt-1"><UserView id={author} render={renderAuthor} /></div>
            <div className="small"><EasyTime date={$update} /></div>
        </div>;

        // return <LMR className="p-2 px-3 border-bottom" right={right}>
        //     
        // </LMR>;
        return <div className="px-2 d-flex p-1">
            <div className="col-10 d-flex" onClick={() => this.controller.showDetail(item.id)}>
                <div>
                    <b>{name}</b>
                    <div className="small py-1 text-muted ">{titel}</div>
                </div>
            </div>
            <div className="small col-2 text-muted text-right px-0">
                <button
                    style={{ fontWeight: 550, padding: '0 5px', fontSize: '12px' }} className="mt-2 btn btn-outline-primary"
                    onClick={() => this.controller.onPreviewPage(item.id)}
                >预览
                 </button>

                <div className="small pt-1 text-truncate"><UserView id={author} render={renderAuthor} /></div>
                <div className="small"><EasyTime date={$update} /></div>

            </div>
        </div>
    });
}