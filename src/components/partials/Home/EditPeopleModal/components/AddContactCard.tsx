import { Button, message, Form, Input, Card, Row, Col, Select } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addContact, fetchContact } from '../../../../../store/slices/contact.slice';
import { selectSingularPeople } from '../../../../../store/slices/people.slice';

const AddContactCard = (props: any) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const person = useAppSelector(selectSingularPeople);
  const handleChange = () => {
    // Here, we invoke the callback with the new value
    props.onChange();
  };
  const onFinish = (values: any) => {
    dispatch(
      addContact({
        type: values.type,
        info: values.info,
        peopleId: person!.id,
      }),
      // @ts-ignore
      dispatch(fetchContact(person!.id)),
    );
    message.success(`Contato adicionado com sucesso!`, 5);
    form.resetFields();
    // @ts-ignore
    dispatch(fetchContact(person!.id));
    handleChange();
  };
  const onFinishFailed = () => {
    message.error(`Ocorreu um erro ao adicionar contato`, 5);
  };

  return (
    <Card title="Cadastrar Contato">
      <Form
        form={form}
        name="addContact"
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
              label="Tipo"
              name="type"
              rules={[{ required: true, message: 'Por favor, insira o nome' }]}
            >
              <Select placeholder="Selecione um tipo de contato">
                <Option value="Whatsapp">Whatsapp</Option>
                <Option value="Email">E-mail</Option>
                <Option value="Telefone">Telefone</Option>
                <Option value="Intagram">Instagram</Option>
                <Option value="Linkedin">Linkedin</Option>
                <Option value="Facebook">Facebook</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Contato"
              name="info"
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
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                form="addContact"
                style={{ marginLeft: 20 }}
              >
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddContactCard;
