"use client";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
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

const EditProfileSchema = Yup.object().shape({
  username: Yup.string().notRequired(),
  email: Yup.string().email("Invalid email format").notRequired(),
  password: Yup.string().notRequired(),
  avatar: Yup.mixed()
    .nullable()
    .test("fileSize", "File size too large", (value: any) => {
      return !value || (value && value.size <= 1 * 1024 * 1024);
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      return (
        !value ||
        (value && ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type))
      );
    }),
});

const EditProfileDialog: React.FC = () => {
  const { data: session } = useSession();
  const { profile, isLoading, error, refetch } = useGetProfile();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const updateProfile = useUpdateProfile();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  const isSocialUser = profile?.social === true;

  return (
    <Dialog>
      <DialogTrigger className="py-2 px-5 bg-red-600 text-white rounded-lg">Edit Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>Update your profile information, avatar, and password.</DialogDescription>
        </DialogHeader>

        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Profile Update"
          description={alertMessage}
          actionLabel="OK"
        />

        <Formik
          initialValues={{
            username: profile?.username || "",
            email: profile?.email || "",
            password: "",
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
            if (values.email !== profile?.email && values.email && !isSocialUser) {
              formData.append("email", values.email);
            }
            if (values.password && !isSocialUser) {
              formData.append("password", values.password);
            }

            if (values.avatar) {
              formData.append("avatar", values.avatar);
            }

            try {
              await updateProfile.mutateAsync(formData);
              setAlertMessage("Profile updated successfully!");
              refetch();
            } catch (error) {
              setAlertMessage("Failed to update profile.");
            } finally {
              setAlertOpen(true);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="p-5 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="username">
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
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={`w-full p-1 border-2 rounded-lg border-gray-300 ${isSocialUser ? "bg-gray-200" : "bg-white"}`}
                  disabled={isSocialUser}
                />
                {!isSocialUser && (
                  <p className="text-xs font-semibold text-red-500">
                    * If you change the email, you'll need to verify your new email.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="password">
                  Change Password
                </label>
                <div style={{ position: "relative" }}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter new password"
                    className={`w-full p-1 border-2 rounded-lg border-gray-300 ${isSocialUser ? "bg-gray-200" : "bg-white"}`}
                    disabled={isSocialUser}
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
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="avatar">
                  Update Avatar (Optional)
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={(event) => {
                    if (event.currentTarget?.files && event.currentTarget.files.length > 0) {
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    } else {
                      setFieldValue("avatar", null); 
                    }
                  }}
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
                <p className="text-xs font-semibold text-red-500">
                  * File must be less than 1 MB and in JPG, JPEG, PNG, or GIF format.
                </p>
              </div>

              <div className="flex items-center justify-end gap-5">
                <button
                  className="py-1 px-10 bg-red-600 text-white rounded-xl flex justify-center font-bold items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
