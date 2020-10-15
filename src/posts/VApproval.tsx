import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv, EasyTime, FA } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";

export class VApproval extends VPage<CPosts> {
    async open() {
        this.openPage(this.page)
    }

    render(): JSX.Element {
        return <this.page />;
    }

    private page = observer(() => {
        let { toaddPost, approvalpagePosts } = this.controller;
        let right = <span className="mx-2 iconfont icon-jiahao1 cursor-pointer"
            style={{ fontSize: "1.7rem", color: "white" }} onClick={toaddPost}></span>

        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        return <Page header={this.t('informationcenter')} headerClassName={consts.headerClass} right={right}>
            <List before={""} none={none} items={approvalpagePosts} item={{ render: this.renderItem }} />
        </Page>;
    });

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showDetail, rendertagCatalogname, rendertagSubjectname, rendertagDomain, onApproval } = this.controller;
        if (!user) return;
        let { image, caption, discription, author, $update, $create, emphasis, id } = item;
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
        let divUser: any;
        if (author && author.id) {
            divUser = user.id === author.id ?
                <span className="text-warning">[自己]</span>
                :
                this.controller.cApp.renderUser(author.id);
        }

        let tagCatalogname = rendertagCatalogname(id);
        let tagSubjectname = rendertagSubjectname(id)
        let tagDomainname = rendertagDomain(id)

        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3 " name="star" /> : "";
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer"  >
                    <div className="mr-1 w-5c w-min-5c h-5c h-min-5c d-flex align-items-center" onClick={() => showDetail(id)}>
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined,
                            () => (
                                <div className="d-flex align-items-center h-100
								justify-content-center bg-light border rounded">
                                    <FA className="text-info" name="camera" size="lg" />
                                </div>
                            )
                        )}
                    </div>
                    <div className="d-flex flex-column  col-md-10">
                        <div className="ml-1"><b>{caption}</b></div>
                        <div className="small ml-1 text-muted py-2 flex-fill">{discription}</div>
                        <div className="small d-flex ml-1">
                            <div className="flex-fill">
                                {divUser}
								&ensp;<EasyTime date={$create} />
                                {updated === true && <>&ensp;<FA name="pencil-square-o" /><EasyTime date={$update} /></>}
                                {showImport}
                            </div>
                        </div>
                        <div>
                            {tagCatalogname}
                            {tagSubjectname}
                            {tagDomainname}
                        </div>
                    </div>
                    <div className="d-flex small col-md-2 text-primary">
                        <div className="py-4 px-2" onClick={() => onApproval(item, 4)}>批准</div>
                        <div className="py-4 px-2" onClick={() => onApproval(item, 3)}>驳回</div>
                    </div>
                </div>
            </div>
        );
    });
}

