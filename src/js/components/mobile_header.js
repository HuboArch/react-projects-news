import React from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'

// ant design Form component
import {
    Button,
    Col,
    Checkbox,
    Form,
    Icon,
    Input,
    message,
    Menu,
    Modal,
    Row,
    Tabs
} from 'antd'
import 'antd/dist/antd.css'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileFooter extends React.Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }

    // 记录登录状态
    componentWillMount() {
        if (localStorage.userid) {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            })
        }
    }

    // Nav method
    handleClick(e) {
        /*this.setState({
         current: e.key
         })*/
        if (e.key === 'register') {
            this.state.current = 'register'
            this.setState({
                modalVisible: true
            })
        } else {
            this.setState({
                current: e.key
            })
        }
    }

    // Modal method
    handleCancel() {
        this.setState({
            modalVisible: false
        })
    }

    handleOK() {
        this.setState({
            modalVisible: false
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let myFetchOptions = {
            method: 'GET'
        }
        let formData = this.props.form.getFieldsValue()

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userNickName: json.NickName,
                    userid: json.UserId,
                })
                localStorage.userid = json.UserId
                localStorage.userNickName = json.NickUserName
            })

        if (this.state.action === 'login') {
            this.setState({
                hasLogined: true
            })
        }

        message.success('请求成功')
        this.handleCancel.bind(this)()
    }

    login() {
        this.setState({
            modalVisible: true
        })
    }

    // Tab method
    callback(key) {
        if (key === 1) {
            this.setState({
                action: 'login'
            })
        } else if (key === 2) {
            this.setState({
                action: 'register'
            })
        }
    }

    // 登出
    logout() {
        localStorage.userid = ''
        localStorage.userNickName = ''
        this.setState({
            hasLogined: false
        })
    }

    render() {
        let {getFieldDecorator} = this.props.form
        const userShow = this.state.hasLogined
            ?
            <Link to={'/usercenter'}>
                <Icon type="inbox" onClick={this.logout.bind(this)}/>
            </Link>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>

        return (
            <div id="mobileHeader">
                <header>
                    <a href="/">
                        <img src="./src/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {userShow}
                </header>

                {/* Modal START */}
                <Modal
                    title='用户中心'
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancel.bind(this)}
                    onOk={this.handleOK.bind(this)}
                    onText=""
                >
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label='账户'>
                                    {getFieldDecorator('username')(
                                        <Input placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password')(
                                        <Input type='password' placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <Button type='primary' htmlType='submit'>登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label='账户'>
                                    {getFieldDecorator('r_username')(
                                        <Input placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('r_password')(
                                        <Input type='password' placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem label='账户'>
                                    {getFieldDecorator('r_confirmPassword')(
                                        <Input type='password' placeholder="请确认您输入的密码"/>
                                    )}
                                </FormItem>
                                <Button type='primary' htmlType='submit'>注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
                {/* Model END */}
            </div>
        )
    }
}

export default MobileFooter = Form.create()(MobileFooter)