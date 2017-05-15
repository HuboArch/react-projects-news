import React from 'react'
import {Row, Col} from 'antd'

export default class PCHeader extends React.Component {
    render() {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>react news</span>
                        </a>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}