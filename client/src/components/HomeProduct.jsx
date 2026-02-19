import imagem from '../assets/img/veja.png'

const HomeProduct = () => {

    return (
      <div className='flex flex-col'>
        <div className='items-center justify-center bg-slate-100'>
          <img src={imagem} />
        </div>
        <div className='p-2 text-base'>
          <h3 className='text-gray-700 text-sm'>Nome do produto</h3>
          <p className='text-2xl'>R$ 19,99</p>
          <p className='text-green-600 text-sm'>10x vezes sem juros</p>
        </div>
        <div className='p-3 text-sm text-slate-400'>
          <span className='text-green-600 font-semibold'>Frete grátis</span> por ser sua primeira compra
        </div>
      </div>
    )
}

export default HomeProduct