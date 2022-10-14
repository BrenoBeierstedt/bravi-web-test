import { Modal, Button, message, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { openModal, modaltype } from '../../../../store/slices/modal.slice';
import { deletePeople, selectSingularPeople } from '../../../../store/slices/people.slice';
import EditPeopleCard from './components/EditPeopleCard';
import ContactList from './components/ContactList';
import AddContactCard from './components/AddContactCard';
// import ContactList from './components/ContactList';

const EditPeopleModal = () => {
  const dispatch = useAppDispatch();
  const modalTyp = useAppSelector(modaltype);
  const person = useAppSelector(selectSingularPeople);
  const [edit, setEdit] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    dispatch(openModal(''));
  };

  const handleCancel = () => {
    dispatch(openModal(''));
    setEdit(false);
  };

  const onDelete = () => {
    dispatch(deletePeople(person!.id));
    message.success(`Pessoa deletada com sucesso!`, 5);
    dispatch(openModal(''));
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleAddContactCancel = () => {
    setAddContact(false);
  };

  return (
    <Modal
      open={modalTyp === 'editPeopleModal'}
      onOk={handleOk}
      onCancel={handleCancel}
      width="90%"
      footer={null}
    >
      <div>
        <h3>
          {person!.firstName} {person!.lastName}
        </h3>
        <div>Ações da Pessoa:</div>
        <Button
          onClick={() => {
            setAddContact(!addContact);
            form.resetFields();
          }}
        >
          <PlusCircleOutlined />
          Adicionar Contato
        </Button>
        <Button
          style={{ margin: 10 }}
          onClick={() => {
            setEdit(!edit);
            form.resetFields();
          }}
        >
          <EditOutlined />
          Editar
        </Button>
        <Button onClick={onDelete} type="primary" danger>
          <DeleteOutlined />
          Deletar
        </Button>
      </div>
      {edit ? <EditPeopleCard onChange={handleEditCancel} /> : null}
      {addContact ? <AddContactCard onChange={handleAddContactCancel} /> : null}
      <ContactList />
    </Modal>
  );
};

export default EditPeopleModal;
