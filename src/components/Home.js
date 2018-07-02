/*
 * Created by jemo on 2018-6-26.
 * 主页
 */

import React, { Component } from 'react';
import SiderMenu from './SiderMenu';
import { getMenuData } from '../common/menu';
//import 'ant-design-pro/dist/ant-design-pro.css'; 
import 'antd/dist/antd.css';
import logo from '../assets/logo.svg';
import Gallery from './Gallery';

class Home extends Component {
  render() {
    //console.log('this.props: ', this.props);
    const { location } = this.props;
    return(
      <div
        style={{
          display: 'flex',
        }}>
        <SiderMenu
          logo={logo}
          menuData={getMenuData()}
          location={location}
        />
        <Gallery />
      </div>
    );
  }
}

export default Home;
