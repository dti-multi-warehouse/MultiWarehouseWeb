"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useUpdateProfile, useGetProfile } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Buttons from "@/components/Buttons";

const EditProfileSchema = Yup.object().shape({
  username: Yup.string().notRequired(),
  email: Yup.string().email("Invalid email format").notRequired(),
  avatar: Yup.mixed()
    .nullable()
    .test("fileSize", "File size too large", (value) => {
      return !value || (value as File).size <= 1 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        !value ||
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          (value as File).type
        )
      );
    }),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string(),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must be different from the current password"
    ),
});

const EditProfileDialog: React.FC = () => {
  const { data: session } = useSession();
  const { profile, isLoading, error, refetch } = useGetProfile();
  const [showPassword, setShowPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  const updateProfile = useUpdateProfile();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  const isSocialUser = profile?.social === true;

  return (
    <Dialog>
      <DialogTrigger className="py-2 px-5 bg-red-600 text-white rounded-lg">
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>
            Update your profile information, avatar, and password.
          </DialogDescription>
        </DialogHeader>

        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Profile Update"
          description={alertMessage}
          actionLabel="OK"
        />

        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Formik
              initialValues={{
                username: profile?.username || "",
                email: profile?.email || "",
                avatar: null,
              }}
              validationSchema={EditProfileSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();
                const userId = session?.user?.id;

                if (!userId) {
                  setAlertMessage("User is not logged in.");
                  setAlertOpen(true);
                  return;
                }

                formData.append("userId", userId);

                if (values.username !== profile?.username && values.username) {
                  formData.append("username", values.username);
                }
                if (
                  values.email !== profile?.email &&
                  values.email &&
                  !isSocialUser
                ) {
                  formData.append("email", values.email);
                }
                if (values.avatar) {
                  formData.append("avatar", values.avatar);
                }

                if (
                  formData.has("username") ||
                  formData.has("email") ||
                  formData.has("avatar")
                ) {
                  try {
                    await updateProfile.mutateAsync(formData);
                    setAlertMessage("Profile updated successfully!");
                    refetch();
                  } catch (error) {
                    setAlertMessage("Failed to update profile.");
                  } finally {
                    setAlertOpen(true);
                  }
                } else {
                  setAlertMessage("No changes detected.");
                  setAlertOpen(true);
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="p-5 flex flex-col gap-5">
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Your Username"
                      className="w-full p-1 border-2 rounded-lg border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className={`w-full p-1 border-2 rounded-lg border-gray-300 ${
                        isSocialUser ? "bg-gray-200" : "bg-white"
                      }`}
                      disabled={isSocialUser}
                    />
                    {!isSocialUser && (
                      <p className="text-xs font-semibold text-red-500">
                        * If you change the email, you'll need to verify your
                        new email.
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="avatar"
                    >
                      Update Avatar (Optional)
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={(event) => {
                        if (
                          event.currentTarget?.files &&
                          event.currentTarget.files.length > 0
                        ) {
                          setFieldValue("avatar", event.currentTarget.files[0]);
                        } else {
                          setFieldValue("avatar", null);
                        }
                      }}
                      className="w-full p-1 border-2 rounded-lg border-gray-300"
                    />
                    <p className="text-xs font-semibold text-red-500">
                      * File must be less than 1 MB and in JPG, JPEG, PNG, or
                      GIF format.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-5">
                    <Buttons type="submit" disabled={isSubmitting}>
                      Save Changes
                    </Buttons>
                  </div>
                </Form>
              )}
            </Formik>
          </TabsContent>

          {/* Change Password Tab */}
          <TabsContent value="password">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
              }}
              validationSchema={PasswordSchema}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                const formData = new FormData();
                formData.append("userId", session?.user?.id || "");
                formData.append("currentPassword", values.currentPassword);
                formData.append("newPassword", values.newPassword);
              
                try {
                  await updateProfile.mutateAsync(formData);
                  setAlertMessage("Password changed successfully!");
                  setAlertOpen(true); 
                } catch (error: any) {
                  if (error.response?.data === "Current password is incorrect.") {
                    setFieldError("currentPassword", "Current password is incorrect.");
                  } else {
                    setAlertMessage("Failed to change password.");
                    setAlertOpen(true); 
                  }
                } finally {
                  setSubmitting(false);
                }
              }}              
            >
              {({ isSubmitting }) => (
                <Form className="p-5 flex flex-col gap-5">
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="currentPassword"
                    >
                      Current Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Field
                        type={showPassword ? "password" : "text"}
                        name="currentPassword"
                        placeholder="Enter current password"
                        className="w-full p-1 border-2 rounded-lg border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                    <div className="text-red-600 text-xs">
                      <ErrorMessage name="currentPassword" />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Field
                        type={showNewPassword ? "password" : "text"}
                        name="newPassword"
                        placeholder="Enter new password"
                        className="w-full p-1 border-2 rounded-lg border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                    <div className="text-red-600 text-xs">
                      <ErrorMessage name="newPassword" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-5">
                    <Buttons type="submit" disabled={isSubmitting}>
                      Save Password
                    </Buttons>
                  </div>
                </Form>
              )}
            </Formik>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;