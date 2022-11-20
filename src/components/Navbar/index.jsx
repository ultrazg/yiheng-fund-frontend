import React, { Component } from 'react';
import './index.css';

import logo from '../../images/logo.png';

import { Link } from "react-router-dom";

import Cookies from 'js-cookie';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isLogin: null,
      username: ''
    }
  }

  handleChange = e => {
    let i = e.target.value

    this.setState({ value: i })

    if (i == 'about') {
      alert('🎉powered by unknown🎈');
    } else if (i == 'version') {
      alert('Version : 201115\n' +
        'Last update time : 2020-11-15 3:02\n' +
        'Update content : \n' +
        '1、添加对移动设备的兼容\n')
    }
  }

  componentDidMount() {
    if (Cookies.get('yiheng')) {
      let data = JSON.parse(Cookies.get('yiheng'));
      let username = data.username;

      this.setState({
        username: username,
        isLogin: true
      })
    } else {
      this.setState({
        isLogin: false,
      })
    }
  }

  render() {
    let vdom;

    if (this.state.isLogin) {
      // vdom = <li className='login-username'><p>{this.state.username}&nbsp;&nbsp;<Link to='/user'>个人中心</Link>&nbsp;&nbsp;<Link
      //   to='/logout'>退出登录</Link></p></li>
      vdom = <><li className='login-username'><p style={{ fontWeight: '600' }}>{this.state.username}</p></li><li><Link to='/user'><i className='fa fa-user' style={{ marginRight: '5px' }}></i>个人中心</Link></li><li><Link
        to='/logout' style={{ color: 'lightpink' }}><i className="fa fa-sign-out" style={{ marginRight: '5px' }}></i>登出</Link></li></>
    } else {
      vdom =
        <>
          <li><Link to='/signin'>登录</Link></li>
          <li><Link className='signup' to='/register'>注册</Link></li>
        </>
    }

    return (
      <div>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                <img className='nav-logo' src={logo} alt="" />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" value={this.state.value} onChange={this.handleChange}
                    className="navbar-search form-control" placeholder="搜索" />
                </div>
                <Link to='/faq' className="navbar-searchbtn btn btn-default"><i
                  className='glyphicon glyphicon-search'></i></Link>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='/'>首页</Link></li>
                <li><Link to='/about'>关于我们</Link></li>
                <li><Link to='/chaoshi'>基金超市</Link></li>
                {/*<li><Link to='/news'>资讯中心</Link></li>*/}
                <li><Link to='/contactus'>联系我们</Link></li>

                {vdom}

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
