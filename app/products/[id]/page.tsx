import { getProductById } from '@/lib/actions'
import React from 'react'
type Props ={
  params :{id :string}
}
const ProductDetails = async({params :{id}} : Props) => {
  const product = await getProductById(id);

  return (
    <div>{product.title}</div>
  )
}

export default ProductDetails