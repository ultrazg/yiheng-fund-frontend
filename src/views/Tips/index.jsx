import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

class index extends Component {

  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }
  //创建定时器
  componentDidMount() {
    this.timer = setTimeout(
      ()=>{window.location.href = '/#/signin'},
      2000
    );
  }

  //生命周期 组件销毁 清除定时器
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const meta = {
      title: '提示信息'
    }

    return (
      <div>
        <DocumentMeta {...meta} />

        <div className="tips-layout">
          <p><i className='glyphicon glyphicon-remove-circle'></i></p>
          <p>对不起，请先登录！</p>
          <p>将在 3 秒后跳转</p>
        </div>
      </div>
    );
  }
}

export default index;
