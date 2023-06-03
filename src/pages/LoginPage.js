import React, { useState } from "react";
import {Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

// import Layout from "../components/Layout";

function LoginPage() {
  
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const auth = getAuth();
  const[loading,setLoading] = useState(false);

  // const[cPassword, setCPassword] = useState('');


  //For Email-Password Auth -- For Existing user
  const login=async()=>{
    try {

      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password);
       
      //Setting/Storing Loged-in user data for redirection to Home
      localStorage.setItem('CurrentUser', JSON.stringify(result))
      setLoading(false);
      toast.success("Login Successful");
      window.location.href = "/";

    } 
    catch (error) 
    {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);    
    }
  }


  return (
    <div className="login-parent">
      {loading && (<Loader />)}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4 z1">
              <div className="login-form">
                  <h2>Login</h2>
                  <hr />
                  <input type="text" className="form-control" placeholder="e-mail" value={email}  onChange={(e) => {setEmail(e.target.value)}}/>
                  <input type="password" className="form-control" placeholder="password" value={password}  onChange={(e) => {setPassword(e.target.value)}}/>

                  <button className="btn btn-primary my-3" onClick={login}>Login</button>
                  <hr />
                  <Link to="/registerPage" >Click here to go to Register</Link>        
              </div>
        </div>

        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>

      <div className="login-bottom"></div>
    </div>
  );
}

export default LoginPage;
