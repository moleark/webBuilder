import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page } from "tonva";
import { CPosts } from "./CPosts";
import { Rate } from "element-react";

export class VGrade extends VPage<CPosts> {
    async open() {
        this.openPage(this.page)
    }

    render(): JSX.Element {
        return <this.page />;
    }
    private page = observer(() => {
        let { evaluate, ratioA, ratioB, ratioC, ratioD, ratioE } = this.controller;
        let value: number;
        return <Page header='评价' headerClassName={consts.headerClass}>
            <div className="intro-block">
                <div className="block d-flex align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer">
                    <span className="wrapper mr-2">
                        我的评分：
                        </span>
                    <Rate showText={true}
                        colors={['#99A9BF', '#F7BA2A', '#FF9900']}
                        onChange={(val) => value = val}
                    />
                    <div className="flex-fill d-flex justify-content-end">

                        <button onClick={() => { value == undefined ? alert('请选择您的评分') : evaluate(value) }} type="button" className="btn-sm btn btn-primary">提交</button>
                    </div>
                </div>

                <div className='block align-items-centerd-flex px-3 py-2 bg-white align-items-center cursor-pointer'>
                    <div className="d-flex"><Rate disabled={true} value={5} /> <span>惊喜5颗星:  {Number(ratioE).toFixed(1)}%</span>
                    </div>
                    <div className="d-flex"><Rate disabled={true} value={4} /><span>满意4颗星:  {Number(ratioD).toFixed(1)}%</span>
                    </div>
                    <div className="d-flex"><Rate disabled={true} value={3} /><span>一般3颗星:  {Number(ratioC).toFixed(1)}%</span>
                    </div>
                    <div className="d-flex"><Rate disabled={true} value={2} /><span>失望2颗星:  {Number(ratioB).toFixed(1)}%</span>
                    </div>
                    <div className="d-flex"><Rate disabled={true} value={1} /><span>极差1颗星:  {Number(ratioA).toFixed(1)}%</span>
                    </div>
                </div>
            </div>
        </Page>;
    });
}