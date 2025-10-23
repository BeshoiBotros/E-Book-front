import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/createUserModal.css";
import { type UserFormData, type User } from "./types";

interface UpdateUserProps {
  show: boolean;
  user: User;
  onHide: () => void;
  formData: UserFormData;
  onSubmit: (e: React.FormEvent, user: User) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const UpdateUserModal: React.FC<UpdateUserProps> = ({
  show,
  onHide,
  formData,
  onSubmit,
  onInputChange,
  user,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton={false}>
        <Modal.Title>تعديل مستخدم </Modal.Title>
      </Modal.Header>

      <Form onSubmit={(e: React.FormEvent) => user && onSubmit(e, user)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>اسم المستخدم</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(e)
              }
              placeholder="ادخل اسم المستخدم"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>البريد الإلكتروني</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(e)
              }
              
              placeholder="أدخل البريد الإلكتروني"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>كلمة السر</Form.Label>
            <Form.Control
              dir="rtl"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(e)
              }
              
              placeholder="أدخل كلمة السر"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>الحالة</Form.Label>
                <Form.Select
                  name="is_active"
                  value={formData.is_active ? "true" : "false"}
                  onChange={onInputChange}
                >
                  <option value="true">نشط</option>
                  <option value="false">غير نشط</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            إلغاء
          </Button>
          <Button variant="" className="primary-" type="submit">
            تعديل المستخدم
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
