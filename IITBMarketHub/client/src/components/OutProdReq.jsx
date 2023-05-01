import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect, Fragment } from "react";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router";

const OutProdReq = () => {
    // const [course, setCourse] = useState({});
    // const { course_id } = useParams();
    // const [c_id, setcid] = useState("");
    // const [c_title, settitle] = useState("");
    // const [c_credits, setcred] = useState("");
    const [prods, setProds] = useState([]);
    const navigate = useNavigate();
    // const [prereqs, setPrereqs] = useState([]);
    // const [c_pre]
    // const getCourse = async () => {
    //     try {
        //  const response = await fetch('http://localhost:4000/auth/course/${course_id}');
    //     const jsonData = await response.json();
    
    //     setCourse(jsonData);
    //     } catch (err) {
    //     console.error(err.message);
    //     }
    // };

    const getMyProdsReq = async () => {
        try {
        //   var jsonData;
          // const res = await  axios.get("http://localhost:4000/auth/dashboard");
          axios.get(`http://localhost:4000/auth/products/outreq`, {withCredentials:true}).then( (res) =>{
            // jsonData= (res.data);
            console.log(res.data);
            setProds(res.data);
        });
        //   console.log(parseData);
        } catch (err) {
          console.error(err.message);
        }
      };


    
    useEffect(() => {
        getMyProdsReq();
    }, []);


    // const logout = (e) => {
    //     e.preventDefault();
    //     axios.get("http://localhost:4000/auth/logout", {withCredentials:true}).then( (res) =>{
    //     navigate("/");
    //   });
    //   };

    // console.log(c_id);
    return (
        <Fragment>
            <div>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
          <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/myprofile")}>View Profile</Button>
        </ButtonGroup>
            <h1 style={{textAlign: "center",fontSize: 40}}>My Reuests for Products</h1>
            <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Product ID</th>
                {/* <th>Category</th> */}
                <th>Product Name</th>
                {/* <th>Product Description</th> */}
                <th>Price</th>
                <th>Seller ID</th>
                <th>View</th>
                {/* <th>Confirm Requests</th> */}
            </tr>
            </thead>
            <tbody>
              {prods.map((prod)=>(
                  <tr key={prod.prod_id+prod.category_name+prod.prod_name}>
                    <td>{prod.prod_id}</td>
                    {/* <td>{prod.category_name}</td> */}
                    <td>{prod.prod_name}</td>
                    {/* <td>{prod.prod_desc}</td> */}
                    <td>{prod.price}</td>
                    <td>{prod.seller_id}</td>
                    <td><Button style={{fontSize: 15}} onClick={() => navigate(`/product/${prod.prod_id}`)}>View Full</Button></td>
                    {/* <td><button onClick={() => handleConfirm(prod['prod_id'],prod['buyer_id'])}>Confirm</button></td> */}
                  </tr>
              ))}
      
    
    </tbody>
    </table>
            </div>
        </Fragment>
    );
    };

export default OutProdReq;