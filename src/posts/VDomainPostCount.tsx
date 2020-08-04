import * as React from 'react';
import { View } from 'tonva';
import { observer } from 'mobx-react';
import { CPosts } from './CPosts';
import { observable } from 'mobx';
export class VDomainPostCount extends View<CPosts> {


    @observable private postCount: any;

    render(param: any): JSX.Element {
        return <this.content list={param} />;
    }

    private initPostCount = async (param: any) => {
        if (this.postCount === undefined)
            this.postCount = await this.controller.searchDomainCount(param.list);
    }

    private content = observer((param: any): any => {
        this.initPostCount(param);
        if (this.postCount === 0)
            return null;
        return <span className="d-block small p-2" style={{ width: '3rem', background: '#E6E6FA', borderRadius: "50%" }}>{this.postCount}</span>;
    })


}