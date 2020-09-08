import _ from "lodash";
import { CUqBase } from "../CBase";
import { VMe } from "./VMe";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { QueryPager, Context } from "tonva";
import { VCompileImg } from "./VCompileImg";
import { VSetDetails } from "./VSetDetails";
import { VAbout } from "./VAbout";
import { VTeam } from "./VTeam";
import { VTeamDetail } from "./VTeamDetail";
import { VAchievement } from "./VAchievement";
import { VTeamAchievement } from "./VTeamAchievement";
import moment from 'moment'
import { VCat } from "./VCat";
import { VEditCat } from "./VEditCat";
import { VTeamInputPost } from "./VTeamInputPost";
import { VTeamAchievementDetail } from "./VTeamAchievementDetail";
import { VTeamAchievementMonDetail } from "./VTeamAchievementMonDetail";
import { VTeamMonthPipeDetail } from "./VTeamMonthPipeDetail";
import { VOtherHitPost } from './VOtherHitPost';
import { VSidebarSubject } from './VSidebarSubject';
import { setting } from "configuration";
/* eslint-disable */

export class CMe extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable items: any[];
    @observable pageSidebar: any[];
    @observable current: any;
    @observable details: any;
    @observable pagePosts: any[];
    @observable pageTeam: QueryPager<any>;
    @observable nowAchievement: any = { montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 };
    @observable AchievementWeek: any[] = [{ montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable AchievementMonth: any[] = [{ montha: "", yeara: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementDay: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementMonthchart: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementDetail: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementlist: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0, name: '' }];
    @observable teamAchievementMonDetail: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable pageCat: any;
    @observable currentCat: any;
    @observable currentCatParent: any = "0";
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
        this.AchievementWeek = await this.uqs.webBuilder.SearchAchievement.table({ _type: "week", _year: this.year });
        this.AchievementMonth = await this.uqs.webBuilder.SearchAchievement.table({ _type: "month", _year: this.year });
        this.openVPage(VAchievement)
    }

    /** 
     * 团队折线图
     * **/
    getTeamAchievement = async () => {
        this.teamAchievementDay = await this.uqs.webBuilder.SearchAchievementOfTeamNew.table({ _manage: 0, _year: this.year, _type: "day" });
        this.teamAchievementMonthchart = await this.uqs.webBuilder.SearchAchievementOfTeamNew.table({ _manage: 0, _year: this.year, _type: "month" });
    }
    showTeamAchievement = async () => {
        this.year = moment().format('YYYY')
        await this.getTeamAchievement()
        await this.getteamAchievementDetail()
        await this.openVPage(VTeamAchievement);
    }
    /**
     * 日报详细
     */
    getteamAchievementDetail = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _year: this.year, _month: '', _type: "day" });
        this.teamAchievementDetail.forEach(element => {
            this.cApp.useUser(element.author);
        });
        this.teamAchievementlist = this.teamAchievementDetail.map(element => {
            const obj = { ...element }
            if (element.author && element.author.id) {
                obj.name = this.cApp.renderUser(element.author.id);
            }
            return obj
        })
    }
    showTeamAchievementDetail = async () => {
        await this.getteamAchievementDetail()
        await this.openVPage(VTeamAchievementDetail)
    }

    /**  
     * 月报详细
     */
    showTeamAchievementMonDetail = async (param: any) => {
        this.year = moment().format('YYYY')
        this.teamAchievementMonDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _type: "month", _year: this.year, _month: param });
        this.teamAchievementMonDetail.forEach(v => {
            this.cApp.useUser(v.author);
        });
        this.openVPage(VTeamAchievementMonDetail, param)
    }

    /**
     * 渠道详情
     */
    showTeamAchievementPipeDetail = async (param: any) => {
        this.year = moment().format('YYYY')
        this.teamAchievementMonDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _type: "month", _year: this.year, _month: param });
        this.teamAchievementMonDetail.forEach(v => {
            this.cApp.useUser(v.author);
        });
        this.openVPage(VTeamMonthPipeDetail, param)
    }

    addInputPostSum = async () => {
        return await this.vCall(VTeamInputPost);
    };
    pickPost = async (context: Context, name: string, value: number): Promise<any> => {
        this.cApp.cPosts.informationsearchPostsKey("", "")
        return await this.vCall(VOtherHitPost);
    };
    /**
     * 其他网站浏览量提交
     */
    addSourceHit = async (param: any) => {
        this.closePage();
        let { post, source, postReadSum, date } = param;
        await this.uqs.webBuilder.hitOfManual.submit({ post: post, source: source, hit: postReadSum, hitdate: date });
        await this.getTeamAchievement()
    };
    onPickedPost = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Post.boxId(id));
    };
    onPickedSoure = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    };

    showCat = async (param: any) => {
        let { id, name } = param;
        let pageCat = new QueryPager(this.uqs.webBuilder.SearchCat, 15, 30);
        pageCat.first({ parent: param });
        let pageCats = { pageCat, name, id };
        this.openVPage(VCat, pageCats)
    }

    searchCat = async (parent: string) => {
        this.currentCatParent = parent;
        this.pageCat = new QueryPager(this.uqs.webBuilder.SearchCat, 15, 30);
        this.pageCat.first({ parent: parent });
    };

    showAddCat = async (id: any) => {
        this.currentCat = { id: null, name: null, isValid: 1 };
        this.openVPage(VEditCat);
    }

    showEditCat = async (item: any) => {
        this.currentCat = item;
        this.openVPage(VEditCat);
    }

    saveCat = async (id: any, parent: any, name: any, isValid: any) => {
        let param = { parent: this.currentCatParent, name: name, isValid: isValid };
        await this.uqs.webBuilder.IMGCat.save(id, param);
        this.searchCat(this.currentCatParent);
    }

    /**侧边栏目 */
    getsubjectDefault = async () => {
        this.pageSidebar = await this.uqs.webBuilder.SearchSubjectDefault.table({ _businessScope: setting.BusinessScope });
    }
    showSidebar = async () => {
        await this.getsubjectDefault()
        this.openVPage(VSidebarSubject);
    }
    /**添加栏目*/
    onSubjectEdit = async (param: any) => {
        this.closePage(param.type);
        await this.uqs.webBuilder.SubjectDefault.add({ businessScope: setting.BusinessScope, arr1: [{ subject: param.id, type: null }] });
        await this.getsubjectDefault()
    };
    /*删除栏目*/
    delSubjectEdit = async (param: any) => {
        await this.uqs.webBuilder.DelSubjectDefault.submit({ _subject: param.id });
        await this.getsubjectDefault()
    }
    /**选择栏目 */
    selectSubject = async () => {
        return await this.cApp.cPosts.showSelectSubjectEdit({ name: "栏目", id: "10000" + setting.BusinessScope, type: 1 })
    }
    render = observer(() => {
        return this.renderView(VMe);
    });
    tab = () => this.renderView(VMe);
}
