import React from 'react'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useContact } from '../Context/ContactContext'

export const Form = () => {
    const { addContact } = useContact();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            number: ''
        },
        onSubmit: values => {
            console.log(values);
            const contact = {
                id: Date.now(),
                name: values.name,
                email: values.email,
                number: values.number,
            }
            addContact(contact);
        }
    })
    console.log(formik.values.name, formik.values.email);
    return (
        <div>

            <form action="" onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit();
            }}>
                <TextField margin='dense' name='name' id="outlined-basic" onChange={formik.handleChange} value={formik.values.name} label="NAME" variant="outlined" type={'string'} fullWidth />
                <TextField margin='dense' name='email' id="outlined-basic" onChange={formik.handleChange} value={formik.values.email} label="EMAIL" variant="outlined" type={'email'} fullWidth />
                <TextField margin='dense' name='number' id="outlined-basic" onChange={formik.handleChange} label="PHONE" value={formik.values.number} variant="outlined" type={'number'} fullWidth />
                <Button type='submit' variant="contained" size='large'>Submit</Button>
            </form>
        </div>
    )
}
