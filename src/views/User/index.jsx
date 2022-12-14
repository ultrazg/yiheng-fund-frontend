import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import headerImg from '../../images/me.jpg';

import Navbar from '../../components/Navbar';

import { Statistic, Spin, Tooltip, Image } from 'antd';

import Cookies from 'js-cookie';

import Tips from '../Tips';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userid: '',
      phone: '',
      token: '',
      isDisabled: true,
      isShow: false,
      page: 1,
      order: [],
      count_num: '',
      animating: true
    }
  }

  prePage = () => {
    const { userid, token, count_num } = this.state;

    this.setState({
      page: this.state.page - 1
    }, () => {

      this.getPageData(token, userid, this.state.page);

      if (this.state.page <= Math.ceil(count_num / 3)) {
        this.setState({
          isShow: false
        })
      }

      if (this.state.page <= 1) {
        this.setState({
          isDisabled: true
        })
      }
    })
  }

  nextPage = () => {
    const { userid, token, count_num } = this.state;

    this.setState({
      page: this.state.page + 1
    }, () => {

      this.getPageData(token, userid, this.state.page);

      if (this.state.page == Math.ceil(count_num / 3)) {
        this.setState({
          isShow: true
        })
      }

      if (this.state.page > 1) {
        this.setState({
          isDisabled: false
        })
      }
    })
  }

  componentDidMount() {
    let token
    let userid
    if (Cookies.get('yiheng')) {
      let data = JSON.parse(Cookies.get('yiheng'));
      let username = data.username;
      userid = data.id;
      let phone = data.phone;
      token = data.t;

      this.setState({
        username: username,
        userid: userid,
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
        token: token
      })
    }
    this.getPageData(token, userid, 1)
  }

  getPageData = (token, userid, page) => {
    // const {token,userid} = this.state
    this.setState({
      animating: true
    })

    fetch('http://admin.ipoinchina.com/api/member.member/getOrder', {
      method: 'POST',
      mode: 'cors',
      // redentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token,
      }),
      body: new URLSearchParams([['uid', userid], ['page', page]]).toString()
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);

        if (data.list) {
          this.setState({
            order: data.list,
            count_num: data.count_num,
            animating: false
          })
        }
        // if (data.list.length == 0) {
        //   this.setState({
        //     isShow: 'none'
        //   })
        // } else {
        //   this.setState({
        //     order: data.list,
        //     count_num: data.count_num
        //   });
        // }
      });
  }

  render() {
    const meta = {
      title: '????????????-????????????'
    }

    if (!Cookies.get('yiheng')) {
      return (
        <Tips />
      )
    }

    let vdom = (
      /*???????????????????????? start*/
      this.state.order.map((item, index) => (
        // <div className="col-sm-6 col-md-4" key={index}>
        <div className="col-xs-12 col-md-4" key={index}>
          <div className="thumbnail">
            {/* <img src={fundPic} className="img-thumbnail"/> */}
            <div className="caption">
              <h3>{item.fund_name}</h3>
              <p>????????????<span className='pull-right'>{item.add_time}</span></p>
              <p>????????????<span className='pull-right'>{item.order_id}</span></p>
              <p>?????????<span className='pull-right'>{item.user_name}</span></p>
              <p>????????????<span className='pull-right'>{item.phone}</span></p>
              <p>?????????<span className='pull-right'>{item.idcard}</span></p>
              {/*<p>?????????<span className='pull-right'>{item.tradingCode}</span></p>*/}
              <p>
                {item.tradingCode ? <>?????????<span className='pull-right'>{item.tradingCode}</span></> : <>????????????<span style={{ cursor: 'pointer' }} className='pull-right' ><Image width={50} height={20} src={item.codeimg} /></span></>}
              </p>
              <p>????????????<span className='pull-right'><Statistic value={item.price} valueStyle={{ fontSize: 15 }} /></span></p>
              <p>??????<span className={`pull-right ${item.class}`}>{item.status}</span>
              </p>
              <hr />
              <p><a href='/#/chaoshi' className="btn btn-primary" role="button">??????</a>
              </p>
            </div>
          </div>
        </div>
      ))
      /*???????????????????????? end*/
    )

    return (
      <div>
        <DocumentMeta {...meta} />

        <Navbar />
        <div className="user-layout">
          <div className="background-img">
            <div className="header-layout container">
              <img className='img-responsive headImg' src={headerImg} alt="" />
              <p className='username'>????????????{this.state.username}</p>
              <p className='username'>??????ID???{this.state.userid}</p>
              <p className='username'>????????????{this.state.phone}
                <Tooltip title='????????????'>
                  <i
                    className='glyphicon glyphicon-cog'
                    onClick={() => window.location.href = '/#/found'}
                  ></i>
                </Tooltip>
              </p>
              <hr />
              <h4>????????????{this.state.count_num == 0 ? '' : `?????? ${this.state.count_num} ??????????????? ${Math.ceil(this.state.count_num / 3)} ??????????????? ${this.state.page} ??????`}</h4>

              <div className="row">

                {this.state.animating ? <Spin /> : (this.state.count_num > 0 ? vdom : '??????????????????')}

              </div>

              {/*<Pagination*/}
              {/*  defaultCurrent={1}*/}
              {/*  total={this.state.count_num}*/}
              {/*  pageSize={3}*/}
              {/*  onChange={this.getPageData(this.state.token,this.state.userid,)}*/}
              {/*/>*/}

              {
                this.state.count_num > 3 ? <nav style={{ display: this.state.isShow }}>
                  <ul className="page">
                    <li className='pull-left'>
                      <button className='btn btn-default' disabled={this.state.isDisabled} onClick={this.prePage}>?????????
                      </button>
                    </li>
                    <li className='pull-right'>
                      <button className='btn btn-default' disabled={this.state.isShow} onClick={this.nextPage}>?????????
                      </button>
                    </li>
                  </ul>
                </nav> : ''
              }


            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

/*
item.status ? 'su pull-right' : 'er pull-right'
 */