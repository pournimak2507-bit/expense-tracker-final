import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { register as registerAPI } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
    currency: "INR",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match");

    setLoading(true);
    try {
      await registerAPI(form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-center px-4">
      <Card className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <Input
            name="email"
            className="col-span-2"
            placeholder="Email"
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <Input name="city" placeholder="City" onChange={handleChange} />
          <Input name="country" placeholder="Country" onChange={handleChange} />

          <Input
            className="col-span-2"
            name="currency"
            placeholder="Currency (e.g. INR)"
            onChange={handleChange}
          />

          <Button className="w-full col-span-2 mt-4" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </Button>
        </form>

        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600">
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}
