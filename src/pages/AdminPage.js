import Layout from '../components/Layout'
import React, { useEffect, useState } from "react";
import { getDocs, collection, setDoc,doc, addDoc, deleteDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';


function AdminPage() {
  
  const [products, setProducts] = useState([]);
  const [product , setProduct] = useState({
    name : "",
    price : 0,
    imageURL : "",
    category : "",
  });       //both With s,s
  // const params = useParams();

 //state for orders in tab 2
  const [orders , setOrders] = useState([]);       //both With s,s


  const[show,setShow] = useState(false);
  
  //For Loading State if Page 
  const [loading , setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For Adding Product State
  const[add, setAdd] = useState(false);



  // Call Data(for Product list tab) when Page is Loaded by Using Use_effect Hook
  useEffect(() => {
    getdata();
  }, []);

  //for Retrieving/Get Data from fb for Product list tab
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



  // Call Data(for orders tabs) when Page is Loaded by Using Use_effect Hook
  useEffect(() => {
    getOrdersdata();
}, []);


//for Retrieving/Get Data from Fb for orders tabs
async function getOrdersdata() {   
    try {
    setLoading(true);
    const result = await getDocs(collection(fireDB, "orders"));
    const orderstArray = [];
    result.forEach((doc)  => {
     
        orderstArray.push(doc.data());
        setLoading(false);
    });

    setOrders(orderstArray)
    console.log(orderstArray);
    }catch (error) {
    console.log(error);
    setLoading(false)
    }
}


  //Edit/Update Modal Icon data getting in a Modal func.
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  }



  //Update/Edit Data in a Database 
  const updateProduct=async() => {
    try {
        setLoading(true);
        await setDoc(doc(fireDB, "products" , product.id), product)
        handleClose()
        toast.success("Product updated Successfully!")
        window.location.reload()
    } catch (error) {
      setLoading(false)
      toast.error("Product update Failed")
      
    }
  }


  //for handling the Add Modal -- to add a New Product in a Database
  const addHandler = () => {
    setAdd(true);
    handleShow()
  }


  //For Adding a New Product in a Database through Modal
  const addProduct= async() => {
    try{
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product)
      handleClose()
      toast.success("Product added Successfully!")
      window.location.reload()
    } 
    catch (error) 
    {
      setLoading(false)
      toast.error("Product add Failed")  
    }
  }


  //Deleting A product from Admin Panel
  const deleteProduct = async(item) =>{
      try {
        setLoading(true);
        await deleteDoc(doc(fireDB, "products", item.id));
        toast.success("Product deleted successfully!")
        getdata()
      } 
      catch (error) 
      {
        toast.failed("Product delete failed")
        setLoading(false)
      }
  }



  return (
    <div className='p-3'>
        <Layout loading={loading}>
              <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className='tab1 mb-3'>

                  {/* Tab 1 - All Product List */}
                  <Tab eventKey="products" title="Products">
                      <div className='d-flex justify-content-between mb-2' >
                        <h3>Products List</h3>
                        <button className="btn btn-primary rounded-pill mr-2" onClick={addHandler}>Add Product</button>
                      </div>
                      <table className="table table-striped table-bordered mx-auto cartOrder">
                        <thead>
                          <tr>
                            <th className="text-center">Image</th>
                            <th className="text-center">Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td className="text-center">
                                  <img src={item.imageURL} height="90" width="90" alt={item.name} />
                                </td>
                                <td className="text-center">{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>
                                  <FaTrashAlt  onClick={() => {deleteProduct(item)}} color='red' size={20} style={{ marginRight: '10px' }}/>
                                  <FaEdit onClick={() => editHandler(item)} color='blue' size={20}/>
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

                      {/* react-bootstrap Modal For Updating in Firebase*/}
                      <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                              <Modal.Title>{add ? "Add a New Product" : "Edit Product"}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {" "}
                          <div className="register-form">
                                <hr />
                                <input type="text" className="form-control" placeholder="name" value={product.name}  onChange={(e) => setProduct({...product,name: e.target.value})}/>
                                <textarea type="text" className="form-control" placeholder="image url" value={product.imageURL}  onChange={(e) => setProduct({...product,imageURL: e.target.value})}/>
                                <input type="number" className="form-control" placeholder="price" value={product.price}  onChange={(e) => setProduct({...product,price: e.target.value})}/>
                                <input type="text" className="form-control" placeholder="category" value={product.category}  onChange={(e) => setProduct({...product,category: e.target.value})}/>
                            </div>

                            <hr />
                          </Modal.Body>
                          <Modal.Footer>
                                {/* react-bootstrap Modal condition For Adding New Product/Edit Previous Product in Firebase*/}          
                                <button className="btn btn-primary rounded-pill mr-2" >Close</button>
                                {add ? (<button className="btn btn-primary rounded-pill" onClick={addProduct}>SAVE</button>) : 
                                      (<button className="btn btn-primary rounded-pill" onClick={updateProduct}>SAVE</button>)}
                          </Modal.Footer>
                      </Modal>
                  </Tab>
                   
                  {/* Tab 1 - All User Orders Data */}
                  <Tab eventKey="orders" title="Orders">
                      {/* Only showing the user selected items filter */}
                      {orders.map(order=>{
                          return(
                              <table className="table table-striped table-bordered mx-auto order">
                                  <thead>
                                  <tr>
                                      <th className="text-center">Image</th>
                                      <th className="text-center">Name</th>
                                      <th>Price</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {order.cartItems.map((item) =>{
                                          return (
                                              <tr key={item.id}>
                                                  <td className="text-center">
                                                      <img src={item.imageURL} height="90" width="90" alt={item.name} />
                                                  </td>
                                                  <td className="text-center">{item.name}</td>
                                                  <td>{item.price}</td>
                                              </tr>
                                          );
                                          })}
                                  </tbody>
                              </table> 
                               )
                             })}
                  </Tab>
                  <Tab eventKey="contact" title="Users" disabled>
                    Hii, I am 3rd tab content
                  </Tab>
              </Tabs>
        </Layout>
    </div>
  )
}

export default AdminPage