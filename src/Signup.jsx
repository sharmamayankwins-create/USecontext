import { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, fetchUsers } from './Store/ userSlice';

function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  // Load users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoading(true);

    if (users.some(u => u.email.toLowerCase() === values.email.toLowerCase())) {
      message.error("Email already exists!");
      setLoading(false);
      return;
    }

    const { confirm_password, ...userData } = values;
    userData.id = Date.now();

    try {
      await dispatch(signupUser(userData)).unwrap();
      message.success("Account created");
      form.resetFields();
      navigate("/login");
    } catch {
      message.error("Signup failed");
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
        className="relative w-[440px] bg-white/40 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl space-y-6 !p-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">Create Your Account</h2>

        <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password maxLength={8} autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue("password") === value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Passwords do not match!"));
              }
            })
          ]}
        >
          <Input.Password maxLength={8} autoComplete="new-password" />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, pattern: /^\d{10}$/ }]}>
          <Input maxLength={10} placeholder="9876543210" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" initialValue="male">
          <Radio.Group className="flex gap-4">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="terms" valuePropName="checked" rules={[{ required: true, message: "Accept terms" }]}>
          <Checkbox>I agree to Terms & Conditions</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Create Account
        </Button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Signup;