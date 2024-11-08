import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import ComputerDetail from "./pages/computerDetail/ComputerDetail";

function App() {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard/computadores" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard/computadores"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard/computadores/:id"
          element={
            token ? <ComputerDetail /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
