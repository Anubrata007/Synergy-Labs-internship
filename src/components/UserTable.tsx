import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types";
import UserForm from "./UserForm";
import Modal from "./Modal";
import UserDetails from "../pages/UserDetail";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUserId(null);
  };

  const handleUserCreate = (newUser: User) => {
    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: newId };
    setUsers((prevUsers) => [...prevUsers, userWithId]);
  };

  const handleUserDelete = async (userId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setShowForm(true);
  };

  const handleDetailsClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-teal-600 text-white p-2 rounded hover:bg-teal-500"
      >
        Create User
      </button>
      <Modal
        isOpen={showForm}
        onClose={() => {
          setEditingUserId(null);
          setShowForm(false);
        }}
      >
        <UserForm
          userId={editingUserId ?? null} // Pass null if editingUserId is undefined
          onSubmit={editingUserId ? handleUserUpdate : handleUserCreate}
          onClose={() => {
            setEditingUserId(null);
            setShowForm(false);
          }}
        />
      </Modal>
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </Modal>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2 hidden sm:table-cell">Email</th>
            <th className="border p-2 hidden sm:table-cell">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"}
            >
              <td
                className="border p-2 cursor-pointer hover:text-teal-700"
                onClick={() => handleDetailsClick(user)}
              >
                {user.name}
              </td>
              <td className="border p-2 hidden sm:table-cell">{user.email}</td>
              <td className="border p-2 hidden sm:table-cell">{user.phone}</td>
              <td className="border p-2">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-gray-700 p-1 hover:text-green-700"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleUserDelete(user.id)}
                    className="text-gray-700 p-1 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
