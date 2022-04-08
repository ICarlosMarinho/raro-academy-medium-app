import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { ArtigosPage } from "./pages/Artigos";
import { ArtigoPage } from "./pages/Artigo";
import { EditarArquivoPage } from "./pages/EditarArtigo";
import { NotFoundPage } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { UserContext } from "./states/UserProvider";
import { useContext, useEffect } from "react";
import { clearTokenDataFromStorage, setTokenDataToStorage } from "./helpers";

function App() {
  const { userState } = useContext(UserContext);

  useEffect(() => {
    if (userState.tokenData) {
      setTokenDataToStorage(userState.tokenData);
    } else {
      clearTokenDataFromStorage();
    }
  }, [userState]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ArtigosPage />} />
          <Route path="/artigo/:id" element={<ArtigoPage />} />

          <Route element={<RequireAuth />}>
            <Route path="artigo/edit/:id" element={<EditarArquivoPage />} />
            <Route path="/artigos" element={<ArtigosPage />} />
            <Route path="/artigos/novo" element={<EditarArquivoPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
