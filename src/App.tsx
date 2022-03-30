import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { ArtigosPage } from "./pages/Artigos";
import { ArtigoPage } from "./pages/Artigo";
import { MeusArtigosPage } from "./pages/MeusArtigos";
import { EditarArquivoPage } from "./pages/EditarArtigo";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ArtigosPage />} />
        <Route path="/artigo/:id" element={<ArtigoPage />} />
        <Route path="/artigos" element={<MeusArtigosPage />} />
        <Route path="/artigos/editar/:id" element={<EditarArquivoPage />} />
        <Route path="/artigos/novo" element={<EditarArquivoPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
