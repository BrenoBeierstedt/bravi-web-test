import { Modal, Form, Input, Button, message } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { openModal, modaltype } from '../../../../store/slices/modal.slice';
import { addPeople } from '../../../../store/slices/people.slice';

const AddPeopleModal = () => {
  const dispatch = useAppDispatch();
  const modalTyp = useAppSelector(modaltype);

  const [form] = Form.useForm();

  const handleOk = () => {
    dispatch(openModal(''));
  };

  const handleCancel = () => {
    dispatch(openModal(''));
  };

  const onFinish = (values: any) => {
    dispatch(
      addPeople({
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
    message.success(`Pessoa registrada com sucesso!`, 5);
    form.resetFields();
    dispatch(openModal(''));
  };

  const onFinishFailed = () => {
    message.error(`Ocorreu um erro ao registrar`, 5);
  };

  return (
    <Modal
      title="Cadastro de Pessoa"
      open={modalTyp === 'addPeopleModal'}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" form="addPeople">
          Salvar
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="addPeople"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="nome"
          name="firstName"
          rules={[{ required: true, message: 'Por favor, insira o nome' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Sobrenome"
          name="lastName"
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPeopleModal;
