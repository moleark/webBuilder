import _ from "lodash";
import { CUqBase } from "../CBase";
import { VMe } from "./VMe";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { QueryPager } from "tonva";
import { VCompileImg } from "./VCompileImg";
import { VSetDetails } from "./VSetDetails";
import { VAbout } from "./VAbout";
import { VTeam } from "./VTeam";
import { VTeamDetail } from "./VTeamDetail";
import { VAchievement } from "./VAchievement";
import { VTeamAchievement } from "./VTeamAchievement";
import moment from 'moment'
/* eslint-disable */

export class CMe extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable items: any[];
    @observable current: any;
    @observable details: any;
    @observable pagePosts: any[];
    @observable pageTeam: QueryPager<any>;
    @observable nowAchievement: any = { montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 };
    @observable Achievement: any[] = [{ montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievement: any[] = [{ montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementDetail: any[] = [{ montha: "", yeara: "", author: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];

    private year: any
    searchMadiaKey = async (key: string) => {

        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key });
    };
    protected async internalStart() { }

    onSet = () => {
        this.openVPage(VSetDetails);

    };


    onTeams = () => {
        this.openVPage(VTeam);

    };

    onDetail = async (id: number) => {
        this.openVPage(VTeamDetail)

    }

    showAbout = () => {
        this.openVPage(VAbout);
    };

    loadList = async () => {
        /**
        // post用浏览量
        let postTotal = await this.uqs.webBuilder.SearchTotalBrowsing.query({});

        if (postTotal.ret.length && (postTotal.ret.length > 0)) {
            //this.PostTotal = postTotal.ret[0].PostTotal;
        }

        // page用户总浏览量
        let pageTotal = await this.uqs.webBuilder.SearchTotalBrowsing.query({});
        if (pageTotal.ret.length && (pageTotal.ret.length > 0)) {
            // this.PageTotal = pageTotal.ret[0].PageTotal;
        }
        **/
        await this.searchAchievementDetail();
        await this.searchTeam();
    };

    searchAchievementDetail = async () => {
        let ret = await this.uqs.webBuilder.SearchAchievement.table({ _type: "nowyear", _year: "2020" });
        if (ret[0] == undefined) {
        } else {
            this.nowAchievement = ret[0];
        }
    }

    onAlterImg = () => {
        this.current = undefined;
        this.openVPage(VCompileImg);
    };

    saveItem = async (id: any, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Image.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.items.unshift(param);
            this.current = param;
        }
        this.searchMadiaKey("");
    };

    searchTeam = async () => {
        this.pageTeam = new QueryPager(this.uqs.hr.SearchTeam, 15, 30);

        this.pageTeam.setEachPageItem((item: any, results: { [name: string]: any[] }) => {
            this.cApp.useUser(item.webuser);
        });
        await this.pageTeam.first({ key: "" });

    }

    showAchievement = async () => {
        this.year = moment().format('YYYY')
        this.Achievement = await this.uqs.webBuilder.SearchAchievement.table({ _type: "month", _year: this.year });
        this.openVPage(VAchievement)
    }

    showTeamAchievement = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievement = await this.uqs.webBuilder.SearchAchievementOfTeam.table({ _manage: 0, _year: this.year });
        this.getTeamAchievementDetail(0, this.year, "week");
        this.openVPage(VTeamAchievement);
    }

    getTeamAchievementDetail = async (manage: any, year: any, type: any) => {
        this.teamAchievementDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _year: year, _type: type });
    }

    render = observer(() => {

        return this.renderView(VMe);
    });
    tab = () => this.renderView(VMe);
}
