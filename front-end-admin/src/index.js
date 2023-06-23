import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormFuncionario from "./pages/form-funcionario";
import FormCliente from "./pages/form-cliente";
import FormAgenda from "./pages/form-agenda";
import FormProcedimento from "./pages/form-procedimento";
import FormVendas from "./pages/form-vendas";
import Lagenda from "./pages/list-agenda";
import ListaClientes from "./pages/list-clientes";
import Principal from "./pages/principal";
import AgendaEditar from "./pages/agenda-edicao";
import ListaVendas from "./pages/list-vendas";
import ListaFuncionario from "./pages/list-funcionario";
import ListaProcedimento from "./pages/list-procedimento";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Principal className="nav-bar" />
      <Routes>
        <Route path="/cliente" element={<FormCliente />} />
        <Route path="/funcionario" element={<FormFuncionario />} />
        <Route path="/agenda" element={<FormAgenda />} />
        <Route path="/procedimento" element={<FormProcedimento />} />
        <Route path="/venda" element={<FormVendas />} />
        <Route path="/lista" element={<Lagenda />} />
        <Route path="/:id" element={<AgendaEditar />} />
        <Route path="/lista-cliente" element={<ListaClientes />} />
        <Route path="/lista-vendas" element={<ListaVendas />} />
        <Route path="/lista-funcionario" element={<ListaFuncionario />} />
        <Route path="/lista-procedimento" element={<ListaProcedimento />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
