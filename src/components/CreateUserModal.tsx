import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import '../styles/createUserModal.css'
import { type UserFormData } from "./types";

interface CreateUserModalProps {
  show: boolean;
  onHide: () => void;
  formData: UserFormData;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  show,
  onHide,
  formData,
  onSubmit,
  onInputChange,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton={false}>
        <Modal.Title>إنشاء مستخدم جديد</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
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
              required
              placeholder="أدخل اسم المستخدم"
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
              required
              placeholder="أدخل البريد الإلكتروني"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange(e)
              }
              required
              placeholder="كلمة المرور"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>الحالة</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.is_active ? 'نشط' : 'غير نشط'}
                  onChange={onInputChange}
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
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
            إنشاء المستخدم
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
