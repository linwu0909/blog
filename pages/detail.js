import Head from 'next/head'
import Image from 'next/image'
import {Row, Col, Menu, Icon, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import {CalendarOutlined,FolderOutlined,FireOutlined }from '@ant-design/icons';
import ReactMarkdown from "react-markdown";
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'

import {marked} from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Tocify from '../components/tocify.tsx'

import servicePath from "../config/apiUrl";

Detail.getInitialProps = async(context) => {
    let id = context.query.id
    return await new Promise(resolve => {
        axios(servicePath.getArticleById + id).then(res=> {
            resolve(res.data.data[0])
        })
    })
}

export default function Detail(item) {
    const tocify = new Tocify()
    const renderer = new marked.Renderer()

    renderer.heading = function(text,level, raw) {
        const anchor = tocify.add(text, level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    })
    let html = marked(item.articleContent)

  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
        <Header/>
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                <div className="bread-div">
                    <Breadcrumb>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="detail-title">
                    {item.title}
                </div>
                <div className="list-icon center">
                    <span><CalendarOutlined /> {item.addTime} </span>
                    <span><FolderOutlined /> {item.typeName} </span>
                    <span><FireOutlined /> {item.viewCount}人 </span>
                </div>
                <div className="detail-content" dangerouslySetInnerHTML={{__html:html}}>
                </div>
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author/>
                <Advert/>
                <Affix offsetTop={5}>
                <div className="detail-nav comm-box">
                    <div className="nav-title">文章目录</div>
                    {tocify && tocify.render()}
                </div>
                </Affix>
            </Col>
        </Row>
        <Footer/>
    </div>
  )
}
