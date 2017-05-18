import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_detail';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index';
// import PCUserCenter from './components/pc_usercenter';
// import MobileUserCenter from './components/mobile_usercenter';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                        {/*<Route path="/usercenter" component={PCUserCenter}></Route>*/}
                    </Router>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" component={MobileNewsDetail}></Route>
                        {/*<Route path="/usercenter" component={MobileUserCenter}></Route>*/}
                    </Router>
                </MediaQuery>
            </div>
        );
    };
}
ReactDOM.render(
    <Root/>, document.getElementById('mainContainer'));
