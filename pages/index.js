import {useState} from "react";
import Head from 'next/head'
import {Row, Col, Menu, Icon, List} from 'antd'
import axios from "axios";
import Link from 'next/link'
import Header from '../components/Header'
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import {CalendarOutlined, FireOutlined, FolderOutlined} from "@ant-design/icons";
import servicePath from "../config/apiUrl";

Home.getInitialProps = async ()=> {
    return await new Promise(resolve => {
        axios(servicePath.getArticleList).then(res => {
            resolve(res.data)
        })
    })
}

export default function Home(list) {
  const [myList,setMyList] = useState(list.data)

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
        <Header/>
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                <List
                    header={<div>最新日志</div>}
                    itemLayout="vertical"
                    dataSource={myList}
                    renderItem={item=> (
                        <List.Item>
                            <div className="list-title"><Link href={{pathname: '/detail', query: {id: item.id}}}><a>{item.title}</a></Link></div>
                            <div className="list-icon">
                                <span><CalendarOutlined />{item.addTime}</span>
                                <span><FolderOutlined /> {item.typeName} </span>
                                <span><FireOutlined /> {item.viewCount}人 </span>
                            </div>
                            <div className="list-context">{item.introduce}</div>
                        </List.Item>
                    )}
                >
                </List>
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author/>
                <Advert />
            </Col>
        </Row>
        <Footer/>
    </div>
  )
}
