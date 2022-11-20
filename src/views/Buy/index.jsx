import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import Navber from '../../components/Navbar';

import './index.css';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import Tips from "../Tips";

import {Modal, Button, message, Spin} from 'antd';

message.config({
  top: 70
})

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fund_name: this.props.location.state.n,
      user_name: '',
      phone: '',
      user_id: '',
      idcard: '',
      price: '',
      order_id: '',
      tradingCode: '',
      codeimg: '',
      token: '',
      checkTarget: 0,
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,

      contract: '',
      count_img: '',
      desc_video: '',
      source_img: '',
      source_name: '',
      desc_video_name: '',
      count_name: '',
      contract_name: '',

      visible: false,
      modal_title: '',
      modal_button: '',
      modal_content: '',

      countData: [],
      spinning: true
    }
  }

  changeHandle = e => {
    const {name, value} = e.target

    this.setState({
      [name]: value
    })

  }

  getRandomOrder = () => {
    let date = new Date()
    let YY = date.getFullYear()
    let mm = date.getMonth() + 1
    let dd = date.getDate()

    if (mm < 10) {
      mm = `0${mm}`
    }

    if (dd < 10) {
      dd = `0${mm}`
    }

    let random = Math.floor(Math.random() * 999)

    if (random < 10) {
      random = `0${random}`
    }

    let order_id = `${YY}${mm}${dd}${random}`

    this.setState({
      order_id
    })
  }

  onFile = e => {
    const file = e.target.files[0];
    const fr = new FileReader();

    fr.readAsDataURL(file);

    let fileContent = null;

    fr.onload = () => {
      fileContent = fr.result;
    };

    setTimeout(() => {
      this.setState({
        codeimg: fileContent
      });
    }, 500);
  }

  go = () => {

    const {fund_name, user_name, user_id, phone, price, idcard, tradingCode, codeimg, order_id} = this.state;

    if (fund_name == '' || user_name == '' || phone == '' || price == '' || idcard == '') {
      message.warning('请完善信息！')

      return
    }

    if (!this.state.isChecked1 || !this.state.isChecked2 || !this.state.isChecked3 || !this.state.isChecked4) {
      message.error('请仔细阅读并勾选条款')

      return
    }

    if (codeimg == '' && tradingCode == '') {
      message.warning('请上传交易截图或者填写银行回单号！')

      return
    }

    fetch('http://admin.ipoinchina.com/api/fund_data/tobuyfund', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.state.token,
      }),
      mode: 'cors',
      method: 'POST',
      body: new URLSearchParams([
        ['phone', phone],
        ['fund_name', fund_name],
        ['user_name', user_name],
        ['user_id', user_id],
        ['price', price],
        ['idcard', idcard],
        ['tradingCode', tradingCode],
        ['codeimg', codeimg],
        ['order_id', order_id]
      ]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        if (data.status == 200) {
          message.success(data.msg, 1).then(
            () => {
              window.location.href = '/#/user'
            }
          )

        } else {
          message.error(data.info)
        }
      });
  }

  handleCancel = e => {
    const c = this.state.checkTarget

    this.setState({
      visible: false,
    });

    if (c == 1) {
      this.setState({
        isChecked1: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else if (c == 2) {
      this.setState({
        isChecked2: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else if (c == 3) {
      this.setState({
        isChecked3: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else {
      this.setState({
        isChecked4: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    }
  };

  openModalByType(type) {
    if (type == 1) {
      this.setState({
        modal_title: this.state.source_name,
        modal_button: '我已阅读基金交易要素表',
        visible: true,
        checkTarget: type,
        modal_content: `<img style="display:block;width:100%;" src='${this.state.source_img}'></img>`
        // modal_content: '<Image width="100%" src={this.state.source_img}/>'
        //modal_content: `<object data="${this.state.source_img}" type="application/pdf" width="600" height="200"></object>`
      })
    } else if (type == 2) {
      this.setState({
        modal_title: this.state.desc_video_name,
        modal_button: '我已阅读基金募集说明',
        visible: true,
        checkTarget: type,
        modal_content: `<video style="display: block;width: 100%" autoplay controls src='${this.state.desc_video}'></video>`
      })
    } else if (type == 3) {
      this.setState({
        modal_title: this.state.contract_name,
        modal_button: '我已阅读基金合同',
        visible: true,
        checkTarget: type,
        modal_content: `<object data='${this.state.contract}' type="application/pdf" width="100%" height="600px"></object>`
      })
    } else {
      this.setState({
        modal_title: this.state.count_name,
        modal_button: '我已阅读基金募集账户',
        visible: true,
        checkTarget: type,
        modal_content: `<img style="display:block;width:100%;" src='${this.state.count_img}'></img>`
      })
    }
  }

  modalCancel = () => {
    this.setState({
      visible: false,
      modal_content: ''
    });
  }

  checkHandle = e => {
    this.setState({
      [e.target.name]: true
    })
  }

  componentDidMount() {
    let token, id

    const that = this

    this.getRandomOrder()

    if (Cookies.get('yiheng')) {
      let data = JSON.parse(Cookies.get('yiheng'));
      let username = data.username;
      id = data.id;
      let phone = data.phone;
      token = data.t

      this.setState({
        user_name: username,
        user_id: id,
        phone: phone,
        token: token
      })

      fetch(`http://admin.ipoinchina.com/api/fund_data/toFundDetail/${this.props.location.state.id}`, {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,
        }),
        mode: 'cors',
        method: 'POST',
        body: new URLSearchParams([
          ['user_id', id],
        ]).toString()
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let {contract, count_img, desc_video, source_img, source_name, desc_video_name, count_name, contract_name} = data.list
          let countData = data.countData

          that.setState({
            contract,
            count_img,
            desc_video,
            source_img,
            source_name,
            desc_video_name,
            count_name,
            contract_name,
            countData,
            spinning: false
          })

        });
    }
  }

  render() {
    if (!Cookies.get('yiheng')) {
      return (
        <Tips/>
      )
    }

    return (
      <div>
        <Navber/>
        <div className="buy-layout">

          <div className="backgroundImg">
            <h3 className='container'>产品认购</h3>
          </div>

          <div className="content container">
            <h4>请确认购买信息</h4>
            <Spin spinning={this.state.spinning}>
              <table className="table table-bordered">

                <tbody>
                <tr>
                  <td>产品编号</td>
                  <td>{this.props.location.state.id}</td>
                </tr>
                <tr>
                  <td>产品名称</td>
                  <td>{this.state.fund_name}</td>
                </tr>
                <tr>
                  <td>姓名</td>
                  <td><input type="text" name='user_name' onChange={this.changeHandle} placeholder='必填'
                             value={this.state.user_name}/></td>
                </tr>
                <tr>
                  <td>身份证号码</td>
                  <td><input type="text" name='idcard' onChange={this.changeHandle} placeholder='必填'
                             value={this.state.idcard}/></td>
                </tr>
                <tr>
                  <td>认购金额</td>
                  <td><input type="text" name='price' onChange={this.changeHandle} placeholder='必填，单位：元'
                             value={this.state.price}/></td>
                </tr>
                <tr>
                  <td>联系电话</td>
                  <td><input type="text" name='phone' onChange={this.changeHandle} placeholder='必填'
                             value={this.state.phone}/></td>
                </tr>
                <tr>
                  <td>订单号</td>
                  <td>{this.state.order_id}</td>
                </tr>
                <tr>
                  <td>基金要素表</td>
                  <td>
                    <input type="checkbox" name='isChecked1' onChange={this.changeHandle}
                           checked={this.state.isChecked1}/>&nbsp;我已阅读并同意
                    <button className="btn btn-link"
                            onClick={() => this.openModalByType(1)}>《{this.props.location.state.n}基金交易要素表》</button>
                  </td>
                </tr>
                <tr>
                  <td>募集说明</td>
                  <td>
                    <input type="checkbox" name='isChecked2' onChange={this.changeHandle}
                           checked={this.state.isChecked2}/>&nbsp;我已阅读并同意
                    <button className="btn btn-link"
                            onClick={() => this.openModalByType(2)}>《{this.props.location.state.n}基金募集说明》</button>
                  </td>
                </tr>
                <tr>
                  <td>基金合同</td>
                  <td>
                    <input type="checkbox" name='isChecked3' onChange={this.changeHandle}
                           checked={this.state.isChecked3}/>&nbsp;我已阅读并同意
                    <button className="btn btn-link"
                            onClick={() => this.openModalByType(3)}>《{this.props.location.state.n}基金合同》</button>
                  </td>
                </tr>
                <tr>
                  <td>基金募集账户</td>
                  <td>
                    <input type="checkbox" name='isChecked4' onChange={this.changeHandle}
                           checked={this.state.isChecked4}/>&nbsp;我已确认打款
                    <button className="btn btn-link"
                            onClick={() => this.openModalByType(4)}>《{this.props.location.state.n}基金募集账户》</button>
                  </td>
                </tr>
                <tr>
                  <td>上传打款凭证或填写银行回单号</td>
                  <td>
                    <label>
                      <input type="file" name='codeimg' onChange={this.onFile} accept="image/*"/>
                    </label>
                    或&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" name='tradingCode' value={this.state.tradingCode} onChange={this.changeHandle}
                           placeholder='交易回单号'/>
                  </td>
                </tr>
                {
                  this.state.countData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.count_key}</td>
                      <td dangerouslySetInnerHTML={{__html: item.count_value}}></td>
                    </tr>
                  ))
                }
                </tbody>

              </table>

              <button type="button" className="btn btn-default submitBtn" onClick={this.go}>提交</button>
            </Spin>
          </div>

        </div>
        {/*modal start*/}
        <Modal
          title={this.state.modal_title}
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.modalCancel}
          cancelText={null}
          // okText='确定'
          width='800px'
          centered
          footer={[
            <Button type="primary" onClick={this.handleCancel}>{this.state.modal_button}</Button>
          ]}
        >
          <div style={{width: '100%', height: '100%'}}
               dangerouslySetInnerHTML={{__html: this.state.modal_content}}></div>
        </Modal>
        {/*modal end*/}
      </div>

    );
  }
}

export default index;
