
import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Productinfo from "./pages/Productinfo";
import CartPage from "./pages/CartPage";
import "./stylesheets/Layout.css";
import  "./stylesheets/products.css";
import  "./stylesheets/authentication.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";

// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   
  return (
    <div className="App">
        <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<ProtectedRoutes><Homepage /></ProtectedRoutes>}/>
              <Route path="/productinfo/:productid" exact element={<ProtectedRoutes><Productinfo /></ProtectedRoutes>}/>
              <Route path="/cart" exact element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} />
              <Route path="/orders" exact element={<ProtectedRoutes><OrdersPage /></ProtectedRoutes>} />
              <Route path="/admin" exact element={<ProtectedRoutes><AdminPage /></ProtectedRoutes>} />

              <Route path="/login" exact element={<LoginPage />} />
              <Route path="/registerpage" exact element={<RegisterPage />} />
            </Routes>    
          </BrowserRouter>
    </div> 
  );
}

export default App;


//For security of logedin user
export const ProtectedRoutes=({children})=>{
  
  if(localStorage.getItem('CurrentUser')) 
  {
    return children;
  } 
  else 
  {
    return <Navigate to="/login" />;
  }

}
