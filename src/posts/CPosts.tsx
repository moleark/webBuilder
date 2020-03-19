import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { VEdit } from "./VEdit";
import { Context, nav, QueryPager, PageItems, Query } from "tonva";
import { VPickImage } from "./VPickImage";
import { VPickTemplate } from "./VPickTemplate";
import { VRelease } from "./VRelease";
import { setting } from "configuration";
import { VReleaseProduct } from "./VReleaseProduct";
import { VPickProduct } from "./VPickProduct";
import { VGrade } from "./VGrade";
import { VPickProductCatalog } from "./VPickProductCatalog";

/* eslint-disable */
class PageProduct extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.seq;
    }
}


export class CPosts extends CUqBase {
    @observable pageTemplate: QueryPager<any>;
    @observable pagePosts: QueryPager<any>;
    @observable pageMedia: QueryPager<any>;
    @observable pageProduct: PageProduct;
    @observable current: any;
    @observable isMe: boolean = true;
    @observable postProduct: any;
    @observable ratioA: any;
    @observable ratioB: any;
    @observable ratioC: any;
    @observable ratioD: any;
    @observable ratioE: any;
    @observable pageProductCatalog: any;


    protected async internalStart(param: any) {
        this.setRes({
            'me-sm': 'M',
            'all-sm': 'A',
            $zh: {
                'me-sm': '我',
                'all-sm': '全',
            }
        });
    }

    setMe(isMe: boolean) {
        this.isMe = isMe;
        this.loadList();
    }

    /* 贴文查询*/
    searchPostsKey = async (key: string, author: any) => {
        this.pagePosts = new QueryPager(this.uqs.webBuilder.SearchPost, 15, 30);
        this.pagePosts.setEachItem((item: any) => {
            this.cApp.useUser(item.author);
        });
        let Auser = this.isMe ? nav.user : 0;
        await this.pagePosts.first({ key: key, author: Auser });
		/*
		for (let item of this.pagePosts.items) {
			this.cApp.useUser(item.author);
		}
		*/
    };
    /* posts模板查询*/
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new QueryPager(this.uqs.webBuilder.SearchTemplate, 15, 30);
        this.pageTemplate.first({ key: key });
    };

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key });
    };

    // 保存Post
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let { caption, discription, image, template, content } = param;
        let par = { _caption: caption, _discription: discription, _image: image, _template: template, _content: content };

        if (id) {
            await this.uqs.webBuilder.Post.save(id, param);
            let item = this.pagePosts.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
            this.closePage();
        } else {
            let ret = await this.uqs.webBuilder.AddPost.submit(par);
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.pagePosts.items.unshift(param);
            this.current = param;
        }
        this.searchPostsKey("", nav.user);
    };

    render = observer(() => {
        return this.renderView(VMain);
    });

    onAdd = () => {
        this.current = { caption: "", discription: "", content: "", image: undefined, template: undefined };
        this.openVPage(VEdit);
    };

    renderLabel() {
        return this.renderView(VPickTemplate);
    }

    loadList = async () => {
        this.searchPostsKey("", this.isMe ? nav.user : 0);
    };

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VShow);
    };

    pickImage = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchMadiaKey("");
        return await this.vCall(VPickImage);
    };

    pickProduct = async () => {

    }

    evaluate = async (val: number) => {
        this.closePage(2);
        await this.uqs.webBuilder.AddPostEvaluate.submit({
            _post: this.current.id,
            _ip: '',
            _grade: val
        })

    }
    onGrade = async () => {
        this.openVPage(VGrade);
        let a = await this.uqs.webBuilder.SearchPostEvaluate.table({ _post: this.current.id });
        console.log(a[0] == undefined, 'aaa')
        if (a[0] == undefined) {
            console.log(11111)
            this.ratioA = 0;
            this.ratioB = 0;
            this.ratioC = 0;
            this.ratioD = 0;
            this.ratioE = 0;

        } else {
            console.log(22222)
            let { GradeA, GradeB, GradeC, GradeD, GradeE } = a[0];
            let total = ~~GradeA + ~~GradeD + ~~GradeB + ~~GradeC + ~~GradeE;
            this.ratioA = total / 5 * ~~GradeA;
            this.ratioB = total / 5 * ~~GradeB;
            this.ratioC = total / 5 * ~~GradeC;
            this.ratioD = total / 5 * ~~GradeD;
            this.ratioE = total / 5 * ~~GradeE;

        }

    }
    acquire = async () => {

        // console.log(total/5*~~GradeA,'555')
        // console.log(~~GradeA + ~~GradeD + ~~GradeB + ~~GradeC + ~~GradeE,'GradeD')
    }

    onPickedImage = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Image.boxId(id));
    };

    pickTemplate = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchTemplateKey("");
        return await this.vCall(VPickTemplate);
    };

    onPickedTemplate = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    };

    onShowRelease = async () => {
        this.openVPage(VRelease);
    };

    publishPost = async (param: any) => {
        this.searchPostsKey("", 0);
        await this.uqs.webBuilder.PublishPost.submit({
            _post: this.current.id,
            _operator: nav.user,
            tags: [
                { tagName: param[0] },
                { tagName: param[1] },
                { tagName: param[2] },
                { tagName: param[3] }
            ]
        });
        this.closePage(2);
    };

    onPreviewPost = (id: number) => {
        window.open(setting.previewUrl + "/post/" + id, "_blank");
        console.log(setting.previewUrl + "/post/" + id, 'aa')
    };

    searchPostProduct = async () => {
        this.postProduct = await this.uqs.webBuilder.SearchPostPublishForProduct.table({ _post: this.current.id });
    };

    showPostPublishForProduct = async () => {
        await this.searchPostProduct();
        this.openVPage(VReleaseProduct);
    }


    searchProduct = async (key: string) => {
        this.pageProduct = new PageProduct(this.uqs.product.SearchProduct);
        await this.pageProduct.first({ keyWord: key, salesRegion: 1 });
    };

    showProduct = async (param: any) => {
        await this.searchProduct(undefined);
        this.openVPage(VPickProduct);
    }

    onPickedProduct = async (id: number) => {
        await this.searchPostProduct();
        this.closePage();
        await this.uqs.webBuilder.PostPublishProduct.add({ product: id, arr1: [{ post: this.current.id, operator: nav.user.id }] });
    };

    delPostProduct = async (param: any) => {
        await this.searchPostProduct();
        this.uqs.webBuilder.PostPublishProduct.del({ product: param.id, arr1: [{ post: this.current.id }] });
    }


    pickProductCatalog = async (context: Context, name: string, value: number): Promise<any> => {
        let results = this.pageProductCatalog = await this.uqs.product.GetRootCategory.query({ salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.pageProductCatalog = results.first;
        return await this.vCall(VPickProductCatalog);
    };

    onPickProductCatalog = async (id: number) => {
        this.closePage();
    }

    /* 产品目录*/
    searchProductCatalogChildrenKey = async (key: string) => {
        let results = await this.uqs.product.GetChildrenCategory.query({ parent: key, salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.pageProductCatalog = results.first;
    };


    tab = () => {
        return <this.render />;
    };
}
