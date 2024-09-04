import ReactQueryProvider from "@/lib/ReactQueryProvider"; 
import SignUpForm from "./components/SignUpForm";

const SignUp: React.FC = () => {
  return (
    <ReactQueryProvider>
      <div className="flex w-full justify-center items-center my-[60px]">
        <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
          <h2 className="font-semibold text-lg">Sign Up Now</h2>
          <span className="text-sm text-gray-500">
            Have an account? Sign in <a href="/sign-in" className="text-red-600">here</a>
          </span>
          <div className="w-full">
            <SignUpForm />
          </div>
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default SignUp;
