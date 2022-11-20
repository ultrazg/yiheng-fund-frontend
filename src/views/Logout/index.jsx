import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import Cookies from 'js-cookie';

import './index.css';

class Index extends Component {
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
      title: '注销登录-毅恒基金'
    }

    Cookies.remove('yiheng');

    return (
      <div>
        <DocumentMeta {...meta} />

        <div className="logout-layout">
          <p><i className='glyphicon glyphicon-ok-circle'></i></p>
          <p>账号退出成功！</p>
          <p>将在 3 秒后跳转</p>
        </div>
      </div>
    );
  }
}

export default Index;