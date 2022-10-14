import { Button, message, Form, Input, Card, Row, Col } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectSingularPeople, updatePeople } from '../../../../../store/slices/people.slice';

const EditPeopleCard = (props: any) => {
  const dispatch = useAppDispatch();
  const person = useAppSelector(selectSingularPeople);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    dispatch(
      updatePeople({
        id: person!.id,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
    message.success(`Pessoa alterada com sucesso!`, 5);
    form.resetFields();
  };
  const onFinishFailed = () => {
    message.error(`Ocorreu um erro ao registrar`, 5);
  };
  const handleChange = () => {
    props.onChange();
  };

  return (
    <Card title="Editar Pessoa">
      <Form
        form={form}
        name="editPeople"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>
            <Form.Item
              label="nome"
              name="firstName"
              rules={[{ required: true, message: 'Por favor, insira o nome' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Sobrenome"
              name="lastName"
              rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button
                key="back"
                onClick={() => {
                  handleChange();
                  form.resetFields();
                }}
              >
                Cancelar
              </Button>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button key="submit" type="primary" htmlType="submit" form="editPeople">
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EditPeopleCard;
