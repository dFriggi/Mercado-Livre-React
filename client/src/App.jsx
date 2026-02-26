import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductView from './pages/ProductView'
import Home from './pages/Home'
import Manager from './pages/Manager'
import ShopCart from './pages/ShopCart'
import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
import axios from 'axios'

export const CartContext = createContext({})

function App() {
  const [searchBar, setSearchBar] = useState('')
  const [cart, setCart] = useState([])

  const API_URL = 'http://localhost:5000/products'

  const updateQuantity = (productId, newQtd) => {
    setCart(oldCart => 
      oldCart.map(prod => {
        return prod[0]._id === productId ? [prod[0], newQtd] : prod
      })
    )
  }

  const addCart = (productData, productQtd) => {
    setCart(lastProducts => [[productData, productQtd], ...lastProducts])
  }

  const buyCart = async() => {
    try{
        const buyPromises = cart.map((prod) => {
        const prodData = prod[0]
        const purchasedQtd = prod[1]

        const updatedProduct = {
          name: prodData.name,
          price: prodData.price,
          category: prodData.category,
          quantity: prodData.quantity - purchasedQtd,
          description: prodData.description,
          imageUrl: prodData.imageUrl
        }

        console.log("Enviando para ID:", prodData._id, updatedProduct);

        return axios.put(`${API_URL}/${prodData._id}`, updatedProduct)
      })

      console.log('cheguei aqui');
      
      await Promise.all(buyPromises)

      console.log('cheguei aqui 2');
      setCart([])
      localStorage.removeItem('cart_data');

      alert('Compra foi realizada!')
    } catch (err) {
      console.error('Erro ao comprar', err);
    }
  }
  
  const deleteProductCart = (productId) =>{
    setCart(oldCart => oldCart.filter(prod => prod[0]._id !== productId))
  }

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, updateQuantity, deleteProductCart, buyCart, addCart }}>
        <div className="relative min-h-screen min-w-screen bg-gray-100 font-sans overflow-hidden">
          <div className="min-h-screen min-w-screen bg-gray-200 font-sans">

            <Navbar search={searchBar} setSearch={setSearchBar}/>

            <main className="container mx-auto p-4 md:p-4">

              <Routes>
                <Route path='/' element={<Home search={searchBar}/>} />
                <Route path='/manager' element={<Manager />} />
                <Route path='/product-view' element={<ProductView />}/>
                <Route path='/shopcart' element={<ShopCart />}/>
              </Routes>

            </main>
          </div>
        </div>
      </CartContext.Provider>
    </>
  )
}

export default App
