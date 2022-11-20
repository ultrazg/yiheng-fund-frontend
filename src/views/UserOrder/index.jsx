import React, {Component} from 'react';

import './index.css';

import Navbar from '../../components/Navbar';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: [
        {
          name: '港股打新5号',
          username: '测试',
          num: '123123123',
          time: '2020-08-11 14:37',
          status: '提交成功',
          link: 'https://www.baidu.com'
        },
        {
          name: '港股打新5号',
          username: '测试',
          num: '123123123',
          time: '2020-08-11 14:37',
          status: '提交成功',
          link: 'https://www.baidu.com'
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="userorder-layout container">
          <h3>全部订单</h3>

          <table className="table">
            <thead>
            <tr>
              <th>基金名称</th>
              <th>用户名</th>
              <th>号码</th>
              <th>购买时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>


            {/*全部交易列表循环 start*/}
            {
              this.state.order.map((item, index) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.num}</td>
                  <td>{item.time}</td>
                  <td>{item.status}</td>
                  <td><a href={item.link}>购买</a></td>
                </tr>
              ))
            }
            {/*全部交易列表循环 end*/}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

export default Index;