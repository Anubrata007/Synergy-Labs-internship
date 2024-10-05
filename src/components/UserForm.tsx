import React, { useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";
import Add from "../assets/add.png";
import Delete from "../assets/rejected.png";

interface UserFormProps {
  userId?: number | null; // Allow userId to be null or undefined
  onSubmit: (user: User) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      } else {
        setName("");
        setEmail("");
        setPhone("");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: userId ?? 0, // Assign a temporary ID
      name,
      email,
      phone,
    };
    onSubmit(newUser);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-xl border-gray-500 focus:outline-none px-2 w-full sm:w-auto"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-xl border-gray-500 focus:outline-none px-2 w-full sm:w-auto"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border rounded-xl border-gray-500 focus:outline-none px-2 w-full sm:w-auto"
            placeholder="Enter phone"
          />
        </div>
        <div className="flex my-1 p-1 justify-end gap-5">
          <button type="submit" className="flex items-center">
            <img className="h-8 w-8" src={Add} alt="Pencil" />
          </button>
          <button type="button" onClick={onClose} className="flex items-center">
            <img className="h-8 w-8" src={Delete} alt="Delete" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
