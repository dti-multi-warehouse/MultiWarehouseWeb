"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const SignUpForm: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
          router.push("/email-verification");
        }}
      >
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
          <div className=" flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Email:</label>
            <Field
              type="email"
              name="email"
              placeholder="Input your email"
              className="w-full p-1 border-2 rounded-lg border-gray-300"
            />
            <ErrorMessage name="email" component="div" className="text-sm text-red-500 w-fit" />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium">Verifify Email</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
