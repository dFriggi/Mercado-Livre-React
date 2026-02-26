import { useLocation, useSearchParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { Controller } from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useState } from "react";
import { useContext } from 'react'
import { CartContext } from '../App'

const ProductView = () => {
    const [productAdded, setProductAdded] = useState(false)
    const location = useLocation()
    const { productData } = location.state || {}

    const { handleSubmit, control } = useForm()

    const { setCart } = useContext(CartContext) 

    const handleCartAdd = (data) => {
        const productQtd = parseInt(data.productCategory)
        setCart(lastProducts => [[productData, productQtd], ...lastProducts])
        setProductAdded(true)
    }

    const categories = []
    for (let i = 1; i <= productData.quantity; i++) {
        categories.push(i)
    }

    if(!productData) return <p>Este item não tem informações</p>

    return (
        <div>
            <p className="text-sm pb-2 pl-2 text-blue-500">{productData.category}</p>

            <div className="grid grid-cols-3 p-6 w-auto bg-white rounded-sm">

                <div className="h-200 flex flex-row p-4">
                    <img src={productData.imageUrl} className="max-h-full w-full object-contain"/>
                </div>

                <div className="flex flex-col">
                    <div className="pl-3 pb-2">
                        <p className="text-base text-blue-500 pb-5 hover:cursor-pointer">Nome da loja que vende o produto</p>
                        <p className="text-base text-slate-500">Novo | +100 vendidos</p>
                    </div>
                    <div className="p-3 pb-2 pt-2">
                        <p className="text-3xl font-semibold">{productData.name}</p>
                    </div>

                    <div className="p-3 pb-2 pt-2">
                        <p className="text-5xl">R$ {productData.price}</p>
                        <p className="text-lg text-green-600 p-1">3x R$ {productData.price / 3} sem juros</p>
                        <p className="text-base text-blue-500 pb-5 hover:cursor-pointer">Ver os meios de pagamento</p>
                    </div>         

                    <div className="p-3">   
                        <div className="pb-5">
                            <p className="font-semibold">O que você precisa saber sobre esse produto</p>
                            <li>{productData.description}</li>
                        </div>

                        <p className="text-base text-blue-500 pb-5 hover:cursor-pointer mt-auto">Ver características</p>
                    </div>                           
                </div>

                <div className="pt-0 p-4 pr-4 border border-slate-200 rounded-md ">
                    <div className="pt-5 ">
                        <p className="bg-green-700 rounded-sm w-fit p-1 text-white text-sm font-semibold">FRETE GRÁTIS ACIMA DE R$ 19</p>  
                    </div>
                    <div className="p-5">
                        <p className="font-semibold text-lg">Estoque disponível</p>
                        <div className="flex items-center gap-2 text-base">
                            <span>Quantidade:</span>
                            <div className="text-lg font-semibold flex-1"> 
                                <Controller
                                    name='productCategory'
                                    control={control}
                                    rules={{ required: 'Categoria é obrigatória' }}
                                    render={({ field }) => (
                                        <Combobox items={categories} value={field.value} onValueChange={field.onChange}>
                                          <ComboboxInput placeholder="Selecione a quantidade" onBlur={field.onBlur}/>
                                          <ComboboxContent className='max-h-40 overflow-y-auto'>
                                            <ComboboxEmpty>Produto acabou.</ComboboxEmpty>
                                            <ComboboxList>
                                              {(item) => (
                                                <ComboboxItem className='hover:bg-slate-200 transition' key={item} value={item + (item == 1 ? ' unidade' : ' unidades')}>
                                                  {item} {item == 1 ? ' unidade' : ' unidades'}
                                                </ComboboxItem>
                                              )}
                                            </ComboboxList>
                                          </ComboboxContent>
                                        </Combobox>
                                    )}
                                />
                            </div>
                            <span className="text-slate-400 text-sm">+{productData.quantity-1} disponíveis</span>
                        </div>
                    </div>
                    <div className="p-5 pt-2 pb-2">
                        <p className="hover:cursor-pointer text-white bg-blue-500 p-4 rounded-md font-semibold text-center">Comprar agora</p>
                    </div>
                    <div className="p-5 pt-0">
                        <button onClick={handleSubmit(handleCartAdd)} className="hover:cursor-pointer text-blue-500 bg-slate-200 p-4 rounded-md font-semibold text-center w-full">Adicionar ao carrinho</button>
                    </div>

                    {productAdded && <p className="p-5 text-green-600"><span className="font-semibold">{productData.name}</span> foi adicionado ao carrinho</p>}
                </div>
            
            </div>
        </div>
    )
}

export default ProductView

/*productData.name
  productData.price
  productData.category
  productData.quantity
  productData.description
  productData.imageUrl*/