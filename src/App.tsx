import { Route, Routes } from "react-router-dom";
import { SignInPage, SignUpPage } from "./pages";

function App() {
    return (
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
        </Routes>
    );
}

export default App;
