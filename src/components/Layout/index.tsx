import { Outlet } from "react-router-dom";
import ArticlesProvider from "../../states/ArticlesProvider";
import { Header } from "../Header";

export const Layout = () => (
  <>
    <Header />
    <ArticlesProvider>
      <main>
        <Outlet />
      </main>
    </ArticlesProvider>
  </>
);
