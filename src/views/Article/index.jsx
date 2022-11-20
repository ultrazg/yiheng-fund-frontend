import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';


import './index.css';
import Navbar from '../../components/Navbar';

import {Spin} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article_id: this.props.match.params.id,
      article_title: '',
      article_remark: '',
      article_create_at: '',
      article_content: '',
      loading: true,
    }
  }

  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }

  componentDidMount() {
    // 获取文章详情
    let articleUrl = `http://admin.ipoinchina.com/api/article/ArticleDetails/${this.state.article_id}`

    fetch(articleUrl, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.content);
        this.setState({
          loading: false,
          article_title: data.title,
          article_create_at: data.create_at,
          article_content: data.content
        });
      });
  }

  render() {
    let articleVDOM = (
      <>
        <div className='article-info'>
          <p>{this.state.article_title}</p>
          <p>{this.state.article_create_at}</p>
        </div>
        <div
          className='article-content'
          dangerouslySetInnerHTML={{__html: this.state.article_content}}
        ></div>
      </>
    );

    return (
      <div>

        <Navbar/>

        <div className="article-layout container">

          {this.state.loading ? <Spin tip='拼命加载中...'/> : articleVDOM}

        </div>

      </div>
    );
  }
}

export default Index;