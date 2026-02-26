import { useState, useEffect } from 'react'
import axios from 'axios'
import HomeProduct from '../components/HomeProduct'
import { Button } from '../components/ui/button'

function Home({ searchBar }) {
  const [products, setProducts] = useState([])

  const API_URL = 'http://localhost:5000/products'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async() => {
    try {
      const resp = await axios.get(API_URL)
      setProducts(resp.data)
      console.log(products);
    } catch (err) {
      console.error('Erro ao buscar produtos FRONTEND', err);
    }
  }
  
  const filteredProducts = products.filter((product) => {
    const term = searchBar ? searchBar.toLowerCase() : "";
    const productName = product.name ? product.name.toLowerCase() : "";

    return productName.includes(term);
  })

  const List = () => {
    const listProducts = filteredProducts.map((product) => 
        <li key={product._id} className='h-full'>
          <HomeProduct
          product={product}
          productName={product.name}
          productPrice={product.price}
          productImage={product.imageUrl}/>
        </li>
      ) 
    return(
    <ul className="grid grid-cols-6 w-full gap-5">
      {listProducts}
    </ul>
    )
  }

  return (
    <>
    
    <div className="flex justify-center w-full">              

      <div className=' bg-white w-full items-center justify-center rounded-sm'>
        <div className='pl-4 pt-3 pb-6 text-lg font-semibold'>
          <h1>Inspirado no último visto</h1>
          
        </div>
        <div className='flex flex-row gap-5 p-5'>
          <List />
        </div>
      </div>

    </div>
    </>
  )
}

export default Home
