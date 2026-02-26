import { Link } from "react-router-dom";


const HomeProduct = ({product, productName, productPrice, productImage}) => {

    return (
    <Link to="/product-view" state={{ productData: product }} className="h-full group transition">
      <div className='flex flex-col h-full hover:cursor-pointer'>
          <div className='h-48 flex items-center justify-center'>
            <img src={productImage} className="max-h-full w-full object-contain"/>
          </div>

        <div className="flex flex-col flex-1">
          <div className='p-2 text-base'>
            <h3 className='text-gray-700 text-sm group-hover:text-blue-500'>{productName}</h3>

            <p className='text-2xl'>R$ {productPrice}</p>
            <p className='text-green-600 text-sm'>10x vezes sem juros</p>
          </div>

          <div className='p-3 text-sm text-slate-400 mt-auto'>
            <span className='text-green-600 font-semibold'>Frete grátis</span> por ser sua primeira compra
          </div>  
        </div>
      </div>
    </Link>
    )
}

export default HomeProduct