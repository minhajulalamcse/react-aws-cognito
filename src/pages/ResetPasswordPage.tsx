import { useEffect, useState } from "react";
import { PageWrapper, ResetPasswordStep1Form, ResetPasswordStep2Form } from "../components";

const VerifyEmailPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const checkEmail = () => {
            const email = localStorage.getItem("email");
            if (email) {
                setEmail(email);
            }
        };

        window.addEventListener("storage", checkEmail);
        return () => {
            window.removeEventListener("storage", checkEmail);
        };
    }, []);

    return <PageWrapper>{email ? <ResetPasswordStep2Form /> : <ResetPasswordStep1Form />}</PageWrapper>;
};

export default VerifyEmailPage;
