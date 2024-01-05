import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Layout } from "./layout";
import { BlogListPage } from "./pages/blog/list";
import { BlogNewArticlePage } from "./pages/blog/new";
import { DashboardPage } from "./pages/dashboard";
import { UsersListPage } from "./pages/users/list";
import { UsersSettingsPage } from "./pages/users/settings";
const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/blog/" element={<BlogListPage />} />
          <Route path="/blog/new" element={<BlogNewArticlePage />} />

          <Route path="/users/" element={<UsersListPage />} />

          <Route path="/users/settings" element={<UsersSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
