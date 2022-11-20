import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

import './index.css';

import Navbar from '../../components/Navbar';

class Index extends Component {

  componentWillMount(){
    document.getElementById('root').scrollIntoView(true);
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="contactus-layout container">
          <div className="backgroundImg">
            <h3>毅恒宏观机会基金有限公司</h3>
            <p><i className='glyphicon glyphicon-map-marker'></i>香港轩尼诗道 253-261 号依时商业大厦 1902 室</p>
            <p><i className='glyphicon glyphicon-globe'></i><a
              href='http://www.ipoinchina.com'>http://www.ipoinchina.com</a></p>
            <p><i className='glyphicon glyphicon-earphone'></i><a href='tel:15818105420'>15818105420</a></p>
            <p><i className='glyphicon glyphicon-envelope'></i><a href='mailto:2358271945@qq.com'>2358271945@qq.com</a>
            </p>

            <div className="address">
              <span>广州</span>
              <p><i className='glyphicon glyphicon-map-marker'></i>广州市天河区富力盈盛广场 1711 室</p>
            </div>
            <div className="address">
              <span>上海</span>
              <p><i className='glyphicon glyphicon-map-marker'></i>上海市静安区南京西路 580 号仲益大厦 3723 室</p>
            </div>
            <div className="address">
              <span>深圳</span>
              <p><i className='glyphicon glyphicon-map-marker'></i>深圳市南山区航空航天大厦 2 栋 709</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Index;