import { Route, Routes } from "react-router-dom";
import { ResetPasswordPage, SignInPage, SignUpPage, VerifyEmailPage } from "./pages";

function App() {
    return (
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
    );
}

export default App;
