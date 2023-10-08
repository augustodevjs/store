import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Client, Product, AddPreference, Preference } from "../pages"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/preference" />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/preference/cadastro" element={<AddPreference />} />
        <Route path="/client" element={<Client />} />
        <Route path="/product" element={<Product />} />
      </Routes>

    </BrowserRouter>
  )
}