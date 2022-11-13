import React, { useRef, useState } from 'react'
import { Button, Accordion, AccordionSummary, AccordionDetails, Snackbar, Slide, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent, Alert } from '@mui/material';
import { useFormik } from 'formik';
import { useContact } from '../Context/ContactContext';
import './contact.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export const Contact = (props) => {

    const { contact, index } = props;
    const { setContacts, contacts } = useContact();
    const [editClicked, setEditClicked] = useState(false);
    const [readonly, setReadonly] = useState(true);
    const inputRef = useRef(null);
    const [opendialog, setOpendialog] = useState(false);
    const [snackbaropen, setSnackbaropen] = useState(false);
    const handleClose = () => {
        setSnackbaropen(false);
    }
    const handleDialogClose = () => {
        setOpendialog(false);
    }

    const formik = useFormik({
        initialValues: {
            name: contact ? contact.name : '',
            email: contact ? contact.email : '',
            number: contact ? contact.number : '',
        },
        enableReinitialize: true,
        onSubmit: values => {
            handleSave(values);
        }
    })

    const handleSave = (values) => {
        const newContactlist = contacts.map((oldcontact, key) => {
            if (index === key) {
                return { ...oldcontact, name: values.name, email: values.email, number: values.number }
            }
            return oldcontact;
        })
        localStorage.setItem('contacts', JSON.stringify(newContactlist));
        setContacts(newContactlist);
    }

    const handleClick = () => {
        setEditClicked(true);
        setReadonly(false);
        inputRef.current.focus();
    }

    const handleDelete = () => {
        const newContactlist = contacts.filter((el) => {
            return el.id !== contact.id;
        })
        localStorage.setItem('contacts', JSON.stringify(newContactlist));
        setContacts(newContactlist);
        handleDialogClose();
        setSnackbaropen(true);
    }
    return (

        <div className='contactlist'>
            <form action="" onSubmit={
                (e) => {
                    e.preventDefault()
                }
            }>
                <Accordion
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    width="100%"
                    
                >
                    <AccordionSummary>
                        <input ref={inputRef} name='name' readOnly={readonly} onChange={formik.handleChange} label="NAME" type={'string'} value={formik.values.name} />
                        <div className="actions">
                            {
                                !editClicked ? (
                                    <Button onClick={handleClick}>Edit</Button>
                                ) : (<Button onClick={() => { setEditClicked(false); setReadonly(true); formik.handleSubmit() }}>Save</Button>)}
                            <Button onClick={() => { setOpendialog(true); }}>Delete</Button>

                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="contacts">

                            <input name='email' readOnly={readonly} onChange={formik.handleChange} type={'email'} value={formik.values.email} />
                            <input name='number' readOnly={readonly} onChange={formik.handleChange} type={'number'} value={formik.values.number} />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>

            <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Contact Deleted Successfully!
                </Alert>
            </Snackbar>


            <Dialog
                open={opendialog}
                TransitionComponent={Transition}
                // keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you Sure You want to Delete this Contact?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>NO</Button>
                    <Button onClick={() => {
                        handleDelete();
                        // setSnackbaropen(true);
                    }
                    } >YES</Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}
