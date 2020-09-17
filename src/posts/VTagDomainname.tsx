import * as React from 'react';
import { View, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CPosts } from './CPosts';
import { observable } from 'mobx';
export class VTagDomainname extends View<CPosts> {

    @observable private tagName: any;
    render(postId: any): JSX.Element {
        return <this.content postId={postId} />;
    }

    private initTagName = async (postId: any) => {
        if (this.tagName === undefined)
            this.tagName = await this.controller.getTagDomainName(postId);
    }

    private content = observer((param: any): any => {
        this.initTagName(param.postId);
        if (this.tagName === undefined)
            return null;
        return <>{this.tagName.map((e: any) => { return <span className="small" > {tv(e.domain, v => v.name)}</span> })} </>;

    })
}
