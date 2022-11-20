import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import Navbar from '../../components/Navbar';

import {Link} from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funds1: new Array,
    }
  }

  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/fund_data/getFundList')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(Object.entries(data));
        this.setState({funds1: Object.entries(data)});
        // console.log(this.state.funds1)

      });

    // console.log(document.cookie)
  }

  render() {
    const meta = {
      title: '深港通交易规则_港股打新怎么开户_毅恒基金官网',
      description: '毅恒基金公司帮助客户了解港股打新开户的规则通过宏观趋势判断、策略研究以及实地调研，财务与会计信息、管理层讨论与分析、审视每一个投资标的基本面及投资潜力，力求为投资者提供长期而稳定的投资收益。',
      meta: {
        name: {
          keywords: '深港通股票,港股打新规则,深港通交易'
        }
      }
    }

    let vdom1

    if (this.state.funds1.length == 0) {
      vdom1 = (
        <>
          {/*<p className="title">IPO打新基金</p>*/}
          <div className='loading'>
            <svg className="icon"
                 style={{
                   'width': '1.5em',
                   'height': '1.5em',
                   'verticalAlign': 'middle',
                   'fill': 'currentColor',
                   'overflow': 'hidden',
                   'color': '#747d8c'
                 }}
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="861">
              <path
                d="M843.307 742.24c0 3.217 2.607 5.824 5.824 5.824s5.824-2.607 5.824-5.824a5.823 5.823 0 0 0-5.824-5.824 5.823 5.823 0 0 0-5.824 5.824zM714.731 874.912c0 6.398 5.186 11.584 11.584 11.584s11.584-5.186 11.584-11.584-5.186-11.584-11.584-11.584-11.584 5.186-11.584 11.584zM541.419 943.2c0 9.614 7.794 17.408 17.408 17.408s17.408-7.794 17.408-17.408-7.794-17.408-17.408-17.408-17.408 7.794-17.408 17.408z m-186.56-9.152c0 12.795 10.373 23.168 23.168 23.168s23.168-10.373 23.168-23.168-10.373-23.168-23.168-23.168-23.168 10.373-23.168 23.168zM189.355 849.12c0 16.012 12.98 28.992 28.992 28.992s28.992-12.98 28.992-28.992-12.98-28.992-28.992-28.992-28.992 12.98-28.992 28.992zM74.731 704.736c0 19.228 15.588 34.816 34.816 34.816s34.816-15.588 34.816-34.816-15.588-34.816-34.816-34.816-34.816 15.588-34.816 34.816z m-43.008-177.28c0 22.41 18.166 40.576 40.576 40.576s40.576-18.166 40.576-40.576-18.166-40.576-40.576-40.576-40.576 18.166-40.576 40.576z m35.392-176.128c0 25.626 20.774 46.4 46.4 46.4s46.4-20.774 46.4-46.4c0-25.626-20.774-46.4-46.4-46.4-25.626 0-46.4 20.774-46.4 46.4z m106.176-142.016c0 28.843 23.381 52.224 52.224 52.224s52.224-23.381 52.224-52.224c0-28.843-23.381-52.224-52.224-52.224-28.843 0-52.224 23.381-52.224 52.224z m155.904-81.344c0 32.024 25.96 57.984 57.984 57.984s57.984-25.96 57.984-57.984-25.96-57.984-57.984-57.984-57.984 25.96-57.984 57.984z m175.104-5.056c0 35.24 28.568 63.808 63.808 63.808s63.808-28.568 63.808-63.808c0-35.24-28.568-63.808-63.808-63.808-35.24 0-63.808 28.568-63.808 63.808z m160.32 72.128c0 38.421 31.147 69.568 69.568 69.568s69.568-31.147 69.568-69.568-31.147-69.568-69.568-69.568-69.568 31.147-69.568 69.568z m113.92 135.488c0 41.638 33.754 75.392 75.392 75.392s75.392-33.754 75.392-75.392-33.754-75.392-75.392-75.392-75.392 33.754-75.392 75.392z m45.312 175.488c0 44.854 36.362 81.216 81.216 81.216s81.216-36.362 81.216-81.216c0-44.854-36.362-81.216-81.216-81.216-44.854 0-81.216 36.362-81.216 81.216z"
                fill="" p-id="862"></path>
            </svg>
            正在加载数据...
          </div>
        </>
      )
    } else if (this.state.funds1 == 0) {
      vdom1 = (
        <>
          {/*<p className="title">IPO打新基金</p>*/}
          <div className='loading'>该分类下没有内容</div>
        </>
      )
    } else {
      vdom1 = (
        this.state.funds1.map((item, index) => (
          <>
            <p className="title" key={index}>{item[0]}</p>
            <div className="row fund">
              {/*{ item[1].map((item3,index2)=>(*/}
              <div className="col-md-4" key={index}>
                <img className='img-responsive fund_pic' src={item[1][0].logo} alt=""/>
              </div>
              {/*))}*/}
              <div className="col-md-8">
                <table className="table table-bordered">
                  <thead>
                  <tr>
                    <th>基金名称</th>
                    <th>募集规模</th>
                    <th>投资行业</th>
                    <th>管理人</th>
                    <th>投资期限</th>
                    <th>预期收益</th>
                    <th>起购金额</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    item[1].map((item1, index1) => (

                      <tr key={index1} data-pic={item1.logo} >
                        <td>{item1.title}</td>
                        <td>{item1.guimo}</td>
                        <td>{item1.touzi}</td>
                        <td>{item1.man}</td>
                        <td>{item1.touzi_date}</td>
                        <td>{item1.yuqi}</td>
                        <td>{item1.price}</td>
                        <td><Link to={{pathname: '/buy', state: {id: item1.id, n: item1.title}}}>认购</Link></td>
                      </tr>
                    ))
                  }

                  </tbody>
                </table>
              </div>
            </div>
          </>
        ))
      )
    }

    return (
      <div>
        <DocumentMeta {...meta}/>

        <Navbar/>
        <div className="chaoshi-layout">
          <div className="backgroundImg">
            <h3 className='container'>基金超市</h3>
          </div>

          <div className="content container">

            {vdom1}

          </div>
        </div>
      </div>
    );
  }
}

export default Index;