import * as React from 'react';
import { VPage, Page, List } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VReleaseProduct extends VPage<CPosts> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        return <Page header={this.t('productpublish')} headerClassName={consts.headerClass} >
            <List
                before={""}
                none={none}
                items={param}
                item={{ render: this.renderItem }}
            />
        </Page>;
    })

    private renderItem = (item: any, index: number) => {
        return <div>sdf</div>;
    };
}
