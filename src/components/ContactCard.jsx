import {  deleteDoc, doc } from 'firebase/firestore';
import React,{useState} from 'react'
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { db } from '../config/firebase';
import Modal from './Modal';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const deleteContact = async (id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id))
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div key={contact.id} className='flex items-center justify-between gap-2 border-2 border-white p-2 rounded-md' >
    <div className="profileImg">
      <CgProfile className='text-5xl' />
    </div>
    <div className='flex flex-col justify-center items-start'>
      <div className="name font-semibold">{contact.name}</div>
      <div className="name">{contact.email}</div>
    </div>
    <div className="icons flex">
      <div className="edit"><FaEdit onClick={onOpen} className='text-4xl cursor-pointer' /></div>
      <div className="delete"><MdDelete onClick={()=>deleteContact(contact.id)} className='text-4xl cursor-pointer' /></div>
      <Modal open={open} onClose={onClose} isUpdate contact={contact}/>
    </div>
  </div>
  )
}

export default ContactCard
