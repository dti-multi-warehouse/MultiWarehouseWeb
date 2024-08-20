import EmailVerificationForm from "./components/EmailVerificationForm";

const EmailVerification: React.FC = () => {
    return(
        <>
        <div className="flex w-full justify-center items-center my-[60px]">
            <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
                <h2 className="font-semibold text-lg">Set Your Password here</h2>
                <span className="text-sm text-gray-600">Thank you <strong>[user-email@mail.com]</strong> , you already verified your email. Please input your password to continue.</span>
                <div className="w-full">
                    <EmailVerificationForm />
                </div>
            </div>
        </div>
        </>
    )
};

export default EmailVerification;