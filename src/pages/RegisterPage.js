import React, { useState } from "react";
import {Link} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";


// import Layout from "../components/Layout";

function RegisterPage() {
  
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[cPassword, setCPassword] = useState('');
  const auth = getAuth();
  const[loading,setLoading] = useState(false);

  //For Email-Password Auth- for new User
  const register = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Registration Successful");
      setEmail('');
      setPassword('');
      setCPassword('');
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
      setLoading(false);
    }
  };
  

  return (
    <div className="register-parent">
      {loading && (<Loader />)}
      <div className="register-top">

      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
            <div className="register-form">
                <h2>Register</h2>
                <hr />
                <input type="email" className="form-control" placeholder="e-mail" value={email}  onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" className="form-control" placeholder="password" value={password}  onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="password" className="form-control" placeholder="confirm-password" value={cPassword}  onChange={(e) => {setCPassword(e.target.value)}}/>

                <button className="btn btn-primary my-3" onClick={register}>REGISTER</button>
                <hr />
                <Link to="/login">Click here to go to Login</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
