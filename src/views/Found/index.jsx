import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';
import logo from "../../images/logo.png";
// import Cookies from "js-cookie";

import {message} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      new_password: '',
      verifyCode: '',
      isDisabled: true,
      btn_text: '发送短信验证码',
      time: 60
    }
  }

  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }

  changeHandle = e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })

    if (name == 'phone') {
      if (e.target.value.length == 11) {
        this.setState({
          isDisabled: false
        })
      } else {
        this.setState({
          isDisabled: true
        })
      }
    }

  };

  sendMsg = () => {
    const {phone} = this.state
    const _this = this

    //TODO fetch
    fetch('http://admin.ipoinchina.com/api/member.login/goSms', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone]]).toString()
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        if (data.code === 1) {
          message.success(data.msg)
          _this.count()
        } else {
          message.warning(data.msg)
        }
      });

  }

  changePsw = () => {
    const {phone, password, new_password, verifyCode} = this.state

    if (phone == '' || password == '' || new_password == '' || verifyCode == '') {
      message.warning('请填写完整！')

      return;
    }

    if (password != new_password) {
      message.error('两次输入密码不一致！');

      return;
    }

    //TODO fetch
    fetch('http://admin.ipoinchina.com/api/member.login/found', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone], ['new_password', new_password], ['password', password], ['verify', verifyCode]]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data) {

          message.success(data.code, 2, () => {
            window.location.href = '/#/signin'
          })

          // const {id, phone, username, tokenv} = data.data;
          //
          // Cookies.set('yiheng', {
          //   id,
          //   phone,
          //   username,
          //   'Article': tokenv
          // }, {expires: 0.55});

        } else {
          message.error(data.code)
        }
      });
  }

  count = () => {
    let siv = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        btn_text: this.state.time + ` 秒后重新获取`,
        isDisabled: true
      }, () => {
        if (this.state.time == 1) {
          clearInterval(siv);
          this.setState({
            time: 60,
            btn_text: '发送短信验证码',
            isDisabled: false
          })
        }
      });
    }, 1000);
  }

  render() {
    const meta = {
      title: '找回密码-毅恒基金'
    }

    return (
      <div>
        <DocumentMeta {...meta} />
        <div className="found-layout">

          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img className='nav-logo' alt="Logo" src={logo}/>
                </a>
              </div>
            </div>
          </nav>

          <div className="content container">
            <div className="box">
              <p>找回毅恒账户</p>
              <hr/>

              <div className='form'>

                <div className="form-group">
                  <label>手机号</label>
                  <input name='phone' value={this.state.phone} onChange={this.changeHandle}
                         className="form-control" placeholder="必填"/>
                </div>

                <div className="form-group">
                  <label>新密码</label>
                  <input type="password" name='password' value={this.state.password}
                         onChange={this.changeHandle} className="form-control" placeholder="必填"/>
                </div>

                <div className="form-group">
                  <label>确认密码</label>
                  <input type="password" name='new_password' value={this.state.new_password}
                         onChange={this.changeHandle}
                         className="form-control" placeholder="必填"/>
                </div>

                <div className="form-group">
                  <label>手机验证码</label>
                  <input name='verifyCode' value={this.state.verifyCode} onChange={this.changeHandle}
                         className="form-control" placeholder="必填"/>
                </div>

                <br/>

                <button type="button" className="btn btn-default verBtn" disabled={this.state.isDisabled}
                        onClick={this.sendMsg}>{this.state.btn_text}</button>

                <button type="button" className="btn btn-default changeBtn" onClick={this.changePsw}>确认修改</button>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Index;