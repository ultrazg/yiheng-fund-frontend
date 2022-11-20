import React, {Component} from 'react';

import './index.css';

import logo from '../../images/logo.png';
import {Link} from "react-router-dom";

import gzh from '../../images/wechat_qrcode.jpg';
import wx from '../../images/wechat_qrcode.png';

import {Popover} from 'antd';

const weixin = (
  <div>
    <div className='weixin'>
      <img className='img-responsive' src={gzh} alt=""/>
      <img className='img-responsive' src={wx} alt=""/>
    </div>
    <div className='weixin_text'>
      <span>微信公众号</span>
      <span>微信客服</span>
    </div>
  </div>
)

const tell = (
  <div className='tell'>
    <p><i className='glyphicon glyphicon-earphone'></i>15818105420</p>
  </div>
)

class Index extends Component {

  call = () => {
    window.location.href = 'tel:15818105420';
  }

  render() {

    return (
      <div className='footer-layout'>
        <div className="container">
          <div className="list col-xs-6 col-sm-3">
            <a href="/">
              <img src={logo} alt=""/>
            </a>
          </div>
          <div className="list col-xs-6 col-sm-3">
            <ul>
              <li><strong>产品认购</strong></li>
              <li>
                <Link to='/chaoshi'>基金超市</Link>
              </li>
            </ul>
          </div>

          <div className="clearfix visible-xs-block"></div>

          <div className="list col-xs-6 col-sm-3">
            <ul>
              <li>
                <strong>资讯中心</strong>
              </li>
              <li>
                <Link to='/news'>行业新闻</Link>
              </li>
              <li>
                <Link to='/yhnews'>毅恒新闻</Link>
              </li>
              <li>
                <Link to='/faq'>常见问题</Link>
              </li>
            </ul>
          </div>
          <div className="list col-xs-6 col-sm-3">
            <ul>
              <li>
                <strong>关于我们</strong>
              </li>
              <li>
                <Link to='/about'>关于毅恒</Link>
              </li>
              <li>
                <Link to='/contactus'>联系我们</Link>
              </li>
              {/*<li>*/}
              {/*  <Link to='/ourteam'>我们的团队</Link>*/}
              {/*</li>*/}
            </ul>
          </div>
        </div>

        <div className="info container">
          <div className="icons">

            <span>
              <Popover content={weixin}>
                <i className="fa fa-weixin"></i>
              </Popover>

              <Popover content={tell}>
              <i onClick={this.call} title='点击拨打' className="fa fa-phone"></i>
              </Popover>

            </span>

          </div>

          <Link to='/risk'>风险揭示书 </Link><label>|</label>
          <Link to='/privacy'> 隐私条款 </Link><label>|</label>
          <Link to='/complaint'> 投诉建议</Link>
        </div>

        <div className="copyright container">
          <p>备案号：<a href='https://beian.miit.gov.cn/#/Integrated/index' target='_blank'>粤ICP备20052211号-1</a></p>
          <p>投资有风险&nbsp;&nbsp;入市需谨慎</p>
          <p>版权所有 © 2006-2020 毅恒宏观机会基金有限公司</p>
        </div>
      </div>
    );
  }
}

export default Index;