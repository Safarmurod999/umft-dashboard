import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './router/router'
import { Toaster, toast } from 'sonner'
import { Provider } from 'react-redux'
import store from "./store/store.jsx";


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position='top-right' />
          <Router />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
