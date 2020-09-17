import * as React from 'react';
import { View, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CPosts } from './CPosts';
import { observable } from 'mobx';
export class VTagSubjectname extends View<CPosts> {


    @observable private tagName: any[];
    render(postId: any): JSX.Element {
        return <this.content postId={postId} />;
    }

    private inittagName = async (postId: any) => {
        if (this.tagName === undefined)
            this.tagName = await this.controller.getTagSubName(postId);
    }

    private content = observer((param: any): any => {
        this.inittagName(param.postId);
        if (this.tagName === undefined)
            return null;
        return <span className=" small p-2" >{this.tagName.map((e: any) => tv(e.subject, v => v.name))}<>&nbsp;</></span>;
    })
}
