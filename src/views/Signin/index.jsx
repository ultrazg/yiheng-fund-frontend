import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import logo from '../../images/logo.png';

import {Link} from 'react-router-dom';

import Cookies from 'js-cookie';

import {message, Image} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      captcha_text: '',
      // captcha_url: 'http://192.168.1.8:801/api/member.login/captcha',
      captcha_url: 'http://admin.ipoinchina.com/api/member.login/captcha',
      captcha_img: '',
      uniqid: '',
      button_text: '登录'
    }
  }

  changeHandle = e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  go = () => {
    const phone = this.state.phone;
    const password = this.state.password;
    const captcha_text = this.state.captcha_text;
    const uniqid = this.state.uniqid;

    const _this = this

    if (phone == '' || password == '' || captcha_text == '') {
      message.warning('请填写完整');

      return;
    } else {
      // TODO
      // console.log(username, password)
      fetch('http://admin.ipoinchina.com/api/member.login/in', {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        method: 'POST',
        body: new URLSearchParams([['phone', phone], ['password', password], ['uniqid', uniqid], ['verify', captcha_text]]).toString()
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          _this.setState({
            button_text: '正在请求...'
          })

          if (data.data) {
            const {id, phone, username, tokenv} = data.data;

            Cookies.set('yiheng', {
              id,
              phone,
              username,
              't': tokenv
            }, {expires: 0.55});

            window.location.href = '/';
          } else {
            message.error(data.code)
            _this.setState({
              button_text: '登录'
            })
            _this.changeCap()
            // window.location.reload();
          }
        });
    }
  }

  onEnterGo = e =>{
    if(e.keyCode === 13){
      this.go()
    }
  }

  changeCap = () => {
    fetch(this.state.captcha_url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const image = data.data.image;
        const uniqid = data.data.uniqid;

        this.setState({
          captcha_img: image,
          uniqid
        })
      });
  }

  componentDidMount() {
    fetch(this.state.captcha_url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const image = data.data.image;
        const uniqid = data.data.uniqid;

        this.setState({
          captcha_img: image,
          uniqid
        })
      });
  }


  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }

  render() {
    const meta = {
      title: '登录账户-毅恒基金'
    }

    return (
      <div>
        <DocumentMeta {...meta} />

        <div className="signin-layout">
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img className='nav-logo' alt="Logo" src={logo}/>
                </a>
              </div>
            </div>
          </nav>

          <div className="signin-content container">
            <div className="box">
              <p>登录毅恒账户</p>
              <hr/>

              <div className='form'>

                <div className="form-group">
                  <label>手机号</label>
                  <input name='phone' className="form-control" placeholder="必填"
                         value={this.state.phone} onChange={this.changeHandle}/>
                </div>

                <div className="form-group">
                  <label>登陆密码</label>
                  <input type="password" name='password' className="form-control" placeholder="必填"
                         value={this.state.password} onChange={this.changeHandle}/>
                </div>

                <div className="form-group">
                  <label>验证码</label>
                  <input
                    name='captcha_text'
                    className="form-control"
                    placeholder="必填，不区分大小写"
                    value={this.state.captcha_text}
                    onChange={this.changeHandle}
                    onKeyUp={this.onEnterGo}
                  />
                  <br/>
                  <img src={this.state.captcha_img} alt="" onClick={this.changeCap}/>
                  <br/>
                  <button type="button" className="btn btn-link getPhoneVer" onClick={this.changeCap}>看不清，换一张</button>
                </div>

                <span><Link to='/register'>注册账号</Link>&nbsp;<label>|</label>&nbsp;<Link
                  to='/found'>找回密码</Link></span><br/><br/>

                <button
                  type="button"
                  className="btn btn-default signBtn"
                  onClick={this.go}
                >{this.state.button_text}</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;