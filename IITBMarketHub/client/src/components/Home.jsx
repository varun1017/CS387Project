import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const Home = () => {
  // const [usr, setUsr] = useState([]);
  const navigate = useNavigate();
  // const getProfile = async () => {
  //   try {
  //     axios.get("http://localhost:4000/auth/dashboard", {withCredentials:true}).then( (res) =>{
  //     // console.log(res.data);
  //     setUsr(res.data[0][0]);
  //   });
  //     // console.log(parseData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const logout = (e) => {
    e.preventDefault();
    axios.get("http://localhost:4000/auth/logout", {withCredentials:true}).then( (res) =>{
    navigate("/");
  });
  };

  return (
    <Fragment>
      {/* <h1 style={{textAlign: "center", fontSize: 40}}>Welcome back {usr.user_name}</h1> */}
  
      <ButtonGroup>
        <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
        <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/myprofile")}>View Profile</Button>
      </ButtonGroup>
  
      <div style={{margin: "40px 0"}}>
        <h1 style={{textAlign: "center", fontSize: 40}}>Buy Category wise</h1>
        <br></br>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy/Electronics")}>Electronics</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy/Furniture")}>Furniture</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy/Stationary")}>Furniture</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy/SportsEquipment")}>Electronics</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy/Others")}>Others</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy")}>All categories</Button>
        </ButtonGroup>
      </div>
  
      <div style={{margin: "40px 0"}}>
        <h1 style={{textAlign: "center", fontSize: 40}}>Sell section</h1>
        <br></br>
        <ButtonGroup>
          <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/sell")}>Sell</Button>
          <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/myproducts")}>My ADS</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/myproducts/requests")}>Incoming Requests</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/myproducts/sold")}>Sold Products</Button>
        </ButtonGroup>
      </div>
  
      <div style={{margin: "40px 0"}}>
        <h1 style={{textAlign: "center", fontSize: 40}}>Buy Section</h1>
        <br></br>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/myrequests")}>Outgoing Requests</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buyed")}>Buyed Products</Button>
        </ButtonGroup>
      </div>
  
      <div style={{margin: "40px 0"}}>
        <h1 style={{textAlign: "center", fontSize: 40}}>Logout</h1>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={logout}>Logout</Button>
        </ButtonGroup>
      </div>
    </Fragment>
  );
  
};

export default Home;