import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import "../styles/statistics.css";
import { type User } from "./types";

interface statisticsCardProps {
  users: User[];
}

const StatisticsCard: React.FC<statisticsCardProps> = ({ users }) => {
  return (
    <Container>
      <Row className="mb-4 statistics-row">
        <Col md={3} sm={12}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-users"></i>

              <Card.Title className="text-primary-">{users.length}</Card.Title>
              <Card.Text className="text-muted">إجمالي المستخدمين</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={12}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-user-check"></i>

              <Card.Title className="text-primary-">
                {users.filter((u) => u.is_active === true).length}
              </Card.Title>
              <Card.Text className="text-muted"> المستخدمين النشطين</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={12}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-user-slash text-danger"></i>

              <Card.Title className="text-primary-">
                {users.filter((u) => u.is_active === false).length}
              </Card.Title>
              <Card.Text className="text-muted">
                {" "}
                المستخدمين غير النشطين
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsCard;
