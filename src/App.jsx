import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateInvitation from "./pages/CreateInvitation";
import Invitation from "./pages/Invitation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/create"
          element={<CreateInvitation />}
        />

        <Route
          path="/invitation"
          element={<Invitation />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;