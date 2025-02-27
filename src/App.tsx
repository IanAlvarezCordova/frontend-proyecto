// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { Productos } from "./pages/Productos";
import { Inventario } from "./pages/Inventario";
import { Movimientos } from "./pages/Movimientos";
import { Pedidos } from "./pages/Pedidos";
import { system } from "@chakra-ui/react/preset";

const App: React.FC = () => {
  return (
    <ChakraProvider value={system}>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;