

import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

const Index = () => {

      const [form] = Form.useForm();
      const navigate = useNavigate();
      const { currentUser, updateUser, logout } = useUser();
      const [profileImage, setProfileImage] = useState(null);
      useEffect(() => {
    if (!currentUser) {
      message.error("No user logged in");
      navigate("/login");
      return;
    }
    form.setFieldsValue(currentUser);
    setProfileImage(currentUser.profileImage || null);
  }, [currentUser, form, navigate]);
 
  // Convert file to base64 for image upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
 
  const handleImageUpload = async (info) => {
    const { file } = info;
 
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }
 
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
 
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
 
    try {
      const base64 = await getBase64(file);
      setProfileImage(base64);
      message.success("Image uploaded successfully!");
    } catch {
      message.error("Failed to upload image");
    }
 
    return false; // prevent default upload
  };
 
  const handleUpdate = async () => {
    const values = form.getFieldsValue();
    await updateUser({ ...values, profileImage });
    message.success("Profile updated successfully 🚀");
  };
 
  const handleCancel = () => {
    navigate(-1);
  };
 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
    return (
        <>
            <main className="flex-1 p-8">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>

                    {/* Profile Picture */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                                        <div className="text-4xl text-gray-400">👤</div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-2 right-2">
                                <Upload
                                    beforeUpload={handleImageUpload}
                                    showUploadList={false}
                                    accept="image/*"
                                >
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<UploadOutlined />}
                                        size="small"
                                        className="shadow-lg"
                                    />
                                </Upload>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <Form form={form} layout="vertical" className="space-y-6">
                        <Form.Item label="Full Name" name="fullName">
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        <Form.Item label="Email" name="email">
                            <Input placeholder="example@mail.com" />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input maxLength={10} placeholder="9876543210" />
                        </Form.Item>

                        <Form.Item label="Gender" name="gender">
                            <Select placeholder="Select Gender">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="flex gap-4">
                            <Button type="primary" onClick={handleUpdate} className="flex-1">
                                Update Profile
                            </Button>
                            <Button type="default" onClick={handleCancel} className="flex-1">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </main>
       

    </>
  )
}

export default Index
