import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, EasyTime, tv, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import classNames from "classnames";
import { observable } from "mobx";
import { CPage } from "page/CPage";
import { Rate } from "element-react";

export class VGrade extends VPage<CPosts> {
    async open() { 
        this.openPage(this.page)
    }

    render(): JSX.Element {
        return <this.page />;
    }
    private page = observer(() => {
        let { evaluate } = this.controller;
        let value:number;
        return <Page header='评价' headerClassName={consts.headerClass}>
                <div className="intro-block text-center mt-4">
                    <div className="block">
                        <span className="wrapper">
                        <Rate showText={true}
                        colors={['#99A9BF', '#F7BA2A', '#FF9900']}
                        onChange={(val) => value=val} />
                        </span>
                    </div>
                    <button onClick={()=>evaluate(value)} type="button" className="btn btn-primary mt-2 small py-2">提交</button>
                    {/* <div className="mt-2">提交</div> */}
                </div>
            </Page>;
    });
}