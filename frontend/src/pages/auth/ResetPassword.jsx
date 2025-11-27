import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { resetPassword } from "../../services/authServices";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (pass !== confirm) return alert("Passwords do not match");

    try {
      await resetPassword(token, { password: pass });
      alert("Password updated!");
      navigate("/login");
    } catch {
      alert("Reset failed.");
    }
  };

  return (
    <div className="auth-center">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create New Password
        </h2>

        <form onSubmit={submit}>
          <label className="text-sm text-gray-600">New Password</label>
          <Input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <label className="text-sm text-gray-600 mt-4">Confirm Password</label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button className="w-full mt-5">Save Password</Button>
        </form>
      </Card>
    </div>
  );
}
