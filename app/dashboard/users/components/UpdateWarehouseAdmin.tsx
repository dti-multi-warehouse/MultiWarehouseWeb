"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useGetWarehouseAdminById, useUpdateWarehouseAdmin } from '@/hooks/useAdmin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AlertDialog from '@/components/AlertDialog';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import Buttons from '@/components/Buttons';

const UpdateWarehouseAdmin: React.FC<{ adminId: number }> = ({ adminId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog open/close
  const queryClient = useQueryClient();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const { data: adminData, isLoading, isError } = useGetWarehouseAdminById(adminId);
  const updateWarehouseAdminMutation = useUpdateWarehouseAdmin();

  const CreateWarehouseAdminSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().optional(),
    avatar: Yup.mixed()
      .nullable()
      .test('fileSize', 'File size too large', (value: any) => {
        return !value || (value && value.size <= 1 * 1024 * 1024);
      })
      .test('fileType', 'Unsupported file format', (value: any) => {
        return (
          !value ||
          (value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type))
        );
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading admin data</div>;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        className="py-1 px-5 bg-red-600 text-white rounded-xl flex justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500"
        onClick={() => setDialogOpen(true)}
      >
        Edit
      </DialogTrigger>
      <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center p-5 pb-0">Edit Warehouse Admin</DialogTitle>
          <DialogDescription className="text-center p-5">
            Update the details of the warehouse admin.
          </DialogDescription>
          <hr className="border-dashed border-gray-800" />
        </DialogHeader>

        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Admin Update"
          description={alertMessage}
          actionLabel="OK"
        />

        <Formik
          initialValues={{
            username: adminData.data.username || '',
            email: adminData.data.email || '',
            password: '',
            avatar: null,
          }}
          validationSchema={CreateWarehouseAdminSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            if (values.password) formData.append('password', values.password);
            if (values.avatar) formData.append('avatar', values.avatar);

            try {
              await updateWarehouseAdminMutation.mutateAsync({ id: adminId, data: formData });
              setAlertMessage('Warehouse admin updated successfully!');
              queryClient.invalidateQueries(['warehouseAdmin', adminId]);
              setSubmitting(false);
              setDialogOpen(false);
              window.location.reload();
            } catch (error) {
              setAlertMessage('Failed to update warehouse admin.');
              setAlertOpen(true);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="p-5 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Username"
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
                  placeholder="Enter Email"
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="password">
                  Password (leave blank to keep current password)
                </label>
                <div style={{ position: 'relative' }}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter new password (optional)"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
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
                      setFieldValue('avatar', event.currentTarget.files[0]);
                    } else {
                      setFieldValue('avatar', null);
                    }
                  }}
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
                <p className="text-xs font-semibold text-red-500">
                  * File must be less than 1 MB and in JPG, JPEG, PNG, or GIF format.
                </p>
                {errors.avatar && touched.avatar && <div className="text-red-500">{errors.avatar}</div>}
              </div>

              <div className="flex items-center justify-end gap-5">
                <Buttons
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </Buttons>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWarehouseAdmin;
