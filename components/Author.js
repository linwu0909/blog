import {Avatar, Divider} from "antd";
import { WechatOutlined, QqOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} icon={<UserOutlined/>}/></div>
            <div className="author-introduction">
                自我介绍
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"/>
                <Avatar size={28} icon={<QqOutlined />} className="account"/>
                <Avatar size={28} icon={<WechatOutlined />} className="account"/>
            </div>
        </div>
    )
}

export default Author;
