import './App.css';
import { Form } from './components/Form';
import { ContactContext } from './Context/ContactContext';
import { Contacts } from './components/Contacts.jsx'
import { AppBar, Typography, Box } from '@mui/material'
function App() {
  return (
    <>
      <ContactContext>
        <AppBar
          position='static'
        >
          <Typography variant="h6" component='h6' textAlign={'center'}>
            Contact Management
          </Typography>
        </AppBar>
        <Box
          display={'flex'}
          flexDirection='column'
          justifyContent={'center'}
          alignItems={'center'}
          padding='30px'
        >

          <Box>
            <Form />
            <Contacts />
          </Box>
          
        </Box>
      </ContactContext>
    </>
  );
}

export default App;
