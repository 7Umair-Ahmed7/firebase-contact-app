import React from 'react'
import { createPortal } from 'react-dom';
import { IoMdCloseCircle } from "react-icons/io";
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import * as yup from 'yup'
import { toast } from 'react-toastify';

const Modal = ({ onClose, open, contact, isUpdate }) => {

    const contactValidationSchema = yup.object().shape({
        name: yup.string().required("Name is Required"),
        email: yup.string().email("Email is Invalid").required("Email is Required")

    })
    const addContact = async (contact) => {
        const contactRef = collection(db, "contacts")
        await addDoc(contactRef, contact)
        onClose()
        toast.success("Contact added successfully");
    }
    const updateContact = async (contact, id) => {
        const contactRef = doc(db, "contacts", id)
        await updateDoc(contactRef, contact)
        onClose()
        toast.success("Contact updated successfully");
    }

    return createPortal(

        <>
            {open && <>
                <div className='flex items-center justify-center w-screen h-screen absolute top-0 backdrop-blur z-20'>

                    <div className='modal flex flex-col p-4 z-30 w-[300px] min-h-[250px] bg-white relative top-0 '>
                        <div className='self-end'>
                            <IoMdCloseCircle onClick={onClose} className=' text-2xl  mr-2 cursor-pointer ' />
                        </div>
                        <Formik validationSchema={contactValidationSchema}
                            initialValues={isUpdate ? {
                                name: contact.name,
                                email: contact.email
                            } : {
                                name: "",
                                email: "",
                            }}
                            onSubmit={(values) => {

                                isUpdate ?
                                    updateContact(values, contact.id) :
                                    addContact(values)
                            }}
                        >
                            <Form >
                                <div className='flex flex-col gap-4 item'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="name">Name</label>
                                        <Field className='border py-1 px-2 border-black w-full' name="name" placeholder='Enter Name' />
                                        <div className='text-sm text-red-500'><ErrorMessage name="name" /></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="email">Email</label>
                                        <Field className='border w-full border-black py-1 px-2' name="email" placeholder='Enter email' />
                                        <div  className='text-sm text-red-500'><ErrorMessage name="email" /></div>
                                    </div>
                                    <button className='border border-black self-end px-2 py-1 bg-black text-white'>{isUpdate ? 'update' : 'add'} contact</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </>}

        </>
        , document.getElementById("modal-root"))
}

export default Modal
