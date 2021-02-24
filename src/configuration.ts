import { AppConfig, env } from "tonva";
import logo from "../src/static/images/logo.png";

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/webBuilder",
    version: "1.0.70",
    tvs: {},
    oem: "百灵威"
};

/* eslint-disable */
export const setting = {
    appName: "内容管理",
    logo: logo,
    pageHeaderCss: "bg-primary",
    BusinessScope: 1  //1：平台管理   2：空中课堂  3:BV网站
};

// 生产配置
const GLOABLE_PRODUCTION = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    POSTPREVIEWROOTURL: "https://web.jkchemical.com/post/",
    PAGEPREVIEWROOTURL: "https://web.jkchemical.com",
    JKWEB: "https://web.jkchemical.com",
    BVSITE: "https://bio-vanguard.com"
};

// 测试环境配置
const GLOABLE_TEST = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    POSTPREVIEWROOTURL: "https://c.jkchemical.com/jk-web/post/",
    PAGEPREVIEWROOTURL: "https://c.jkchemical.com/jk-web",
    JKWEB: "https://c.jkchemical.com/jk-web",
    BVSITE: "https://bio-vanguard.com"
};

// 生产配置
const MadiaType = {
    IAMGE: 1,
    PDF: 2,
    VIDEO: 3,
    NOTIMAGE: 0
};

const GLOABLE = env.testing ? GLOABLE_TEST : GLOABLE_PRODUCTION;
export { GLOABLE, MadiaType };
