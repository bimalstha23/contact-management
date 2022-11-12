import React, { useState } from 'react'
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useContact } from '../Context/ContactContext';
import './contact.css'
export const Contact = (props) => {

    const { contact, index } = props;
    const { setContacts, contacts } = useContact();
    const [editClicked, setEditClicked] = useState(false);
    const [readonly, setReadonly] = useState(true);

    const formik = useFormik({
        initialValues: {
            name: contact ? contact.name : '',
            email: contact ? contact.email : '',
            number: contact ? contact.number : '',
        },
        enableReinitialize: true,
        onSubmit: values => {
            console.log('hello values', values);
            handleSave(values);
        }
    })
    console.log('from contact', formik.values.name);

    const handleSave = (values) => {
        console.log(values);
        const newContactlist = contacts.map((oldcontact, key) => {
            if (index === key) {
                return { ...oldcontact, name: values.name, email: values.email, number: values.number }
            }
            return oldcontact;
        })
        console.log('hello new ', newContactlist);
        localStorage.setItem('contacts', JSON.stringify(newContactlist));
        setContacts(newContactlist);
    }

    const handleClick = () => {
        setEditClicked(true);
        setReadonly(false);
    }

    const handleDelete = () => {
        const newContactlist = contacts.filter((el) => {
            if (el.id !== contact.id) {
                return el;
            }
        })
        localStorage.setItem('contacts', JSON.stringify(newContactlist));
        setContacts(newContactlist);
    }
    console.log(contacts);

    return (
        <div className='contactlist'>
            <form action="" onSubmit={
                (e) => {
                    e.preventDefault()
                    // formik.handleSubmit()
                }
            }>
                <div className="actions">
                    {
                        !editClicked ? (
                            <Button onClick={handleClick}>Edit</Button>
                        ) : (<Button onClick={() => { setEditClicked(false); setReadonly(true); formik.handleSubmit() }}>Save</Button>)}
                    <Button onClick={handleDelete}>Delete</Button>

                </div>
                <div className="contacts">
                    <input name='name' readOnly={readonly} onChange={formik.handleChange} label="NAME" type={'string'} value={formik.values.name} />

                    <input name='email' readOnly={readonly} onChange={formik.handleChange} type={'email'} value={formik.values.email} />

                    <input name='number' readOnly={readonly} onChange={formik.handleChange} type={'number'} value={formik.values.number} />
                </div>
            </form>
        </div>
    )
}
