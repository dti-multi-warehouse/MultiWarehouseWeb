import ReactQueryProvider from "@/lib/ReactQueryProvider"; 
import ResetPasswordForm from "./components/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center items-center my-[60px]">
        <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
          <h2 className="font-semibold text-lg">Reset Your Password</h2>
          <span className="text-sm text-gray-500">
            Enter your email to receive a password reset link.
          </span>
          <div className="w-full">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
