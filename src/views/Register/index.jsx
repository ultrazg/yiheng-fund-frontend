import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import logo from '../../images/logo.png';

import {Link} from 'react-router-dom';

import {message} from 'antd';

import Cookies from 'js-cookie';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      phone: '',
      password: '',
      verifyCode: '',
      isChecked: false,
      isDisabled: true,
      btn_text: '获取验证码',
      time: 60
    }
  }

  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }

  submit = () => {
    const {username, phone, password, verifyCode} = this.state
    const _this = this;

    if (!this.state.isChecked) {
      message.warning('请仔细阅读并勾选《毅恒基金服务协议》');

      return;
    }

    if (username == '' || phone == '' || password == '' || verifyCode == '') {
      message.warning('请填写完整！');

      return;
    }

    fetch('http://admin.ipoinchina.com/api/member.login/register', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone], ['password', password], ['username', username], ['verify', verifyCode]]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data) {
          message.success(data.code)

          const {id, phone, username, tokenv} = data.data;

          Cookies.set('yiheng', {
            id,
            phone,
            username,
            't': tokenv
          }, {expires: 0.55});

          window.location.href = '/'

        } else {

          message.warning(data.code)

        }
      });

  }

  onchangeHandle = e => {
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

  }

  checkHandle = () => {
    this.setState({isChecked: !this.state.isChecked})
  }

  checkTrue = () => {
    this.setState({isChecked: true})
  }

  getVerCode = () => {
    const phone = this.state.phone;
    const _this = this;

    fetch('http://admin.ipoinchina.com/api/member.login/goSms', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone]]).toString()
    })
      .then(function (response) {
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

  count = () => {
    let siv = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        btn_text: this.state.time + `秒`,
        isDisabled: true
      }, () => {
        if (this.state.time == 1) {
          clearInterval(siv);
          this.setState({
            time: 60,
            btn_text: '获取验证码',
            isDisabled: false
          })
        }
      });
    }, 1000);
  }

  render() {
    const meta = {
      title: '注册账户-毅恒基金'
    }

    return (
      <div>
        <DocumentMeta {...meta} />

        <div className="register-layout">

          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img className='nav-logo' alt="Logo" src={logo}/>
                </a>
              </div>
            </div>
          </nav>

          <div className="reg-content container">
            <div className="box">
              <p>欢 迎</p>
              <p>注册毅恒账户</p>
              <hr/>

              <div className='form'>
                <div className="form-group">
                  <label>姓名</label>
                  <input name='username' value={this.state.username} onChange={this.onchangeHandle}
                         className="form-control" placeholder="必填，仅支持中文"/>
                </div>
                <div className="form-group">
                  <label>手机号</label>
                  <input type="string" name='phone' value={this.state.phone} onChange={this.onchangeHandle}
                         className="form-control"
                         placeholder="必填"/>
                </div>
                <div className="form-group">
                  <label>手机验证码</label>
                  <input name='verifyCode' value={this.state.verifyCode} onChange={this.onchangeHandle}
                         className="form-control"
                         placeholder="必填"/>
                  <button type="button" className="btn btn-link getPhoneVer" onClick={this.getVerCode}
                          disabled={this.state.isDisabled}>{this.state.btn_text}</button>
                </div>
                <div className="form-group">
                  <label>登陆密码</label>
                  <input type="password" name='password' value={this.state.password} onChange={this.onchangeHandle}
                         className="form-control"
                         placeholder="必填，包含英文和数字"/>
                </div>
                {/* <div className="form-group">
                  <label>验证码</label>
                  <input type="email" className="form-control phoneInput" placeholder="必填"/>
                </div> */}
                <input type="checkbox" checked={this.state.isChecked} onChange={this.checkHandle}/>我已阅读且同意
                <button type="button" className="btn btn-link" data-toggle="modal" data-target="#myModal">《毅恒基金服务协议》
                </button><br/><br/>
                <span>已有账号？</span><Link to='/signin'>立即登陆</Link><br/><br/>
                <button type="button" className="btn btn-primary regBtn" onClick={this.submit}>注册</button>
              </div>

              {/*Modal start*/}
              <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span*/}
                      {/*  aria-hidden="true">&times;</span></button>*/}
                      <h4 className="modal-title" id="myModalLabel">毅恒基金服务协议</h4>
                    </div>
                    <div className="modal-body">

                      <p>毅恒基金谨遵基金协会的《私募投资基金募集行为管理办法》之规定，只向特定的合格投资者宣传推介私募投资基金产品。</p>

                      <p>阁下如有进行私募投资基金投资，请承诺符合中国证监会规定的私募基金合格投资者的条件。即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且符合下列相关标准之一：</p>

                      <p>一、我承诺符合金融类资产部低于300万元（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）;</p>

                      <p>二、我承诺符合最近三年个人平均收入不低于50万人民币。</p>


                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal"
                              onClick={this.checkTrue}>我已阅读并同意上述条款
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/*Modal end*/}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Index;