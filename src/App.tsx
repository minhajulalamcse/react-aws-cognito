import { Route, Routes } from "react-router-dom";
import { ChangePasswordPage, HomePage, ResetPasswordPage, SignInPage, SignUpPage, VerifyEmailPage } from "./pages";

function App() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
        </Routes>
    );
}

export default App;
