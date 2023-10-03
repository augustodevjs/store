import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Client, Product } from "../pages"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="client" element={<Client />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}