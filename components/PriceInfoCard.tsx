import Image from 'next/image';
import React from 'react'
interface Props{
    title:string;
iconsSrc:string;
value:string;

}
const PriceInfoCard = ({title , iconsSrc , value , }:Props) => {
  return (
    <div className={`price-info_card`}>
        <p className='text-base text-black-100'>{title}</p>
        <div className='flex gap-1'>
            <Image src={iconsSrc} alt={title} width={24} height={24}/>
            <p className='text-2xl font-bold text-secondary'>{value}</p>
        </div>
    </div>
  )
}

export default PriceInfoCard