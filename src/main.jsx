import App from './App.jsx'
import theme from './theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer, toast } from 'react-toastify'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      cancellationButtonProps: {color: 'inherit'}
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" />
    </ConfirmProvider>
  </CssVarsProvider>
  // </StrictMode>
)
