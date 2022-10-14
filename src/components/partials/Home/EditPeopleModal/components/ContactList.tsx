import React, { useEffect } from 'react';
import { Table, Card, Space, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ERequestStatus } from '../../../../../common/request';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  fetchContact,
  selectContacts,
  deleteContact,
  selectStatus,
  // selectStatus,
} from '../../../../../store/slices/contact.slice';
import { selectSingularPeople } from '../../../../../store/slices/people.slice';

// import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
// import { selectSingularPeople, updatePeople } from '../../../../../store/slices/people.slice';

const ContactList = () => {
  // const dispatch = useAppDispatch();
  // const person = useAppSelector(selectSingularPeople);
  // const [form] = Form.useForm();
  const person = useAppSelector(selectSingularPeople);
  const contactStatus = useAppSelector(selectStatus);

  const contactList = useAppSelector(selectContacts);
  // const contactStatus = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContact(person!.id || ''));
  }, [dispatch, person]);
  const onDelete = (id: any) => {
    dispatch(deleteContact(id));
    if (contactStatus !== ERequestStatus.SUCCEEDED) {
      message.success(`Ocorreu um erro ao deletar registro`, 5);
    }
    message.success(`Contato deletado com sucesso!`, 5);
  };

  interface ContactProps {
    id?: string;
    type: string;
    info: string;
    peopleId?: string;
    updatedAt?: Date;
    createdAt?: Date;
  }
  const columns: ColumnsType<ContactProps> = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Contato',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => message.info('Em breve!', 5)}>Editar </Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Contatos">
      <Table columns={columns} dataSource={contactList} size="middle" rowKey="id" />
    </Card>
  );
};
export default ContactList;
