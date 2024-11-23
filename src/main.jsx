import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import theme from './theme'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer, toast } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          cancellationButtonProps: { color: 'inherit' }
        }}>
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
