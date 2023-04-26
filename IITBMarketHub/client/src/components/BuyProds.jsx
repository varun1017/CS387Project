import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect, Fragment } from "react";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router";

const BuyProds = () => {
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

    const getAllProds = async () => {
        try {
        //   var jsonData;
          // const res = await  axios.get("http://localhost:4000/auth/dashboard");
          axios.get(`http://localhost:4000/auth/products`, {withCredentials:true}).then( (res) =>{
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
        getAllProds();
    }, []);

    const handleProdReq = async(prod_id,seller_id) => {
      // e.preventDefault();
      try{
  
          const body = { prod_id,seller_id };
          console.log(body);
          const response = await fetch("http://localhost:4000/auth/reqproduct", {
          credentials: 'include',
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          });
          const data = await response.json();
          // console.log(data);
          if (response.ok) {
              // window.location.reload();
              // alert(`You have Successfully Registered Course:${c_id}, Section:${cs_id} `);
              console.log(data[1]);
              if(data[1]==='var1'){
                  // alert(`You have already registered for this course`);
                  alert(`Request successful for product_id:${prod_id}`);
                  navigate('/home');
              }
              if(data[1]=='var0'){
                alert(`Already Requested for product_id:${prod_id}`);
                navigate('/home');                
              }
            } else {
              throw new Error("Failed to request");
            }
      }
      catch(err){
          console.error(err.message);
      }
    

  };

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
          </ButtonGroup>
            <h1 style={{textAlign: "center",fontSize: 40}}>Buy Products</h1>
            <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Product ID</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>seller ID</th>
                <th>Price</th>
                <th>Requests</th>
            </tr>
            </thead>
            <tbody>
              {prods.map((prod)=>(
                  <tr key={prod.prod_id+prod.cat_name+prod.prod_name}>
                    <td>{prod.prod_id}</td>
                    <td>{prod.cat_name}</td>
                    <td>{prod.prod_name}</td>
                    <td>{prod.prod_desc}</td>
                    <td>{prod.seller_id}</td>
                    <td>{prod.price}</td>
                    <td><button onClick={() => handleProdReq(prod['prod_id'],prod['seller_id'])}>Request</button></td>
                  </tr>
              ))}
      
    
    </tbody>
    </table>
            </div>
        </Fragment>
    );
    };

export default BuyProds;