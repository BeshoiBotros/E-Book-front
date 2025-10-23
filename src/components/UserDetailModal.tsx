import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { type User } from "./types";

interface UserDetailModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  show,
  onHide,
  user,
}) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>تفاصيل المستخدم</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-center mb-4">
            <h4>{user.username}</h4>
          </div>

          <div className="border-top pt-3">
            <div className="row mb-2">
              <div className="col-4 text-muted">البريد الإلكتروني:</div>
              <div className="col-8">{user.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 text-muted">اسم المستخدم:</div>
              <div className="col-8">{user.username}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 text-muted">الحالة:</div>
              <div className="col-8">
                <Badge bg={user.is_active === true ? "success" : "danger"}>
                  {user.is_active === true ? "نشط" : "غير نشط"}
                </Badge>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4 text-muted">تاريخ الانضمام:</div>
              <div className="col-8">
                {(() => {
                  const date = new Date(user.date_joined);
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");

                  let hours = date.getHours();
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12 || 12;
                  const formattedTime = `${String(hours).padStart(
                    2,
                    "0"
                  )}:${minutes} ${ampm}`;

                  return `${year}-${month}-${day} ${formattedTime}`;
                })()}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" className="primary-" onClick={onHide}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;
