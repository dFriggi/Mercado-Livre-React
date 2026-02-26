import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Controller } from "react-hook-form";


const categories = [
  "Alimentar",
  "Beleza",
  "Eletrônicos",
  "Saúde",
  "Brinquedos",
  "Instrumentos",
  "Casa"
]

function Manager() {
  const [lastAdd, setLastAdd] = useState(null)
  
  const { register, handleSubmit, formState: { errors }, reset, control} = useForm()

  const API_URL = 'http://localhost:5000/products'

  const onSubmit = async(data) => {
    const newProduct = {
      name: data.productName,
      price: data.productPrice,
      category: data.productCategory,
      quantity: data.productQuantity,
      description: data.productDescription,
      imageUrl: data.productImage,
    }

    try{
      await axios.post(API_URL, newProduct)
        
      setLastAdd(newProduct.name)
      console.log(lastAdd);
      reset()
    } catch(err) {
      console.error(err.response?.data?.message || 'Erro desconhecido');
    }
  }

  return (
    <>
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gerenciador de Produtos</h1>

    <div className="flex flex-col justify-center w-full items-center">
        <div className="bg-white p-6 rounded-lg shadow-md h-fit items-center justify-center w-full max-w-md">

          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Novo Produto</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
              <input
                {...register("productName", { required: 'Nome é obrigatório' })} 
                type="text" 
                placeholder="Digite o nome..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              {errors.productName &&<p className='text-red-500 text-xs p-2'>{errors.productName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Preço</label>
              <input
                {...register("productPrice", { required: 'Preço é obrigatório' })}
                type="text" 
                placeholder="Digite o preço..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.productPrice &&<p className='text-red-500 text-xs p-2'>{errors.productPrice.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoria</label>

              <Controller
                name='productCategory'
                control={control}
                rules={{ required: 'Categoria é obrigatória' }}
                render={({ field }) => (
                  <Combobox items={categories} value={field.value} onValueChange={field.onChange}>
                    <ComboboxInput placeholder="Selecione a categoria" onBlur={field.onBlur}/>
                    <ComboboxContent>
                      <ComboboxEmpty>Sem categorias.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem className='hover:bg-slate-200' key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Quantidade</label>
              <input
                {...register("productQuantity", { required: 'Quantidade é obrigatório' })}
                type="number" 
                placeholder="Digite a quantidade..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.productQuantity &&<p className='text-red-500 text-xs p-2'>{errors.productQuantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Descrição</label>
              <input
                {...register("productDescription", { required: 'Descrição é obrigatório' })}
                type="text" 
                placeholder="Digite a descrição..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.productDescription &&<p className='text-red-500 text-xs p-2'>{errors.productDescription.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">URL da imagem</label>
              <input
                {...register("productImage", { 
                  required: 'A URL da imagem é obrigatória',
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                    message: 'Insira uma URL válida de imagem (terminada em jpg, png, etc.)'
                  } })}
                type="url" 
                placeholder="Cole o endereço URL da imagem..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.productImage &&<p className='text-red-500 text-xs p-2'>{errors.productImage.message}</p>}
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                variant='ghost' 
                type='submit' 
                className='flex-1 py-2 px-4 rounded text-white transition bg-gray-800 hover:bg-gray-400'
              >
              Cadastrar
              </Button>
            </div>
          </form>
        </div>

            {lastAdd && <p className='text-green-600 text-s p-2 mt-5 bg-green-300/60 rounded-sm'>{lastAdd} foi adicionado a lista com sucesso!</p>}
        </div>
    </>
  )
}

export default Manager
