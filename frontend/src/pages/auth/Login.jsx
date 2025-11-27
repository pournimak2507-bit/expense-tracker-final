import React, { useState, useContext } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate("/"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-center">
      <Card className="w-full max-w-md p-6 card-glass">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@domain.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mt-2">Password</label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Logging..." : "Login"}
          </Button>
        </form>

        <div className="text-center mt-4 text-sm">
          <a href="/forgot" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="text-center mt-3 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}
