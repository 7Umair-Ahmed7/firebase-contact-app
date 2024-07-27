import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import Modal from './components/Modal';
import { IoIosAddCircle } from "react-icons/io";
import ContactCard from './components/ContactCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {

    const getContact = async () => {
      try {
        const contactRef = collection(db, "contacts")
        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setContacts(contactList);
          return contactList;

        })
      }
      catch (error) {
        console.log(error)
      }
    }
    getContact()
  }, [])

  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    const contactRef = collection(db, "contacts")
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      let filteredList = contactList.filter(contact => {
        return contact.name.toLowerCase().includes(value.toLowerCase())
      })
      setContacts(filteredList);
      return filteredList;

    })
  }


  return (
    <>
      <div className="container w-screen h-screen bg-slate-800 flex justify-center items-center">
        <div className="contact-container bg-slate-500 p-4 rounded-md h-[80vh] relative">
          <div className='p-4 flex items-center justify-center rounded-xl mb-2 bg-white'>
            <h1 className='text-xl font-bold '>Firebase Contact App</h1>
          </div>
          <div className="upper-container flex gap-2">
            <input onChange={handleSearch} className='w-[400px] border border-white rounded-lg px-4 py- bg-transparent' type="text" placeholder='Search here' />
            <IoIosAddCircle onClick={onOpen} className='text-5xl cursor-pointer' />
          </div>
          <div className="contact-cards h-[50vh] overflow-hidden overflow-y-auto flex flex-col gap-2 mt-4 p-1">
            {contacts.length == 0 ? <><div className='text-xl font-bold'>No contacts found</div></> : contacts.map(contact => {
              return <ContactCard key={contact.id} contact={contact} />
            })}
          </div>
          <Modal onClose={onClose} open={open} setOpen={setOpen} onOpen={onOpen} />
          <ToastContainer position='bottom-center' />
        </div>
      </div>
    </>
  )
}

export default App
