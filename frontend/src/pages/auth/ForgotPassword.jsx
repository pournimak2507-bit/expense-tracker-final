import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { forgotPassword } from "../../services/authServices";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email });
      alert("If an account exists, a reset email has been sent.");
    } catch {
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-center">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={submit}>
          <label className="text-sm text-gray-600">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
          />
          <Button className="w-full mt-4">
            {loading ? "Sending..." : "Send Link"}
          </Button>
        </form>

        <div className="text-center mt-4 text-sm">
          Back to{" "}
          <a href="/login" className="text-indigo-600">
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}
