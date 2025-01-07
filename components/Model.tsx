"use client"

import React , {Fragment, useState}from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition , Overlay} from '@headlessui/react'

const Model = () => {
    let [isOpen, setIsOpen] = useState(false);
    const openModel = ()=>setIsOpen(true);
    const closeModel =()=> setIsOpen(false);
  return (
   <>
   <button type='button'  onClick={openModel}className='btn'>Track</button>
   <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-container">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
   </>
  )
}

export default Model