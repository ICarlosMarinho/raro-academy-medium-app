import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { ArtigosPage } from "./pages/Artigos";
import { ArtigoPage } from "./pages/Artigo";
import { EditarArquivoPage } from "./pages/EditarArtigo";
import { NotFoundPage } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { getArticles, getMyArticles } from "./services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<ArtigosPage request={getArticles} />} />
          <Route path="/artigo/:id" element={<ArtigoPage />} />

          <Route element={<RequireAuth />}>
            <Route path="artigo/edit/:id" element={<EditarArquivoPage />} />
            <Route path="/artigos" element={<ArtigosPage request={getMyArticles} />} />
            <Route path="/artigos/novo" element={<EditarArquivoPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
