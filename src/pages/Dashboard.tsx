import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AuthHeader from "../components/AuthHeader";
import StatisticsCards from "../components/StatisticsCard";
import UsersTable from "../components/UsersTable";
import CreateUserModal from "../components/CreateUserModal";
import UserDetailModal from "../components/UserDetailModal";
import { type User, type UserFormData } from "../components/types";
import UpdateUserModal from "../components/UpdateUserModal";
import { useQuery } from "@tanstack/react-query";
import { createUser, featchAllUsers, updateUser } from "../api/accounts";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import HeaderBootstrap from "../components/HeaderBootstrap";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const {
    data: allUsers,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: featchAllUsers,
  });

  if (isError) {
    Swal.fire({
      title: "خطأ",
      icon: "error",
      text: error.message,
    });
  }

  React.useEffect(() => {
    if (isSuccess && Array.isArray(allUsers)) {
      setUsers(allUsers);
    }
  }, [isSuccess, allUsers]);

  React.useEffect(() => {
    const roleCookie = Cookies.get("role");
    setRole(roleCookie ?? null);
  }, []);

  React.useEffect(() => {
    if (role && role !== "Admin") {
      navigate("/book");
    }
  }, [role]);

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        title: "تم اضافة المستخدم",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    // ... rest of the options, remove the setUsers line
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError: (error: any) => {
      const errors = error.response?.data;
      if (!errors) {
        Swal.fire("خطأ", "حدث خطأ ما..", "error");
        return;
      }
      const formattedErrors = Object.entries(errors)
        .map(
          ([field, messages]) =>
            `<b>${field}</b>: ${(messages as string[]).join(", ")}`
        )
        .join("<br>");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: formattedErrors,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        title: "تم التعديل بنجاح",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    is_active: true,
    is_staff: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert is_active and is_staff to boolean types explicitly, to match CreateUserData
    createUserMutation.mutate({
      ...formData,
      is_active: Boolean(formData.is_active),
      is_staff: Boolean(formData.is_staff),
    });
    setShowModal(false);
    setFormData({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      is_active: true,
      is_staff: false,
    });
  };

  const handleUpdateUser = (e: React.FormEvent, user: User) => {
    e.preventDefault();
    updateUserMutation.mutate({
      data: formData,
      userId: user.id,
    });
    setShowUpdateModal(false);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleAddUser = () => {
    setShowModal(true);
  };
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      is_active: true,
      is_staff: false,
    });
    setShowUpdateModal(true);
  };

  return (
    <>
      <HeaderBootstrap />

      <main className="" style={{ marginTop: "50px" }}>
        <Container fluid className="">
          <StatisticsCards users={users} />
          <UsersTable
            users={users}
            onViewUser={handleViewUser}
            onDeleteUser={(user: User) => handleDeleteUser(user.id)}
            onAddUser={handleAddUser}
            onUpdateUser={(user: User) => handleEditUser(user)}
          />
          <CreateUserModal
            show={showModal}
            onHide={() => setShowModal(false)}
            formData={formData}
            onSubmit={handleCreateUser}
            onInputChange={handleInputChange}
          />

          <UserDetailModal
            show={showDetailModal}
            onHide={() => setShowDetailModal(false)}
            user={selectedUser}
          />

          <UpdateUserModal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            formData={formData}
            user={selectedUser!}
            onSubmit={(e: React.FormEvent) =>
              handleUpdateUser(e, selectedUser!)
            }
            onInputChange={handleInputChange}
          />
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
