import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv } from "tonva";
import { CPosts } from "./CPosts";

export class VModelarticle extends VPage<CPosts> {
    private hotlist: any
    async open(param: any) {
        param = param.slice(0, 10);
        this.hotlist = param;
        this.openPage(this.page);
    }
    private page = observer((param: any) => {
        return <Page header="一周范文">
            <List before={""} none="没有" items={this.hotlist} item={{ render: this.renderItem }} />
        </Page >;

    });

    private renderItem = (item: any, index: number) => {
        let { user, showDetail } = this.controller;
        let { image, caption, discription, author, hits } = item;

        let divUser = user.id === author.id ?
            <span className="text-warning">[自己]</span>
            :
            this.controller.cApp.renderUser(author.id);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer" onClick={() => showDetail(item.post)} >
                    {item.id}
                    <div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined,
                            () => (
                                <div className="d-flex align-items-center h-100
                                    justify-content-center bg-light border rounded">
                                </div>
                            )
                        )}
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div><b>{caption}</b></div>
                        <div className="small text-muted py-2 flex-fill">{discription}</div>
                        <div className="small d-flex">
                            <div className="flex-fill">
                                {divUser}
                            </div>
                            <div className="author">
                                {hits && <>阅读<b>{hits}</b>次<span className="px-1"></span>
                                    {hits && <>周<b>{hits}</b>次</>}
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}
