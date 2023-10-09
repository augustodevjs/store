import { MainLayout } from "../shared"
import { Client, Product, AddPreference, Preference } from "../pages"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/preference" />} />
          <Route path="/preference" element={<Preference />} />
          <Route path="/preference/cadastro" element={<AddPreference />} />
          <Route path="/client" element={<Client />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}