import AdminSignInForm from "./components/AdminSignInForm";

const SignIn: React.FC = () => {
  return (
    <>
      <>
        <div className="flex w-full justify-center items-center my-[60px]">
          <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
            <h2 className="font-semibold text-lg">Sign In</h2>
            <div className="w-full">
              <AdminSignInForm />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SignIn;