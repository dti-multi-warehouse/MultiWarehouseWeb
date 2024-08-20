import Link from "next/link";
import SignInForm from "./components/SignInForm";

const SignIn: React.FC = () => {
    return(
        <>
        <div className="flex w-full justify-center items-center my-[60px]">
            <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
                <h2 className="font-semibold text-lg">Sign In</h2>
                <span className="text-sm text-center text-gray-500">Dont't have an account yet? <Link href="/sign-up" className="text-red-600">Sign up</Link> </span>
                <div className="w-full">
                    <SignInForm />
                </div>
            </div>
        </div>
        </>
    )
};

export default SignIn;