import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login,Register,Home} from './pages/Index'
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";


function App() {
  return (
    <BrowserRouter>
      <Main />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
