import React from 'react';
import { Card, PageHeader } from 'antd';
import UserList from '../../components/partials/Home/Users';
import AddPeopleModal from '../../components/partials/Home/AddPeopleModal';
import EditPeopleModal from '../../components/partials/Home/EditPeopleModal';

const Home = () => (
  <div className="Home">
    <Card>
      <PageHeader className="site-page-header" title="Pessoas" />
      <UserList />
      <AddPeopleModal />
      <EditPeopleModal />
    </Card>
  </div>
);

export default Home;
