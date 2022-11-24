import { Route, Routes } from "react-router-dom";
import { SignInPage, SignUpPage, VerifyEmailPage } from "./pages";

function App() {
    return (
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
    );
}

export default App;
