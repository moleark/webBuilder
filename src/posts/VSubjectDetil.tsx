import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv, FA, EasyTime } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";

export class VSubjectDetil extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageSubjectPost } = this.controller;
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        return (
            <Page header={"产品目录树"} headerClassName={consts.headerClass} onScrollBottom={this.onScrollBottom} >
                <List before={""} none={none} items={pageSubjectPost} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private onScrollBottom = async () => {
        await this.controller.pageSubjectPost.more();
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showDetail } = this.controller;
        if (!user) return;
        let { image, caption, discription, author, $update, $create
            , hits, sumHits
            , web, agent, assist, openweb } = item;

        let $c: Date = $create, $u: Date = $update;
        let updated: boolean = false;
        if ($c && $u) {
            let now = Date.now(), create = $c.getTime(), update = $u.getTime();
            if (update - create > 3600 * 1000 && now - create < 24 * 3600 * 1000) {
                updated = true;
            }
            else {
                let cYear = $c.getFullYear(), cMonth = $c.getMonth(), cDate = $c.getDate();
                let uYear = $u.getFullYear(), uMonth = $u.getMonth(), uDate = $u.getDate();
                updated = cYear !== uYear || cMonth !== uMonth || cDate !== uDate;
            }
        }

        let divUser = user.id === author.id ?
            <span className="text-warning">[自己]</span>
            :
            this.controller.cApp.renderUser(author.id);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer" onClick={() => showDetail(item.id)} >
                    <div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined, //w-6c h-4c mr-2 text-black-50 justify-content-center d-flex align-items-center
                            () => (
                                <div className="d-flex align-items-center h-100
								justify-content-center bg-light border rounded">
                                    <FA className="text-info" name="camera" size="lg" />
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
								&ensp;<EasyTime date={$create} />
                                {updated === true && <>&ensp;<FA name="pencil-square-o" /><EasyTime date={$update} /></>}
                            </div>
                            <div className="author">
                                {sumHits && hits && <>阅读<b>{sumHits}</b>次
									{sumHits > hits && <>周<b>{hits}</b>次</>}
                                </>
                                }
                            </div>
                        </div>
                        <div className="small pt-1" style={{ overflow: "hidden" }}>
                            {(web + agent + assist + openweb) > 0 ? <span className="mr-1 text-muted">发布：</span> : <></>}
                            {web === 1 ? <span className="mr-1 text-primary">{this.t('privateSite')}</span> : <></>}
                            {agent === 1 ? <span className="mr-1 text-primary">{this.t('agent')}</span> : <></>}
                            {assist === 1 ? <span className="mr-1 text-primary">{this.t('sales')}</span> : <></>}
                            {openweb === 1 ? <span className="mr-1 text-primary">{this.t('publicSite')}</span> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}