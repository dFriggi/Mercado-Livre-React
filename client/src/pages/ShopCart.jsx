import CartProduct from '../components/CartProduct'
import { useContext } from 'react'
import { CartContext } from '../App' 


const ShopCart = () => {
    const { cart, buyCart } = useContext(CartContext)

    const total = cart.reduce((acc, prod) => acc + (prod[0].price        * prod[1]), 0)

    const List = () => {
        const listProducts = cart.map((item, index) => 
            <li key={index} className='h-full'>
                <CartProduct
                product={item[0]}
                productQuantity={item[1]}                
                />
            </li>
          ) 
        return(
        <ul className="flex flex-col w-full gap-1">
          {listProducts}
        </ul>
        )
    }

    if (cart.length === 0) return <h1>O carrinho está vazio</h1>;
    return (
        <div className='max-w-[1200px] mx-auto p-4'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className='lg:col-span-2'>
                    <div className=' h-auto items-center justify-center'>
                        <div className='flex flex-row'>
                            <List />
                        </div>
                    </div>             
                </div>

                <div className='lg:col-span-1'>
                    <div className="bg-white rounded-md shadow-sm mb-4">
                        <div className="p-3 mb-2 border-b flex items-center gap-2">
                            <span className="font-semibold text-sm">Produtos de NOME DA LOJA</span>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row p-3 py-1 justify-between'>
                                <p className='text-sm'>{cart.length > 1 ? `Produtos (${cart.length})` : 'Produto'}</p>
                                <p className='text-sm'>R$ {total.toFixed(2)}</p>
                            </div>

                            <div className='flex flex-row p-3 py-1 justify-between'>
                                <p className='text-sm'>{cart.length > 1 ? `Fretes (${cart.length})` : 'Frete'}</p>
                                <p className='text-sm text-green-600 font-semibold'>Grátis</p>
                            </div>

                            <div className='flex flex-row p-3 py-6 justify-between'>
                                <p className='text-lg font-medium'>Total</p>
                                <p className='text-lg font-medium'>R$ {total.toFixed(2)}</p>
                            </div>

                            <div className="p-5 pt-0">
                                <button onClick={() => buyCart()} className="hover:cursor-pointer text-white bg-blue-500 hover:bg-blue-700/90 p-3 rounded-md font-semibold text-center w-full">Continuar a compra</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
 }

export default ShopCart