import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile-footer'

export default class MobileIndex extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>
                <MobileFooter/>
            </div>
        )
    }
}