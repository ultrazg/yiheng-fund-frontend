import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import pic from '../../images/404.jpg';

class index extends Component {

  //创建定时器
  componentDidMount() {
    this.timer = setTimeout(
      ()=>{window.location.href = '/#/'},
      2000
    );
  }

  //生命周期 组件销毁 清除定时器
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const meta = {
      title: '404'
    }

    return (
      <div>
        <DocumentMeta {...meta} />

        <div className="notfound-layout">
          {/*<p><i className='glyphicon glyphicon-remove-circle'></i></p>*/}
          <p></p>
          <p>对不起，你请求的页面不存在！</p>
          <p>将在 3 秒后跳转</p>
        </div>
      </div>
    );
  }
}

export default index;
