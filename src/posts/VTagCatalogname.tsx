import * as React from 'react';
import { View } from 'tonva';
import { observer } from 'mobx-react';
import { CPosts } from './CPosts';
import { observable } from 'mobx';
export class VTagCatalogname extends View<CPosts> {


    @observable private tagtname: any;
    @observable private Tagname: any[];
    render(postId: any): JSX.Element {
        return <this.content postId={postId} />;
    }

    private inittagtname = async (postId: any) => {
        if (this.Tagname === undefined)
            this.Tagname = await this.controller.getTagName(postId);
    }

    private content = observer((param: any): any => {
        this.inittagtname(param.postId);
        if (this.Tagname === undefined) {
            return null;
        } else {
            if (this.Tagname.length === 0) {
                return null
            } else {
                return <span className="small"> 目录：{this.Tagname.map((e: any) => {
                    return <span className="small bg-light mr-1" >{e.name}</span>
                })} </span>;
            }

        }
    })

}