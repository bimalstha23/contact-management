import React from 'react'
import { useContact } from '../Context/ContactContext'
import { Contact } from './Contact'
export const Contacts = () => {
    const { contacts } = useContact();
    console.log('from contacts component ',contacts);

    return (
        <div>
            {
                contacts && (
                    contacts.map((contact, index) => (
                        <Contact contact={contact} index={index} />
                    ))
                )
            }
        </div>
    )
}
