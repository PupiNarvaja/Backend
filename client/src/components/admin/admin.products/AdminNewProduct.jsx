import React, { useEffect } from 'react'
import { useProductContext } from '../../../Contexts/ProductContext'

const AdminNewProduct = () => {
    const { createNewProduct, newProduct, setNewProduct } = useProductContext()

  return (
    <form>
        <input className="border-2 border-gray-900" placeholder="Title" type="text" name="title" value={newProduct.title} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                title: e.target.value
            })
        }} />
        <input className="border-2 border-gray-900" placeholder="description" type="text" name="description" value={newProduct.description} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                description: e.target.value
            })
        }} />
        <input className="border-2 border-gray-900" placeholder="code" type="text" name="code" value={newProduct.code} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                code: e.target.value
            })
        }} />
        <input className="border-2 border-gray-900" placeholder="img" type="text" name="img" value={newProduct.img} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                img: e.target.value
            })
        }} />
        <input className="border-2 border-gray-900" placeholder="price" type="number" name="price" value={newProduct.price} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                price: e.target.value
            })
        }} />
        <input className="border-2 border-gray-900" placeholder="stock" type="number" name="stock" value={newProduct.stock} onChange={(e) => {
            setNewProduct({
                ...newProduct,
                stock: e.target.value
            })
        }} />
        <button onClick={createNewProduct}>Create product</button>
    </form>
  )
}

export default AdminNewProduct