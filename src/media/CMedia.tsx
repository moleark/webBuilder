import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { QueryPager } from "tonva";
import { VShowImg } from "./VShowImg";
import { VEdit } from "./VEdit";
import { VChangeNames } from "./VChangeNames";
import { VCat } from "./VCat";
import { VPickCat } from "./VPickCat";
import { VCatImage } from "./VCatImage";
import { VSlideShow } from "./VSlideShow";
import { VPickImage } from "posts/VPickImage";
import { VEditSlideShow } from "./VEditSlideShow";

export class CMedia extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable current: any;

    @observable pageImageCat: QueryPager<any>;
    @observable pageCatImage: QueryPager<any>;
    @observable pageSlideShow: QueryPager<any>;

    protected async internalStart(param: any) { }

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key });
    };


    //添加任务
    saveItem = async (id: any, param: any) => {
        let pa = { caption: param.caption, path: param.path, author: this.user.id, isValid: 1 };
        let ret = await this.uqs.webBuilder.Image.save(id, pa);
        if (id) {
            let item = this.pageMedia.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.pageMedia.items.unshift(param);
            this.current = param;
        }
        this.searchMadiaKey("");

    };

    onAddClick = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    };

    onimgNames = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.load(id);
        await this.searchImageCat(id);
        this.openVPage(VChangeNames);
    }

    render = observer(() => {
        return this.renderView(VMain);
    });

    showMedia = async (id: number) => {
        await this.searchImageCat(id);
        this.current = await this.uqs.webBuilder.Image.load(id);
        this.openVPage(VShowImg);
    };

    loadList = async () => {
        this.searchMadiaKey("");
    };

    onRem = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.save(id, { isValid: 0 });
        this.searchMadiaKey("");
    }

    //图片分类
    showPickCat = async (parent: string) => {
        let pageCat = new QueryPager(this.uqs.webBuilder.SearchCat, 15, 100);
        pageCat.first({ parent: parent });
        this.openVPage(VPickCat, pageCat)
    }

    onPickCat = async (image: any, cat: any) => {
        await this.uqs.webBuilder.ImageCat.add({ image: image, arr1: [{ cat: cat }] });
        await this.searchImageCat(image);
    }

    searchImageCat = async (image: any, ) => {
        this.pageImageCat = new QueryPager(this.uqs.webBuilder.SearchImageCat, 15, 30);
        this.pageImageCat.first({ image: image });
    };

    delImageCat = async (cat: any) => {
        await this.uqs.webBuilder.ImageCat.del({ image: this.current.id, arr1: [{ cat: cat }] });
        this.pageImageCat = new QueryPager(this.uqs.webBuilder.SearchImageCat, 15, 30);
        this.pageImageCat.first({ image: this.current.id });
    };


    showCat = async (param: any) => {
        let pageCat = new QueryPager(this.uqs.webBuilder.SearchCat, 15, 30);
        pageCat.first({ parent: param });
        this.openVPage(VCat, pageCat)
    }


    showCatImage = async (cat: any) => {
        await this.searchCatImage("", cat);
        this.openVPage(VCatImage, cat);
    }

    searchCatImage = async (key: any, cat: any) => {
        this.pageCatImage = new QueryPager(this.uqs.webBuilder.SearchCatImage, 15, 30);
        this.pageCatImage.first({ key: key, cat: cat });
    };


    //轮播图
    showSlideShow = async () => {
        await this.searchSlideShow();
        this.openVPage(VSlideShow);
    }

    searchSlideShow = () => {
        this.pageSlideShow = new QueryPager(this.uqs.webBuilder.SearchSlideShow, 15, 30);
        this.pageSlideShow.first({});
    }


    pickImage = async () => {
        this.searchMadiaKey("");
        return await this.vCall(VPickImage);
    };

    onPickedImage = async (image: any) => {
        this.closePage();
        await this.uqs.webBuilder.UpdateSlideShow.submit({ image: image, description: undefined, src: undefined, types: 0, sort: 1 })
        await this.searchSlideShow();
    };

    delSlideShow = async (image: any) => {
        //await this.uqs.webBuilder.SlideShow.del({ image: image.id, arr1: [{}] })
        await this.uqs.webBuilder.DeleteSlideShow.submit({ _image: image.id });
        await this.searchSlideShow();
    }

    showEditSlideShow = (param: any) => {
        this.openVPage(VEditSlideShow, param);
    }

    updateSlideShow = async (image: any, description: any, src: any, types: any, sort: any) => {
        let type = types ? 1 : 0;
        await this.uqs.webBuilder.UpdateSlideShow.submit({ image: image, description: description, src: src, types: type, sort: sort })
        await this.searchSlideShow();
    }

    tab = () => {
        return <this.render />;
    };
}
