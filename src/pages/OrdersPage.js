import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { getDocs, collection } from "firebase/firestore";
import fireDB from "../fireConfig";


function OrdersPage() {

    const [orders , setOrders] = useState([]);       //both With s,s
    // const params = useParams();
    
    //For Loading State if Page 
    const [loading , setLoading] = useState(false);

    //state for showing user placed orders
    const userid = JSON.parse(localStorage.getItem('CurrentUser')).user.uid



    // Call Data when Page is Loaded by Using Use_effect Hook
    useEffect(() => {
        getdata();
    }, []);


    //for Retrieving/Get Data from Fb
    async function getdata() {   
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



    return (
        <Layout loading={loading}>
          <div className='ordertable p-2'>

            {/* Only showing the user selected items filter */}
            {orders
            .filter(obj => obj.userid === userid).map(order=>{
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
          </div>
        </Layout>
      );
}

export default OrdersPage