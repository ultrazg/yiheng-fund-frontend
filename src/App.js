import React from 'react';
import './App.css';

// 路由
import {HashRouter as Router, Route, Switch} from "react-router-dom";

// import Cookies from 'js-cookie';

import 'antd/dist/antd.css';
import {BackTop} from "antd";

import Footer from './components/Footer';

import Index from './views/Index';
import About from './views/About';
import Chaoshi from './views/Chaoshi';
import Contactus from './views/Contactus';
import News from './views/news';
import Yhnews from './views/Yhnews';
import Risk from './views/Risk';
import Privacy from './views/Privacy';
import Complaint from './views/Complaint';
import User from './views/User';
import Signin from './views/Signin';
import Register from './views/Register';
import Datalist from './views/Datalist';
import Buy from './views/Buy';
import Found from './views/Found';
import Logout from './views/Logout';
import Faq from './views/Faq';
import Article from './views/Article';

import Notfound from './views/NotFound';

function App() {

  // 是否登录
  // let isLogin;
  //
  // if (Cookies.get('yiheng')) {
  //   isLogin = true;
  // } else {
  //   isLogin = false;
  // }

  return (
    <Router>
      <div className="App">
        <BackTop/>
        { /*<Navbar/>*/}
        <Switch>
          <Route path='/' exact component={Index}/>
          <Route path='/about' component={About}/>
          <Route path='/chaoshi' component={Chaoshi}/>
          <Route path='/contactus' component={Contactus}/>
          <Route path='/news' component={News}/>
          <Route path='/yhnews' component={Yhnews}/>
          <Route path='/risk' component={Risk}/>
          <Route path='/privacy' component={Privacy}/>
          <Route path='/complaint' component={Complaint}/>
          <Route path='/user' exact component={User}/>
          {/*<Route path='/user' exact component={*/}
          {/*  isLogin ? User : Tips*/}
          {/*}/>*/}
          {/*<Route path='/user/order' exact component={UserOrder}/>*/}
          <Route path='/signin' component={Signin}/>
          <Route path='/register' component={Register}/>
          <Route path='/datalist' component={Datalist}/>
          <Route path='/buy' exact component={Buy}/>
          {/*<Route path='/buy' component={*/}
          {/*  isLogin ? Buy : Tips*/}
          {/*}/>*/}
          <Route path='/found' component={Found}/>
          <Route path='/faq' component={Faq}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/article/:id' exact component={Article}/>

          {/*路由守卫*/}
          {/*buy user*/}

          {/* 404 page */}
          {/*<Route path='*' component={Notfound}/>*/}
        </Switch>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;