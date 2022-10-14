import React, { useEffect } from 'react';
import { Button, List, Card } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import {
  fetchPeoples,
  selectPeoples,
  selectStatus,
  setSingularPeople,
} from '../../../../store/slices/people.slice';
import { openModal } from '../../../../store/slices/modal.slice';
import { ERequestStatus } from '../../../../common/request';

const UserList = () => {
  const userList = useAppSelector(selectPeoples);
  const usersStatus = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPeoples());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => dispatch(openModal({ type: 'addPeopleModal' }))}
          >
            Adicionar Pessoa
          </Button>
        </p>
      </div>

      <List
        pagination={{
          showSizeChanger: false,
        }}
        dataSource={userList}
        loading={usersStatus === ERequestStatus.LOADING}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => {
                dispatch(openModal({ type: 'editPeopleModal', id: item.id }));
                dispatch(setSingularPeople(item));
              }}
            >
              {item.firstName} {item.lastName}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;
