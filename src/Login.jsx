import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./UserContext";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useUser(); 
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        message.success("Login successful 🚀");
        navigate("/webpage");
      } else {
        message.error("Invalid email or password");
      }
    } catch {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-white/20"></div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="relative w-[500px] bg-white/40 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl space-y-6 !p-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back</h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Enter valid email" }]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password placeholder="••••••••" maxLength={8} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Login
          </Button>
        </Form.Item>

        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
