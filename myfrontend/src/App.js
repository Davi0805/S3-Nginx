import React, { lazy, Suspense, useState } from "react";
import { CircularProgress, LinearProgress } from '@mui/material';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./authContext"; 
/* import Topbar from "./Scenes/Global/Topbar";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import { LoginSignup } from "./Scenes/LoginSignup/LoginSignup";

import Detalhes from "./Scenes/Detalhes/Detalhes";
import PaginaPedidos from "./Scenes/Pedidos/PaginaPedidos"; */
import PrivateRoute from "./PrivateRoute";
import { Register } from "./Scenes/Register/Register";


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Funcionarios from "./Scenes/Funcionarios/Funcionarios";

const Topbar = lazy(() => import('./Scenes/Global/Topbar'));
const Dashboard = lazy(() => import('./Scenes/Dashboard/Dashboard'));
const LoginSignup = lazy(() => import('./Scenes/LoginSignup/LoginSignup'));
const Detalhes = lazy(() => import('./Scenes/Detalhes/Detalhes'));
const PaginaPedidos = lazy(() => import('./Scenes/Pedidos/PaginaPedidos'));

const Clientes = lazy(() => import('./Scenes/Clientes/Clientes'));

const Relatorios = lazy(() => import('./Scenes/Relatorios/Relatorios'));

const Sidebar = lazy(() => import('./Scenes/Global/Sidebar')); // Import the Sidebar component


const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true); // Add state for sidebar collapsed

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed); // Toggle sidebar collapsed state
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Router>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Sidebar 
                  isCollapsed={isSidebarCollapsed} 
                  onToggle={handleSidebarToggle} 
                /> {/* Pass collapsed state and toggle handler */}
                <main className="content">
                  <Suspense fallback={<LinearProgress color="inherit" />}>
                    <Topbar onSidebarToggle={handleSidebarToggle} /> {/* Pass toggle handler to Topbar */}
                    <Routes>
                      <Route path="/" element={<LoginSignup />} />
                      <Route path="/register" element={<Register />} />
                      <Route element={<PrivateRoute />}>
                        <Route path="/dashboard/detalhes/:id/" element={<Detalhes />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/pedidos" element={<PaginaPedidos />} />
                        <Route path="/dashboard/clientes" element={<Clientes />} />
                        <Route path="/dashboard/relatorios" element={<Relatorios />} />
                        <Route path="/dashboard/funcionarios" element={<Funcionarios/>} />
                      </Route>
                    </Routes>
                  </Suspense>
                </main>
              </QueryClientProvider>
            </AuthProvider>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
