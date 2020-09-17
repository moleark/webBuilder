import * as React from 'react';
import { View } from 'tonva';
import { observer } from 'mobx-react';
import { CPosts } from './CPosts';
import { observable } from 'mobx';
export class VTagCatalogname extends View<CPosts> {


    @observable private tagtname: any;
    @observable private Tagname: any;
    render(postId: any): JSX.Element {
        return <this.content postId={postId} />;
    }

    private inittagtname = async (postId: any) => {
        if (this.tagtname === undefined)
            this.tagtname = await this.controller.getTagName(postId);
        let tagnames = '';
        if (this.tagtname.length > 0) {
            for (let i = 0; i < this.tagtname.length; i++) {
                tagnames += this.tagtname[i].name + '  ';
            }
        }

        this.Tagname = tagnames
        return this.Tagname;

    }

    private content = observer((param: any): any => {
        this.inittagtname(param.postId);
        if (this.tagtname === '')
            return null;
        return <span className=" small p-2" >{this.Tagname}<>&nbsp;</></span>;
    })
}