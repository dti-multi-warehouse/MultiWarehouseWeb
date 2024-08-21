"use client"; 

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/hooks/useUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const SignUpForm: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const registerUser = useRegisterUser();

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/sign-in"); // Redirect after dialog closes
  };

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser.mutate({ email: values.email }, {
            onSuccess: () => setDialogOpen(true),
            onError: () => alert("Failed to send verification email"),
          });
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Email:</label>
            <Field
              type="email"
              name="email"
              placeholder="Input your email"
              className="w-full p-1 border-2 rounded-lg border-gray-300"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-500 w-fit"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium"
          >
            Verify Email
          </button>
        </Form>
      </Formik>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Check Your Email</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction onClick={handleDialogClose} className="bg-red-500">OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignUpForm;
