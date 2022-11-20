import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import { Card, Spin, Pagination } from 'antd'

const { Meta } = Card

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      page: 1,
      total: 0,
      loading: true,
      disable: true
    }
  }

  componentWillMount() {
    document.getElementById('root').scrollIntoView(true);
  }

  componentDidMount() {
    // fetch('http://admin.ipoinchina.com/api/article/getNewsContent/行业新闻/1', {
    //   headers: new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     // console.log(data);
    //     this.setState({
    //       news: data.list,
    //       total: Math.ceil(data.nums / 12),
    //       loading: false
    //     }, () => {
    //       console.log(this.state.total)
    //     });
    //   });

    this.getPageLists()

  }

  getPageLists = () => {

    this.setState({
      loading: true
    })

    fetch(`http://admin.ipoinchina.com/api/article/getNewsContent/行业新闻/${this.state.page}`, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);

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
    // console.log(page);

    const _this = this

    this.setState({
      page: page,
    }, () => {
      _this.getPageLists()
    });
  }

  render() {
    const meta = {
      title: '创业板注册制改革_中国上市公司排名_毅恒基金公司',
      description: '毅恒基金公司针对创业板注册制改革,专门对金融市场行业进行了数据宏观分析,利率市场,债券分析等外汇行业相关内容作出了详细的概括.',
      meta: {
        name: {
          keywords: '创业板注册打新,中国上市公司数量'
        }
      }
    }

    let vdom = (
      this.state.news.map((item, index) => (
        <div className="col-md-3 col-xs-6" key={index}>
          <Link to={'/article/' + item.id}>
            <Card
              hoverable
              style={{
                width: '100%',
              }}
              cover={<img alt="无法显示:(" src={item.logo} />}
            >
              <Meta title={item.title} description={
                <>
                  {/*<p>{item.remark}</p>*/}
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
          <h3>行业新闻{this.state.total == 0 ? '' : `（共 ${this.state.total} 条数据）`}</h3>
          <div className="content row">

            {/*列表循环 start*/}
            {
              this.state.loading ? <Spin /> : (this.state.news.length > 0 ? vdom :
                <span style={{padding: '10px 0', textAlign: 'center' , color: '#cccccc'}}>没有内容</span>)
            }
            {/*列表循环 end*/}

          </div>

          <Pagination
            current={this.state.page}
            total={this.state.total}
            defaultPageSize={12}
            className="pull-right"
            onChange={this.onChangePage}
            disabled={this.state.disable}
          />

        </div>
      </div>
    );
  }
}

export default Index;