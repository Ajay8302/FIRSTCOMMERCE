import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDocs, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { BiRupee } from "react-icons/bi";
// import { fireproducts } from "../firstcommerce-products";
import { useNavigate } from "react-router-dom";

// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";




// const refreshPage = () => {
//   window.location.reload();
// };


function Homepage() {


  // useEffect(() => {
  //   const interval = setInterval(refreshPage, 100000); // Refresh every 5 seconds
  
  //   return () => {
  //     clearInterval(interval); // Clear interval on component unmount
  //   };
  // }, []);
  
  
  //For Search
  const[SearchKey, setSearchKey] = useState('')
  const[filterType, setFilterType] = useState('')

  const [products , setProducts] = useState([]);       //both With s,s
  // const params = useParams();
  
  //For Loading State if Page 
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cartReducer);

  // Call Data when Page is Loaded by Using Use_effect Hook
  useEffect(() => {
    getdata();
  }, []);


//********************************** This is for Adding only one line Data to Firestore ***************************************/ 


  // // for Adding Data to Fb
  // async function adddata() {
  //   try {
  //     await addDoc(collection(fireDB, "users"), { name: "Sanjay", age: 26 });
  //     alert("Data Added Successfully");
  //   } catch (error) {
  //     alert("ERROR..!");
  //   } 
  // }


//********************************** This is for Retreiving/Get Bunch of Data from Firestore ***************************************/ 


  //for Retrieving/Get Data from Fb
  async function getdata() {   
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productArray = [];
      users.forEach((doc)  => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productArray.push(obj);
        setLoading(false);
      });

      setProducts(productArray)
      // console.log(productArray);
    }catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


//********************************** This is for Setting Local storage Data for AddCart ***************************************/ 


  //set local Storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //Function for Add to Cart Items
  const addTOCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload:product });
  };


//**********************************  This is for Adding Bunch of Data to Firestore at once ***************************************/ 



  // for Adding Products Real Data to Fb by using Map function
  // function addProductsdata() {
  //   fireproducts.map(async (product) => {
  //     try {
  //        await addDoc(collection(fireDB, "products"), product); 
  //        alert("All Data at once Added Successfully");
  //     } 
  //     catch(error){
  //       console.log("ERROR..Data is not Added to Firestore!");
  //       alert("ERROR..!");
  //     }
  //   });
  // }


 //**********************************This is Retuning Elements Portion ***************************************/  
  return (
    <Layout loading = {loading}>
      <div className="container">
        <div className="d-flex w-50">
            <input type="text" 
              value={SearchKey}
              onChange={(e) => {setSearchKey(e.target.value)}}
            className="form-control mx-2" style={{ backgroundColor: 'aliceblue' }} placeholder="search items"/>

            <select value={filterType} style={{ backgroundColor: 'aliceblue' }} onChange={(e) => {setFilterType(e.target.value)}} className="form-control mt-3 ">
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="mobiles">Mobile</option>
                <option value="accessories">Mobile Accessories</option>
                <option value="jewelry">Jewelry</option>
                <option value="books">Books</option>
            </select>
        </div>
        <hr />
        <div className="row">

          {/* Filter and Search Logic here only */}
          {products
          .filter(obj=>obj.name.toLowerCase().includes(SearchKey))
          .filter(obj=>obj.category.toLowerCase().includes(filterType))
          .map((product) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative text-center">
                  <div className="product-content">
                    <strong>
                      <p>{product.name}</p>
                    </strong>
                    <div className="image-fluid">
                      <img src={product.imageURL} alt="Sorry Product is not Loaded" className="product-img" />
                    </div>
                      
                    <div className="product-actions">
                      <h2>
                        {product.price} <BiRupee size={28} />{" "}
                      </h2>
                      <div className="d-flex">
                        <button
                          className="btn btn-success mx-2" style={{ marginRight: 5 }}
                          onClick={() => addTOCart(product)}> {" "} ADD TO CART {" "} 
                        </button>
                        <button
                          className="btn btn-primary" onClick={() => { navigate(`/productinfo/${product.id}`)
                          }}> {" "} VIEW {" "}   
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>   
            );
          })}
        </div>
      </div>

      {/* <button className="btn btn-primary" onClick={adddata}> add data to Fb </button> */}
      {/* <button className="btn btn-primary" onClick={addProductsdata}> add All data to Fb</button> */}
      {/* <button className="btn btn-success" onClick={getdata}>get data from Fb</button> */}
    </Layout>
  );
}

export default Homepage;
