'use client';
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000";

interface DecodedToken {
  user_id: number;
  role: string;
  exp: number;
}

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
};

export default function ProfilePage() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [photo, setPhoto] = useState("/logo.png");
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "", email: "", password: "" });
  const [userRole, setUserRole] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserRole(decoded.role);
      fetchCurrentUser(token);

      if (decoded.role === "admin") {
        fetchUsers(token);
      }
    }
  }, []);

  const fetchUsers = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch users: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch current user");

      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
    } catch (err) {
      console.error("Error fetching current user", err);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhoto(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    alert("Profile updated!");
  };

  const handleAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => {
    setShowAddUser(false);
    setNewUser({ name: "", role: "", email: "", password: "" });
  };

  const handleSaveAddUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Not authenticated");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to add user");

      alert("User added successfully!");
      handleCloseAddUser();
      fetchUsers(token);
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/auth/delete-user/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers(prev => prev.filter(u => u.id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  const inputTypes: Record<string, string> = {
    name: "text",
    role: "text",
    email: "email",
    password: "password",
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-4 max-w-10xl mx-auto">
      {showAddUser && userRole === "admin" && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <div className="space-y-4">
              {["name", "role", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                  <input
                   type={inputTypes[field] || "text"}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={(newUser as any)[field]}
                    onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseAddUser}
                className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >Close</button>
              <button
                onClick={handleSaveAddUser}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="md:w-1/4 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={photo}
              alt="User Photo"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700"
              onClick={() => fileInputRef.current?.click()}
              type="button"
              title="Change Photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              value={email}
              disabled
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >Save Changes</button>
        </form>
      </div>

      {userRole === "admin" && (
        <div className="md:w-3/4 bg-white rounded-lg shadow p-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Users</h2>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              title="Add User"
              onClick={handleAddUser}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100">Sr. No.</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100">User Name</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100">Role</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100">User Email ID</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id}>
                  <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">{u.name}</td>
                  <td className="border border-gray-300 px-3 py-2">{u.role}</td>
                  <td className="border border-gray-300 px-3 py-2">{u.email}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete User"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
