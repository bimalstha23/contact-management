import React, { useState, createContext, useContext, useEffect } from 'react'

const contactContext = createContext({
    contacts: [],
    addContact: () => { },
    setContacts: () => { }

})
export const useContact = () => useContext(contactContext)

export const ContactContext = ({ children }) => {
    const [contacts, setContacts] = useState([])

    const addContact = (contact) => {
        const newContactList = [...contacts, contact];
        localStorage.setItem('contacts', JSON.stringify(newContactList));
        setContacts(newContactList);
    }
    useEffect(() => {
        if (localStorage.getItem('contacts')) {
            setContacts(JSON.parse(localStorage.getItem('contacts')))
        }
    }, [])
    console.log(contacts)
    const value = {
        contacts,
        addContact,
        setContacts
    }
    return (
        <contactContext.Provider value={value}>
            {children}
        </contactContext.Provider>

    )
}
