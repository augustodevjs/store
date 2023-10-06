import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Client, Product, Home, Preference } from "../pages"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="client" element={<Client />} />
        <Route path="product" element={<Product />} />
        <Route path="preferences" element={<Preference />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}