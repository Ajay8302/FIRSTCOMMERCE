import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import {  Modal } from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore"
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function CartPage() {
  // const [showAlert, setShowAlert] = useState(false);

  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();


  //for react-bootstrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Place order details through Modal
  const[name, setName] = useState('');
  const[address, setAddress] = useState('');
  const[pincode, setPincode] = useState('');
  const[phoneNumber, setPhoneNumber] = useState('');

  //for Loading
  const[loading,setLoading] = useState(false);

  


  //For Showing Delete Item Mssg.
  //  const handleDelete = () => {
  //   setShowAlert(true);
    // Hide the alert after a certain duration (e.g., 3 seconds)
  //   setTimeout(() => {
  //     setShowAlert(false);
  //   }, 3000);
  // };



  //Logic for Calculating total Price of Cart Items
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;  
    });
    setTotalAmount(temp);
  }, [cartItems]);
  


  //after Every Item Deleting, updating the local storage
  //set local Storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  //Function for Deleting to from Cart
  const deleteFromCart = (product) => {
    dispatch({ type: "Delete_FROM_CART", payload:product });
  };

  

  //Modal Placeorder button-Function
  const placeorder=async()=>{
      const addressinfo = {
        name,
        address,
        pincode,
        phoneNumber 
      }

      console.log(addressinfo)

      // Sending Data to Firebase order Collection
    const orderInfo = {
      cartItems,
      addressinfo,
      email: JSON.parse(localStorage.getItem("CurrentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("CurrentUser")).user.uid
    };


    // for Showing order mssg
    try 
    {
      setLoading(true);
      await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully!");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed!");
    }
};

return (
    <div className="p-3">
      <Layout loading={loading}>
        <table className="table table-striped table-bordered mx-auto cartOrder">
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className="text-center">
                  <img src={item.imageURL} height="90" width="90" alt={item.name} />
                </td>
                <td className="text-center">{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrashAlt onClick={() => deleteFromCart(item)}/>
                </td>
                {/* <td>
                {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Item deleted successfully!
                      </Alert>
                    )}
                </td> */}
              </tr>
            )})}
          </tbody>
        </table>
        

        {/* for total amount Showing */}
        {/* its Styling in product.css */}
        <div className="d-flex justify-content-end">
            <h2 className="total-amount">Total Amount = {totalAmount} Rs/-</h2>  
        </div>

        {/* Div for Place Order button */}
        <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary rounded-pill mr-5" onClick={handleShow}>PLACE ORDER</button>  
        </div>



        {/* react-bootstrap Modal */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add your address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="register-form">
                  <h2>Register</h2>
                  <hr />
                  <input type="text" className="form-control" placeholder="name" value={name}  onChange={(e) => {setName(e.target.value)}}/>
                  <textarea type="text" className="form-control" placeholder="address" value={address}  onChange={(e) => {setAddress(e.target.value)}}/>
                  <input type="number" className="form-control" placeholder="pincode" value={pincode}  onChange={(e) => {setPincode(e.target.value)}}/>
                  <input type="number" className="form-control" placeholder="phone number" value={phoneNumber}  onChange={(e) => {setPhoneNumber(e.target.value)}}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
                  <button className="btn btn-primary rounded-pill mr-2" onClick={handleClose}>Close</button>
                  <button className="btn btn-primary rounded-pill" onClick={placeorder}>ORDER</button>
            </Modal.Footer>
        </Modal>
      </Layout>
    </div>
  );
              }

export default CartPage;
