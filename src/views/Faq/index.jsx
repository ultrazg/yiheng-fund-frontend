import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import './index.css';
import aIcon from '../../images/a.png';
import qIcon from '../../images/q.png';
import { Collapse } from 'antd';
import DocumentMeta from 'react-document-meta';

const { Panel } = Collapse;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listContent: []
    }
  }

  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/常见问题/1', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ listContent: data.list });
      });
  }

  render() {
    const meta = {
      title: '中国上市企业有哪些_毅恒基金公司',
      description: '毅恒基金公司核心团队拥有 15年投资管理经验，管理单只基金规模超过 10 亿美元，高管团队均来自国内外顶尖投行.',
      meta: {
        name: {
          keywords: '中国上市公司,上市公司排名'
        }
      }
    }

    let vdom = (
      this.state.listContent.map((item, index) => (

        <Panel
          header={<HeaderIcon title={item.title} />}
          key={index}
          showArrow={false}
        >
          <p><img src={aIcon} style={{marginRight:'10px'}}/>{item.remark}</p>
        </Panel>

      ))
    )

    return (
      <div>
        <DocumentMeta {...meta}/>

        <Navbar />
        <div className="faq-layout container">

          <h3>常见问题</h3>

          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

            <Collapse accordion >

              {vdom}

            </Collapse>

          </div>

        </div>

      </div>
    );
  }
}

function HeaderIcon(props) {
  return <><img src={qIcon} style={{marginRight:'10px'}}/>{props.title}</>
}

export default Index;