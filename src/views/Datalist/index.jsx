import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      fund_class: '',
      fund_price: '',
      decription: '',
      target_source: '',
      group_num: ''
    }
  }

  changeHandle = e => {
    const name = e.target.name

    this.setState({
      [name]: e.target.value
    })
  }

  submit = () => {
    //TODO...
    const name = this.state.name
    const phone = this.state.phone
    const fund_class = this.state.fund_class
    const fund_price = this.state.fund_price
    const decription = this.state.decription
    const target_source = this.state.target_source
    const group = this.state.group_num

    fetch('http://admin.ipoinchina.com/fund_Cutomer/indata', {
      method: 'POST',
      body: {
        name,
        phone,
        fund_class,
        fund_price,
        decription,
        target_source,
        group
      }
    }).then(res => {
      if (res.status === 200) {
        alert(res.statusText)
      }
    })

  }

  render() {
    return (
      <div>
        <div className="datalist-layout">
          <div className="content container">
            <h3>数据跟进表</h3>
            <hr />

            <div className="form-group">
              <label>姓名：</label>
              <input type="string" name='name' value={this.state.name} onChange={this.changeHandle} className="form-control name" />
            </div>
            <div className="form-group">
              <label>电话：</label>
              <input type="string" name='phone' onChange={this.changeHandle} value={this.state.phone} className="form-control phone" />
            </div>
            <div className="form-group">
              <label>过往投资类别：</label>
              <input type="string" name='fund_class' onChange={this.changeHandle} value={this.state.fund_class} className="form-control fundclass" />
            </div>
            <div className="form-group">
              <label>盘面金额：</label>
              <input type="string" name='fund_price' onChange={this.changeHandle} value={this.state.fund_price} className="form-control price" />
            </div>
            <div className="form-group">
              <label>备注：</label>
              <textarea className="form-control decription" name='decription' rows="3" onChange={this.changeHandle} value={this.state.decription}></textarea>
            </div>
            <div className="form-group">
              <label>客户来源：</label>
              <input className="form-control target" name='target_source' onChange={this.changeHandle} value={this.state.target_source} />
            </div>
            <div className="form-group">
              <label>所在小组：</label>
              <select className="form-control group" onChange={this.changeHandle} name='group_num' value={this.state.group_num}>
                <option value="1">业务组1</option>
                <option value="2">业务组2</option>
                <option value="3">业务组3</option>
                <option value="4">业务组4</option>
                <option value="5">业务组5</option>
              </select>
            </div>
            <button className="container btn btn-success subbtn" onClick={this.submit}>提交</button>

          </div>
        </div>
      </div>
    );
  }
}

export default index;
