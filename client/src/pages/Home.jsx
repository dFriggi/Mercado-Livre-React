import { useState, useEffect } from 'react'
import axios from 'axios'
import HomeProduct from '../components/HomeProduct'
import { Button } from '../components/ui/button'
import EditDialog from '../components/EditDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"

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
    } catch (err) {
      console.error('Erro ao buscar produtos', err);
    }
  }
  
  const filteredProducts = products.filter((product) => {
     return product.name.toLowerCase().includes(searchBar.toLowerCase())
  })

  const List = () => {
    const listProducts = filteredProducts.map((product) => 
        <li key={product._id} className="flex justify-between items-center p-3 border-b border-gray-300 hover:bg-gray-50 rounded transition">
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{product.name}</span>
            <span className="text-sm text-gray-500">{product.email}</span>
          </div>
          
          <div className="flex gap-2">

              <EditDialog product={product} refreshproducts={fetchProducts}/>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-400"
                    title="Deletar"
                  >
                    🗑️
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não pode ser desfeita. Isso excluirá permanentemente o usuário <b>{product.name}</b>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(product._id)}
                    >
                      Sim, deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </li>
      ) 
    return(
    <ul className="space-y-3">
      {listProducts}
    </ul>
    )
  }

  return (
    <>
    <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center"></h1>
    <div className="flex justify-center w-full">              
      <List />

      <div className='flex flex-row gap-3'>
        <HomeProduct />
        <HomeProduct />
        <HomeProduct />
        <HomeProduct />
        <HomeProduct />
      </div>

    </div>
    </>
  )
}

export default Home
