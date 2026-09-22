import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateInvitation from "./pages/CreateInvitation";
import Invitation from "./pages/Invitation";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public birthday invitation */}
        <Route
          path="/"
          element={<Invitation />}
        />

        {/* Invitation creator */}
        <Route
          path="/create"
          element={<CreateInvitation />}
        />

        {/* Direct invitation URL */}
        <Route
          path="/invitation"
          element={<Invitation />}
        />

        {/* Optional home page */}
        <Route
          path="/home"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;