import React, { useState } from 'react'
import { TextField, Button, Snackbar, Alert } from '@mui/material'
import { useFormik } from 'formik'
import { useContact } from '../Context/ContactContext'
import * as yup from 'yup';

export const Form = () => {
    const [snackbaropen, setSnackbaropen] = useState(false);
    const { addContact } = useContact();
    const validate = yup.object().shape({
        name: yup.string().required().max(20).min(2),
        email: yup.string().email().required(),
        number: yup.string().required().min(10).max(10)
    })

    const handleClose = () => {
        setSnackbaropen(false);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            number: ''
        },
        validationSchema: validate,
        onSubmit: values => {
            const contact = {
                id: Date.now(),
                name: values.name,
                email: values.email,
                number: values.number,
            }
            addContact(contact);
            setSnackbaropen(true);
            formik.resetForm();
        },
        // onReset: values=>{
        // }
    })

    return (
        <div>

            <form action="" onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit();
            }}>
                <TextField error={formik.errors.name} helperText={formik.errors.name} margin='dense' name='name' id="outlined-basic" onChange={formik.handleChange} value={formik.values.name} label="NAME" variant="outlined" type={'string'} fullWidth />
                <TextField error={formik.errors.number} helperText={formik.errors.number} margin='dense' name='number' id="outlined-basic" onChange={formik.handleChange} label="PHONE" value={formik.values.number} variant="outlined" type={'number'} fullWidth />
                <TextField error={formik.errors.email} helperText={formik.errors.email} margin='dense' name='email' id="outlined-basic" onChange={formik.handleChange} value={formik.values.email} label="EMAIL" variant="outlined" type={'email'} fullWidth />
                <Button fullWidth type='submit' variant="contained" size='large'>Submit</Button>
            </form>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Contact Added Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}
