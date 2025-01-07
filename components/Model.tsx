"use client"

import React , {FormEvent, Fragment, useState}from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import Image from 'next/image';

const Model = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [email, setemail] = useState('');
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsSubmiting(true);

        setIsSubmiting(false)
        setemail('');
        closeModel();
    }
    const openModel = ()=>setIsOpen(true);
    const closeModel =()=> setIsOpen(false);
  return (
   <>
   <button type='button'  onClick={openModel}className='btn'>Track</button>
   <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-container">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <span className='inline-block h-screen align-middle' aria-hidden="true"/>
<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
    <div className='dialog-content'>
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <div className='p-3 border border-gray-200 rounded-10'>
                    <Image 
                    src="/assets/icons/logo.svg"
                    alt='logo'
                    width={28}
                    height={28}
                    /> 
                </div>
                <Image
                src="/assets/icons/x-close.svg"
                alt='close'
                width={24}
                height={24}
                className='cursor-pointer'
                onClick={closeModel }
                />
            </div>
            <h4 className='dialog-head_text'>Stay updated with product pricing alerts right in your inbox!</h4>
            <p className='text-sm text-gray-600 mt-2'>Never miss a bargaing again with out timely alerts!</p>
        </div>
        <form action="" className='flex flex-col mt-5' onSubmit={handleSubmit}>
            <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email Address</label>
            <div className='dialog-input_container'>
                <Image 
                src="/assets/icons/mail.svg"
                alt='mail'
                width={18}
                height={18}
                />
                <input type="email" id='email' required placeholder='Enter your email address' className='dialog-input' value={email} onChange={(e)=> setemail(e.target.value)} />
            </div>
            <button type='submit' className='dialog-btn'>
                {isSubmiting ? 'Submitting...' : 'Track'}
            </button>
        </form>
    </div>

</Transition.Child>
        </div>
      </Dialog>
   </>
  )
}

export default Model 