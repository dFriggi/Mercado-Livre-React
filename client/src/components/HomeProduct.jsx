const HomeProduct = () => {

    return (
      <div className='bg-white flex flex-col shadow-xl'>
        <div className='items-center justify-center p-3'>
          Imagem
        </div>
        <div className='p-3 text-lg'>
          <h3 className='text-gray-700'>Nome do produto</h3>
          <p className='text-base'>R$ Preço</p>
        </div>
      </div>
    )
}

export default HomeProduct