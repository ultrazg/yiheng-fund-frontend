import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import Navbar from '../../components/Navbar';

import { Card, Spin, Pagination } from 'antd'
import { Link } from "react-router-dom";

const { Meta } = Card

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      loading: true,
      total: 0,
      page: 1,
      disable: true
    }
  }

  componentWillMount() {
    document.getElementById('root').scrollIntoView(true);
  }

  componentDidMount() {
    this.getPageLists()
  }

  getPageLists = () => {

    this.setState({
      loading: true
    })

    fetch(`http://admin.ipoinchina.com/api/article/getNewsContent/毅恒新闻/${this.state.page}`, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {

        if (data.nums == 0) {
          this.setState({
            news: data.list,
            total: data.nums,
            loading: false,
            disable: true
          })
        } else {
          this.setState({
            news: data.list,
            total: data.nums,
            loading: false,
            disable: false
          });
        }
      });
  }

  onChangePage = page => {
    const _this = this

    this.setState({
      page: page,
    }, () => {
      _this.getPageLists()
    });
  }

  render() {
    const meta = {
      title: '国内上市公司专线_科创板注册制试点_毅恒基金公司',
      description: '宣布设立科创板注册制试点到科创板正式开市，中国资本市场迎来了一个全新板块。科创板的制度创新还需要在实践中进一步检验，有一个逐步磨合的过程，这也可能引发一些市场风险。证监会在制度设计时针对风险，尽最大可能予以评估完善，并做好相应预案。',
      meta: {
        name: {
          keywords: '上市公司排名,科创板注册制试点'
        }
      }
    }

    let vdom = (

      this.state.news.map((item, index) => (
        <div className="col-md-3 col-xs-6" key={index}>
          <Link to={'/article/' + item.id}>
            <Card
              hoverable
              width='100%'
              // style={{width: 100%}}
              cover={<img alt="无法显示:(" src={item.logo} />}
            >
              <Meta title={item.title} description={
                <>
                  <p>{item.remark}</p>
                  <p>{item.create_at}</p>
                </>
              } />
            </Card>
          </Link>
        </div>
      ))

    )

    return (
      <div>
        <DocumentMeta {...meta} />

        <Navbar />
        <div className="news-layout container">
          <h3>毅恒新闻{this.state.total == 0 ? '' : `（共 ${this.state.total} 条数据）`}</h3>
          <div className="content row">

            {/*列表循环 start*/}
            {
              this.state.loading ? <Spin /> : (this.state.news.length > 0 ? vdom :
                <span style={{ padding: '10px 0', textAlign: 'center', color: '#cccccc' }}>没有内容</span>)
            }
            {/*列表循环 end*/}

          </div>

          <Pagination
            current={this.state.page}
            total={this.state.total}
            defaultPageSize={12}
            onChange={this.onChangePage}
            className='pull-right'
            disabled={this.state.disable}
          />

        </div>
      </div>
    );
  }
}

export default Index;