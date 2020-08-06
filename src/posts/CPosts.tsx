import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { VEdit } from "./VEdit";
import { Context, nav, QueryPager } from "tonva";
import { VPickImage } from "./VPickImage";
import { VPickTemplate } from "./VPickTemplate";
import { VRelease } from "./VRelease";
import { setting, MadiaType } from "configuration";
import { VReleaseProduct } from "./VReleaseProduct";
import { VPickProduct } from "./VPickProduct";
import { VGrade } from "./VGrade";
import { VPickProductCatalog } from "./VPickProductCatalog";
import { VProductCatalog } from "./VProductCatalog";
import { VPickSubject } from "./VPickSubject";
import { VSubject } from "./VSubject";
import { VSubjectDetil } from "./VSubjectDetil";
import { VProductCatalogDetil } from "./VProductCatalogDetil";
import { VPostProductCatalog } from "./VPostProductCatalog";
import { VPostSubject } from "./VPostSubject";
import { VPickClassroomType } from "./VPickClassroomType";
import { VPostDomain } from "./VPostDomain";
import { VPickDomain } from "./VPickDomain";
import { VDomain } from "./VDomain";
import { VDomainDetil } from "./VDomainDetil";
import { VModelarticle } from './VModelarticle';
import { VInformation } from './VInformation';
import { VInformationPost } from './VInformationPost';
import { VEditpostSort } from './VEditpostSort';
import { VProductCatalogPostCount } from "./VProductCatalogPostCount";
import { VDomainPostCount } from "./VDomainPostCount";
/* eslint-disable */
export class CPosts extends CUqBase {
    @observable pageTemplate: QueryPager<any>;
    @observable pagePosts: QueryPager<any>;
    @observable pageMedia: QueryPager<any>;
    @observable pageProductCatalogPost: QueryPager<any>;
    @observable pageSubjectPost: QueryPager<any>;
    @observable pageDomainPost: QueryPager<any>;
    @observable pageProduct: QueryPager<any>;
    @observable modelpage: QueryPager<any>
    @observable selectPosts: QueryPager<any>;
    @observable pageInformationPosts: QueryPager<any>;
    @observable informationpagePosts: QueryPager<any>;
    @observable current: any;
    @observable postProduct: any;
    @observable ratioA: any;
    @observable ratioB: any;
    @observable ratioC: any;
    @observable ratioD: any;
    @observable ratioE: any;

    @observable pagePostProductCatalog: any;
    @observable pagePostProductCatalogExplain: any;
    @observable pagePostSubject: any;
    @observable pagePostDomain: any;

