import React, { useState } from "react";
import { Table, Button, Badge, Container, Form } from "react-bootstrap";
import "../styles/usersTable.css";
import { type User } from "./types";

interface UsersTableProps {
  users: User[];
  onViewUser(user: User): void;
  onDeleteUser(user: User): void;
  onUpdateUser(user: User): void;
  onAddUser(): void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onViewUser,
  onUpdateUser,
  onAddUser,
}) => {
  const [usernameFilter, setUsernameFilter] = useState("");
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(usernameFilter.toLowerCase())
  );
  return (
    <div className="table-responsive">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">قائمة المستخدمين</h5>
          <Button className="add-user" onClick={onAddUser}>
            <i className="fas fa-plus me-2"></i>
            إضافة مستخدم
          </Button>
        </div>
        <div className="searchField">
          <Form className="form">
            <Form.Group>
              <Form.Control
                type="text"
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
                placeholder="ادخل اسم المستخدم"
              />
            </Form.Group>
          </Form>
        </div>
        <Table responsive striped hover style={{ minWidth: "350px" }}>
          <thead className="custom-table-header">
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الحالة</th>
              <th>تاريخ الانضمام</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={user.is_active === true ? "success" : "danger"}>
                    {user.is_active === true ? "نشط" : "غير نشط"}
                  </Badge>
                </td>
                <td>
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
                </td>
                <td>
                  <Button
                    //   variant="outline-info-"
                    size="sm"
                    className="me-1 outline-info-"
                    onClick={() => onViewUser(user)}
                  >
                    <i className="fas fa-eye"></i>
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-1 my-1"
                    onClick={() => onUpdateUser(user)}
                    //   value='تعديل'
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  {/* <Button
                    className="mx-1 my-1"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteUser(user)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UsersTable;
