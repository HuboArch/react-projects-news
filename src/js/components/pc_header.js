import React from 'react'

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

class PCHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
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
                    userid: json.UserId
                })
            })

        message.success('请求成功')
        this.handleCancel.bind(this)()
    }

    render() {
        let {getFieldDecorator} = this.props.form
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" class="register">
                <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type='dashed' htmlType='button'>个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type='ghost' htmltype="button">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>

        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        {/* Menu */}
                        <Menu
                            onClick={this.handleClick.bind(this)}
                            selectedKeys={[this.state.current]}
                            mode='horizontal'
                        >
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="mail"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="setting"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="setting"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="mail"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        {/* Modal */}
                        <Modal
                            title='用户中心'
                            wrapClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onCancel={this.handleCancel.bind(this)}
                            onOk={this.handleOK.bind(this)}
                            onText=""
                        >
                            <Tabs type="card">
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

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create()(PCHeader)