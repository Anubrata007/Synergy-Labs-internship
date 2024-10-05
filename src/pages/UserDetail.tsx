import React from "react";
import { User } from "../types";

interface UserDetailsProps {
  user: User | null;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button
        onClick={onClose}
        className="bg-teal-600 text-white p-2 rounded mt-4 font-bold"
      >
        Close
      </button>
    </div>
  );
};

export default UserDetails;
