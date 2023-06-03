import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Productinfo() {
  const [product, setProduct] = useState();
  const params = useParams(); //this for getting the id of selected product

  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cartReducer);

  //For Loading State if Page 
  const [loading , setLoading] = useState(false);

  //Call Data when Page is Loaded by Using Use_effect Hook
  useEffect(() => {
    getdata();
  }, []);



//********************************** This is for Retreiving/Get Bunch of Data from Firestore ***************************************/ 


  //for Retrieving only one selected Product Data from Fb
  async function getdata() {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(fireDB, "products", params.productid));

      setProduct(productTemp.data());   
      setLoading(false);

      // console.log(productTemp.data());
    } 
    catch (error) {
      console.log("Error retrieving product:", error);
      setLoading(false);
    }
  }


  //Function for Add to Cart Items
  const addTOCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload:product });
  };



  //set local Storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


    
//********************************** This is Retuning Elements Portion ***************************************


  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-auto">
            {product && (
              <div>
                <p>
                  <strong>{product.name}</strong>
                </p>
                <div className="image-effect">
                  <img
                      src={product.imageURL}
                      alt="not showing"
                      className="product-info-img"
                  />
                </div>
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addTOCart(product)} className="btn btn-outline-success">
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Productinfo;
