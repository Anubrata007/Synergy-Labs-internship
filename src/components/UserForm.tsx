import React, { useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import { X } from "lucide-react";

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
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: userId || 0, // Assign a temporary ID
      name,
      email,
      phone,
    };
    onSubmit(newUser);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <label>Name :</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-solid border-0 border-b border-gray-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Email :</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-solid border-0 border-b border-gray-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Phone :</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border-solid border-0 border-b border-gray-500 focus:outline-none"
          />
        </div>
        <div className="flex my-2 p-1 justify-end gap-5">
          <button
            type="submit"
            className="bg-teal-600 text-white border rounded-full p-1"
          >
            <CirclePlus />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-teal-600 text-white border rounded-full p-1"
          >
            <X />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
