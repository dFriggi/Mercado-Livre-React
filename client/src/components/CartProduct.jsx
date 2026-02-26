import { Link } from "react-router-dom";
import { useContext } from 'react'
import { CartContext } from '../App'

const CartProduct = ({product, productQuantity}) => {

    const { updateQuantity, deleteProductCart } = useContext(CartContext) 

    const handleIncrease = (e) => {
        e.preventDefault();
        if (productQuantity < product.quantity) {
            updateQuantity(product._id, productQuantity + 1);
        }
    }

    console.log(product._id);
    

    const handleDecrease = (e) => {
        e.preventDefault();
        if (productQuantity > 1) {
            updateQuantity(product._id, productQuantity - 1);
        }
    }

    return (
      <div className="bg-white rounded-md border border-gray-200 mb-4 shadow-sm">
        <div className="p-3 border-b flex items-center gap-2">
          <input type="checkbox"/>
          <span className="font-semibold text-sm">Produtos de NOME DA LOJA</span>
        </div>

        <div className="flex gap-1">
          <div className="flex items-start pt-2 pl-3">
            <input type="checkbox"/>
          </div>

          <Link to="/product-view" state={{ productData: product }} >
            <div className='w-36 h-36 p-2'>
              <img src={product.imageUrl} className="object-contain w-full h-full "/>
            </div>
          </Link>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between pt-2">
              <Link to="/product-view" state={{ productData: product }}>
                <h3 className="text-base line-clamp-2 pr-2">{product.name}</h3>
              </Link>
              <button className="text-base text-slate-400 font-semibold hover:text-red-600"
              onClick={(e) => {
                e.preventDefault()
                deleteProductCart(product._id)
              }}>X</button>
              <span className="text-xl font-medium pl-3 pr-5">R$ {product.price*productQuantity}</span>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex border rounded-md items-center p-1 hover:cursor-pointer">
                <button className={`h-1 w-4 p-2 pb-3 flex items-center justify-center text-4xl ${productQuantity > 1 ? 'text-blue-500 hover:bg-blue-300/50 hover:rounded-sm' : 'text-slate-300'}`} onClick={handleDecrease}>-</button>
                <span className="text-center px-6">{productQuantity}</span>
                <button className={`h-1 w-4 p-2 pb-3 flex items-center justify-center text-2xl ${productQuantity < product.quantity ? 'text-blue-500 hover:bg-blue-300/50 hover:rounded-sm' : 'text-slate-400'}`} onClick={handleIncrease}>+</button>
              </div>  
              <span className="text-xs text-gray-400">{product.quantity} disponíveis</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CartProduct