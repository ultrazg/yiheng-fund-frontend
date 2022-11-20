import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

// import viderURL from '../../images/daytime.mp4';
import indexPic from '../../images/index.png';

import {Popover, Spin} from 'antd';

import img1 from '../../images/1.png';
import img2 from '../../images/2.png';
import img3 from '../../images/3.png';
import img4 from '../../images/4.png';
import img5 from '../../images/5.png';
import img6 from '../../images/6.png';
import img7 from '../../images/7.png';
import img8 from '../../images/8.png';
import img9 from '../../images/9.png';
import img10 from '../../images/10.png';

import Navbar from '../../components/Navbar';
import {Link} from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hots: [],
      adUrl: '',
      hynews: [],
      hyNewsLoading: true,
      yhnews: [],
      yhNewsLoading: true
    }
  }

  componentWillMount() {
    // 判断是否移动设备
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = 'http://m.ipoinchina.com';

      return;
    }
  }

  //
  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/fund_data/getContent')
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.list);
        this.setState({hots: data.list});
      });

    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/行业新闻/1', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        this.setState({
          hynews: data.list.slice(0, 3),
          hyNewsLoading: false
        });
      });

    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/毅恒新闻/1', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        this.setState({
          yhnews: data.list.slice(0, 3),
          yhNewsLoading: false
        });
      });

  }

  adGo = () => {
    // TODO
  }

  render() {
    const meta = {
      title: '注册制改革_打新技巧_毅恒基金官网',
      description: '毅恒基金秉承“为信任成就托付”的企业宗旨，注重将投资收益及时转化为红利，为投资人创造了丰厚的回报。毅恒基金公司在注册制改革的前提下帮助客户能够抓住时机，赢得利益最大化。',
      meta: {
        name: {
          keywords: '注册制股票,股票打新,注册制新股'
        }
      }
    }

    let vdom, hyNewsVDOM, yhNewsVDOM

    if (this.state.hots.length == 0) {
      vdom = (
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
          正在加载中...</div>
      )
    } else {

      vdom = (
        // 热销基金循环 start

        this.state.hots.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">

              <p>{item.title}</p>
              <p></p>
              {/*<p>{item.guimo}</p>*/}
              {/*<p>募集规模</p>*/}
              <p>{item.touzi}</p>
              <p>投资行业</p>
              {/*<p>{item.man}</p>*/}
              {/*<p>管理人</p>*/}
              {/*<p>{item.touzi_date}</p>*/}
              {/*<p>投资期限</p>*/}
              <p>{item.yuqi}</p>
              <p>预期收益</p>
              <p>{item.price}</p>
              <p>起购金额</p>

              {/*<p><Link to={{pathname: '/buy', state: {id: item.id, n: item.title}}}>购买</Link></p>*/}

              <Link to={{pathname: '/buy', state: {id: item.id, n: item.title}}}>前往认购</Link>
            </div>
          </div>
        ))

        // 热销基金循环 end

      )
    }

    hyNewsVDOM = (
      this.state.hynews.map((item, index) => (
        <div className="panel panel-default" key={index}>
          <Link to={'/article/' + item.id}>
            <div className="panel-body">
              <div className="chunk1">
                <p className='t1' title={item.title}>{item.title}</p>
                <p className='t2' title={item.remark}>{item.remark}</p>
                <p className='t2 pull-right t3'>{item.create_at}</p>
              </div>
              <div className="chunk2">
                <img src={item.logo} className="img-responsive"/>
              </div>
            </div>
          </Link>
        </div>
      ))
    )

    yhNewsVDOM = (
      this.state.yhnews.map((item, index) => (
        <div className="panel panel-default" key={index}>
          <Link to={'/article/' + item.id}>
            <div className="panel-body">
              <div className="chunk1">
                <p className='t1' title={item.title}>{item.title}</p>
                <p className='t2' title={item.remark}>{item.remark}</p>
                <p className='t2 pull-right t3'>{item.create_at}</p>
              </div>
              <div className="chunk2">
                <img src={item.logo} className="img-responsive"/>
              </div>
            </div>
          </Link>
        </div>
      ))
    )

    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar/>
        {/*首页视频/图片 start*/}
        <div className='indexbigimg-layout'>
          {/*<img className='img-responsive' src={imgURL} alt=""/>*/}
          {/* <video className='img-responsive' src={viderURL} autoPlay={true} title='查看详情' onClick={this.adGo}
                 loop={true}></video> */}
          <img src={indexPic} className="img-responsive" alt=""/>
          <div className="mask">
            <h3 className='container'>士不可以不弘毅，任重而道远</h3>
          </div>
        </div>
        <div className="kaihu">
          <span>我要开户</span><input placeholder='手机号码' type="text"/>
          <button><Link to='/register'>开户</Link></button>
        </div>
        {/*首页视频/图片 end*/}

        {/*seo联系我们 start*/}
        <div className="index-phone">
          <i className="fa fa-phone"></i>15818105420<i className="fa fa-weixin"></i>IPOHKEx
        </div>
        {/*seo联系我们 end*/}

        {/*pro start*/}
        <div className="pro-layout container">
          <h2>为什么选择我们</h2>
          <div className="icons row">
            <div className="icon col-md-3 col-xs-6">
              <div className="box">
                <p>15<span>周年</span></p>
                <p>投资管理经验</p>
              </div>
            </div>
            <div className="icon col-md-3 col-xs-6">
              <div className="box">
                <p>10<span>亿美元</span></p>
                <p>单只基金规模</p>
              </div>
            </div>
            <div className="icon col-md-3 col-xs-6">
              <div className="box">
                <p>60<span>只</span></p>
                <p>管理过私募基金</p>
              </div>
            </div>
            <div className="icon col-md-3 col-xs-6">
              <div className="box">
                <p>10000<span>人次</span></p>
                <p>已服务客户</p>
              </div>
            </div>
          </div>
        </div>
        {/*pro end*/}

        {/*成功案例组件 start*/}
        <div className="case-layout container">
          <h2>成功案例</h2>

          <div className="lists row">
            <div className="col-xs-6 col-md-3">中烟香港<span>06055</span></div>
            <div className="col-xs-6 col-md-3">中国医疗<span>08225</span></div>
            <div className="col-xs-6 col-md-3">自动系统<span>00771</span></div>
            <div className="col-xs-6 col-md-3">集友股份<span>603429</span></div>
            <div className="col-xs-6 col-md-3">济民制药<span>603222</span></div>
            <div className="col-xs-6 col-md-3">毛记葵涌<span>01716</span></div>
            <div className="col-xs-6 col-md-3">管道工程<span>01865</span></div>
            <div className="col-xs-6 col-md-3">信基沙溪<span>03603</span></div>
            {/* <div className="col-xs-6 col-md-3">...</div> */}
          </div>
        </div>
        {/*成功案例组件 end*/}

        {/*热销 start*/}
        <div className="hot-layout container">
          <h2>热销基金</h2>

          <div className="content row">

            {vdom}

          </div>
        </div>
        {/*热销 end*/}

        {/*合作单位组件 start*/}
        <div className="cooperation-layout container">
          <h2>合作单位</h2>
          <div className="icons row">
            <div className="icon">
              {/*<a href="https://www.cnigroup.com.hk/" target='_blank'>*/}
              <img className='' src={img2} alt=""/>
              <p>中国北方证券</p>
              {/*</a>*/}
            </div>
            <div className="icon">
              {/*<a href="http://www.bmi-hk.com/index.php" target='_blank'>*/}
              <img className='' src={img3} alt=""/>
              <p>邦盟汇骏证券</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.htsec.com/ChannelHome/index.shtml" target='_blank'>*/}
              <img className='' src={img4} alt=""/>
              <p>海通证券</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.xyzq.com.cn/" target='_blank'>*/}
              <img className='' src={img5} alt=""/>
              <p>兴业证券</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.sc.com/hk/" target='_blank'>*/}
              <img className='' src={img6} alt=""/>
              <p>渣打银行</p>
              {/*</a>*/}

            </div>
          </div>
          <div className="icons row">
            <div className="icon">
              {/*<a href="https://www.cmbchina.com/" target='_blank'>*/}
              <img className='' src={img7} alt=""/>
              <p>招商银行</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.hsbc.com.cn/" target='_blank'>*/}
              <img className='' src={img8} alt=""/>
              <p>汇丰银行</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.pwccn.com/zh" target='_blank'>*/}
              <img className='' src={img9} alt=""/>
              <p>普华永道</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="http://www.yingkelawyer.com/" target='_blank'>*/}
              <img className='' src={img10} alt=""/>
              <p>盈科</p>
              {/*</a>*/}

            </div>
            <div className="icon">
              {/*<a href="https://www.morganstanleychina.com/" target='_blank'>*/}
              <img className='' src={img1} alt=""/>
              <p>摩根</p>
              {/*</a>*/}

            </div>
          </div>
        </div>
        {/*合作单位组件 end*/}

        {/*首页新闻 start*/}
        <div className="indexnews-layout container">
          <h2>新闻资讯</h2>

          <div className="content">

            <div className="row">
              <div className="col-md-6 hynews">
                <p className='title'>✧行业新闻<Link className='pull-right'
                                                style={{color: '#cccccc', cursor: 'pointer'}} to='/news'>更多></Link></p>

                {this.state.hyNewsLoading ? <Spin/> : (this.state.hynews.length > 0 ? hyNewsVDOM : '暂无内容:(')}

              </div>
              <div className="col-md-6 hynews">
                <p className='title'>✧毅恒新闻<Link className='pull-right'
                                                style={{color: '#cccccc', cursor: 'pointer'}} to='/yhnews'>更多></Link>
                </p>

                {this.state.yhNewsLoading ? <Spin/> : (this.state.yhnews.length > 0 ? yhNewsVDOM : '暂无内容:(')}

              </div>
            </div>

          </div>

        </div>
        {/*首页新闻 end*/}

      </div>
    );
  }
}

export default Index;