    @observable isMyself: boolean = true;
    @observable searchKey: any;
    @observable searchAuthor: any;

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
        this.isMyself = isMe;
        this.searchPostsKey(this.searchKey, this.isMyself ? nav.user : 0);
    }

    onScrollBottom = async () => {
        await this.pagePosts.more();
    };

    /* 贴文查询*/
    searchPostsKey = async (key: string, author: any) => {
        this.searchKey = key;
        this.searchAuthor = author;
        this.pagePosts = new QueryPager(this.uqs.webBuilder.SearchPost, 15, 30);
        this.pagePosts.setEachPageItem((item: any, results: { [name: string]: any[] }) => {
            this.cApp.useUser(item.author);
        });

        let Auser = this.isMyself ? nav.user : 0;
        await this.pagePosts.first({ key: key, author: Auser, types: setting.BusinessScope });
    };
    /* posts模板查询*/
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new QueryPager(this.uqs.webBuilder.SearchTemplate, 15, 30);
        this.pageTemplate.first({ key: key });
    };

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key, types: MadiaType.IAMGE });
    };

    // 保存Post
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let { caption, discription, image, template, content, emphasis } = param;
        let par = { _caption: caption, _discription: discription, _image: image, _template: template, _content: content, _emphasis: emphasis };
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
            param.isValid = 1;
            // param.emphasis = 0;
            await this.uqs.webBuilder.Post.save(ret.id, param);
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
        this.searchPostsKey("", this.isMyself ? nav.user : 0);
    };

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VShow);
    };

    pickImage = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchMadiaKey("");
        return await this.vCall(VPickImage);
    };

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

    publishPost = async (param: any[], startdate: Date, enddate: Date) => {
        await this.uqs.webBuilder.PublishPost.submit({
            _post: this.current.id,
            _startDate: startdate,
            _endDate: enddate,
            tags: param.map(v => { return { tagName: v } })
        });
        this.searchPostsKey("", 0);
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
        this.pageProduct = new QueryPager(this.uqs.product.SearchProduct, 15, 30);
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


    /* 产品目录*/
    showPostProductCatalog = async () => {
        this.pagePostProductCatalog = await this.uqs.webBuilder.SearchPostCatalog.table({ _post: this.current.id });
        this.pagePostProductCatalogExplain = await this.uqs.webBuilder.SearchPostCatalogExplain.table({ _post: this.current.id })
        this.openVPage(VPostProductCatalog);
    }
    pickProductCatalog = async (): Promise<any> => {
        let results = await this.uqs.product.GetRootCategory.query({ salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        return await this.vCall(VPickProductCatalog, results.first);
    };
    onPickProductCatalog = async (param: any, type: any) => {
        let { productCategory, name } = param;
        if (type == 0) {
            await this.uqs.webBuilder.AddPostProductCatalog.submit({ _post: this.current.id, _productCategory: productCategory.id, _name: name });
            this.pagePostProductCatalog = await this.uqs.webBuilder.SearchPostCatalog.table({ _post: this.current.id });
        } else {
            await this.uqs.webBuilder.AddPostProductCatalogExplain.submit({ _post: this.current.id, _productCategory: productCategory.id, _name: name });
            this.pagePostProductCatalogExplain = await this.uqs.webBuilder.SearchPostCatalogExplain.table({ _post: this.current.id })
        }
    }
    delPostProductCatalog = async (post: any, productCategory: any) => {
        await this.uqs.webBuilder.PostProductCatalog.del({ post: post, arr1: [{ productCategory: productCategory }] });
        this.pagePostProductCatalog = await this.uqs.webBuilder.SearchPostCatalog.table({ _post: post })
    }

    delPostProductCatalogExplain = async (post: any, productCategory: any) => {
        await this.uqs.webBuilder.PostProductCatalogExplain.del({ post: post, arr1: [{ productCategory: productCategory }] });
        this.pagePostProductCatalogExplain = await this.uqs.webBuilder.SearchPostCatalogExplain.table({ _post: post })
    }

    searchProductCatalogChildrenKey = async (key: string) => {
        let results = await this.uqs.product.GetChildrenCategory.query({ parent: key, salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.openVPage(VPickProductCatalog, results.first)
    };

    showProductCatalog = async () => {
        let results = await this.uqs.product.GetRootCategory.query({ salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        let param = { data: results.first, name: "产品目录" };
        this.openVPage(VProductCatalog, param);
    }

    searchProductCatalogChildrenKeys = async (param: any) => {
        let { productCategory, name } = param
        let results = await this.uqs.product.GetChildrenCategory.query({ parent: productCategory.id, salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.openVPage(VProductCatalog, { data: results.first, childdata: results.secend, name: name })
    };

    showProductCatalogDetil = async (param: any) => {
        let { productCategory, name } = param;
        this.pageProductCatalogPost = new QueryPager(this.uqs.webBuilder.SearchProductCategoryPost, 15, 30);
        let pageProductCatalogPost = this.pageProductCatalogPost
        this.pageProductCatalogPost.first({ author: 0, productCategory: productCategory, publish: 0 })
        let spcdetil = { pageProductCatalogPost, name: name }
        return await this.vCall(VProductCatalogDetil, spcdetil);
    }

    renderProductCatalogPostCount = (productcatolg: any) => {
        return this.renderView(VProductCatalogPostCount, productcatolg);
    }

    searchProductCatalogPostCount = async (productcategory: any) => {
        let list = await this.uqs.webBuilder.SearchProductCategoryPostCount.obj({ productCategory: productcategory });
        return list.postcounts;
    }

    /** 栏目**/
    showPostSubject = async () => {
        this.pagePostSubject = await this.uqs.webBuilder.SearchPostSubject.table({ _post: this.current.id })
        this.openVPage(VPostSubject);
    }
    pickSubject = async (param: any) => {
        let pageSubject = new QueryPager(this.uqs.webBuilder.SearchSubject, 15, 100);
        pageSubject.first({ _parent: param })
        return await this.vCall(VPickSubject, pageSubject);
    }
    onPickSubject = async (param: any) => {
        let { id } = param;
        await this.uqs.webBuilder.AddPostSubject.submit({ _post: this.current.id, _subject: id });
        this.pagePostSubject = await this.uqs.webBuilder.SearchPostSubject.table({ _post: this.current.id });
    }

    delPostSubject = async (subject: any) => {
        await this.uqs.webBuilder.DelPostSubject.submit({ _post: this.current.id, _subject: subject })
        this.pagePostSubject = await this.uqs.webBuilder.SearchPostSubject.table({ _post: this.current.id })
    }

    showSubject = async (param: any) => {
        let { name, id } = param;

        let pageSubject = new QueryPager(this.uqs.webBuilder.SearchSubject, 15, 100);
        pageSubject.first({ _parent: id });

        let sub = { pageSubject, name: name }
        this.openVPage(VSubject, sub);
    }
    showSubjectPost = async (param: any) => {
        let { name, id } = param;
        this.pageSubjectPost = new QueryPager(this.uqs.webBuilder.SearchSubjectPost, 15, 30);
        this.pageSubjectPost.first({ author: 0, subject: id, publish: 0 })
        let pageSubjectPost = this.pageSubjectPost;
        let showsubpost = { pageSubjectPost, name: name }
        return await this.vCall(VSubjectDetil, showsubpost);
    }


    //领域
    showPostDomain = async () => {
        this.pagePostDomain = await this.uqs.webBuilder.SearchPostDomain.table({ _post: this.current.id });
        this.openVPage(VPostDomain);
    }
    pickDomain = async (param: any) => {
        let pageDomain = new QueryPager(this.uqs.customer.SearchDomain, 15, 100);
        pageDomain.first({ _parent: param })
        return await this.vCall(VPickDomain, pageDomain);
    }
    onPickDomain = async (param: any) => {
        let { id } = param;
        await this.uqs.webBuilder.AddPostDomain.submit({ _post: this.current.id, _domain: id });
        this.pagePostDomain = await this.uqs.webBuilder.SearchPostDomain.table({ _post: this.current.id });
        this.closePage();
    }
    delPostDomain = async (domain: any) => {
        await this.uqs.webBuilder.PostDomain.del({ post: this.current.id, arr1: [{ domain: domain }] });
        this.pagePostDomain = await this.uqs.webBuilder.SearchPostDomain.table({ _post: this.current.id })
    }
    showDomain = async (param: any) => {
        let { id, name } = param;
        let domain = new QueryPager(this.uqs.customer.SearchDomain, 15, 100);
        domain.first({ _parent: id });
        let sdomain = { domain, name: name }
        this.openVPage(VDomain, sdomain);
    }
    showDomainPost = async (param: any, key: any) => {
        this.showDomainPost_Search(param, key)
        this.openVPage(VDomainDetil, param);
    }
    showDomainPost_Search = async (param: any, key: any) => {
        this.pageDomainPost = new QueryPager(this.uqs.webBuilder.SearchDomainPost, 15, 100);
        this.pageDomainPost.first({ key: key, author: 0, domain: param.id, publish: 0 })
    }

    showPickClassroomType = async () => {
        let list = await this.uqs.webBuilder.ClassroomType.all();
        this.openVPage(VPickClassroomType, list);
    }

    onPickClassroomType = async (param: any) => {
        await this.uqs.webBuilder.PostClassroomType.add({ post: this.current.id, arr1: [{ classroomType: param.id }] });
        this.closePage();
    }

    renderDomainPostCount = (domain: any) => {
        return this.renderView(VDomainPostCount, domain);
    }

    searchDomainCount = async (domain: any) => {
        let list = await this.uqs.webBuilder.SearchDomainPostCount.obj({ domain: domain });
        return list.postcounts;
    }

    tab = () => {
        return <this.render />;
    };
    //范文
    showModel = async () => {

        let { hotPosts } = this.uqs.webBuilder;
        let list = await hotPosts.query({});
        let ret: any[] = list.ret;
        ret.forEach(element => {
            this.cApp.useUser(element.author);
        });
        this.openVPage(VModelarticle, ret);
    }
    //资讯中心 
    InformationCente = async () => {
        await this.searchInformationPost();
        this.openVPage(VInformation)
    }
    searchInformationPost = async () => {
        this.pageInformationPosts = new QueryPager(this.uqs.webBuilder.SearchInformationPost, 15, 30);
        this.pageInformationPosts.first({});
    };

    //去添加贴文
    toaddPost = async () => {
        this.informationsearchPostsKey("", "")
        return await this.vCall(VInformationPost);
    };
    onScrollBottoms = async () => {
        await this.informationpagePosts.more();
    };
    informationsearchPostsKey = async (key: string, author: any) => {
        this.informationpagePosts = new QueryPager(this.uqs.webBuilder.SearchPost, 15, 30);
        this.informationpagePosts.setEachPageItem((item: any, results: { [name: string]: any[] }) => {
            this.cApp.useUser(item.author);
        });
        // let Auser = 0;console.log(item)
        await this.informationpagePosts.first({ key: key, author: 0, types: setting.BusinessScope });
    };
    //添加到资讯中心  
    addInformation = async (param: any) => {
        this.closePage();
        let { sort, id } = param;
        await this.uqs.webBuilder.AddInformationPost.submit({ _post: id, _sort: sort });
        await this.searchInformationPost();
    };
    //删除贴文
    delPostItem = async (param: any) => {
        let { post, sort } = param;
        await this.uqs.webBuilder.InformationPost.del({ post: post.id, arr1: [{ sort: sort }] });
        await this.searchInformationPost()
    }

    //贴文排序页面
    editPostShow = async (param: any) => {
        this.openVPage(VEditpostSort, param);
    }

}
