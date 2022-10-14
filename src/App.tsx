import React from 'react';
import { Layout } from 'antd';

import Router from './routes';
import './styles/vendors.scss';

const { Content, Footer } = Layout;

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Content className="site-layout" style={{ padding: '50px' }}>
      <div className="site-layout-background" style={{ padding: 28, minHeight: 380 }}>
        <div className="App">
          <main>
            <Router />
          </main>
        </div>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      {' '}
      <a href="https://github.com/brenobeierstedt">Breno Beierstedt 2022</a>
    </Footer>
  </Layout>
);

export default App;
