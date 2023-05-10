import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login,Register,Home} from './pages/Index'
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";
import toast, { Toaster } from 'react-hot-toast';
import ActivateAccount from "./pages/auth/ActivateAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Main />
      <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/activate-account/:token" element={<ActivateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />} />
        </Routes>
      </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
