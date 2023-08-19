import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import React from "react";
import Login from './components/login';
import CartPage from './components/CartPage';
import BookList from './components/BooksList';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Form from './components/Form';
import { ThemeProvider, colors, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const name = "rucha";
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'purple'
          }
        }
      }
    }
  })
  return (
    <>
      {/* <img src={Logo} alt="logo" style={{width:100, height:100}}/>  */}
      <ThemeProvider theme={theme}>
        
          <BrowserRouter>
            
              <ToastContainer />
              <div style={{
                display: 'flex',
                padding: 20,
                
                backgroundColor:'Highlight',
                backgroundColor:'darkseagreen',
              }}
              >
                <NavLink style={{ marginLeft: 100, marginRight: 100, color:'black', fontSize: 35, fontFamily:'fantasy' }} to='/'>HOME</NavLink>
                <NavLink to='/books'  style={{ marginRight: 100, color:'black', fontSize: 35, fontFamily:'fantasy' }}>BOOK LIST</NavLink>
                <NavLink className="link" to="/CartPage" element="Link" style={{ marginRight: 100, color:'black', fontSize: 35, fontFamily:'fantasy' }}>CART </NavLink>
                <NavLink to='/form'  style={{ marginRight: 100, color:'black', fontSize: 35, fontFamily:'fantasy'}}>REGISTER</NavLink>
                <NavLink to='/Login' style={{ marginRight: 100, color:'black', fontSize: 35, fontFamily:'fantasy' }}>LOGIN</NavLink>
                
                
              </div>
              <Routes>
                <Route path='/' element={<HomePage userName={name}></HomePage>}></Route>
                <Route path='/books' element={<BookList></BookList>}></Route>
                <Route path='/form' element={<Form></Form>}></Route>
                <Route path="/CartPage" element={<CartPage />} />
                <Route path='/Login' element={<Login></Login>}></Route>
                <Route path='*' element={<PageNotFound />}></Route>
              </Routes>
            
          </BrowserRouter>
        
      </ThemeProvider>
    </>
  );
}

export default App;
