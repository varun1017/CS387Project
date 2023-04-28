import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const Home = () => {
  const [usr, setUsr] = useState([]);
  const navigate = useNavigate();
  const getProfile = async () => {
    try {
      axios.get("http://localhost:4000/auth/dashboard", {withCredentials:true}).then( (res) =>{
      // console.log(res.data);
      setUsr(res.data[0][0]);
    });
      // console.log(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios.get("http://localhost:4000/auth/logout", {withCredentials:true}).then( (res) =>{
    navigate("/");
  });
  };

  return (
    <Fragment>
        <h1 style={{textAlign: "center",fontSize: 40}}>Welcome back {usr.user_name}</h1>
        
        <h1 style={{textAlign: "center",fontSize: 40}}>Sell section</h1>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/sell")}>Sell Products</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/myproducts")}>My Products</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/myproducts/requests")}>Incoming Requests</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/myproducts/sold")}>Sold Products</Button>
        </ButtonGroup>

        <h1 style={{textAlign: "center",fontSize: 40}}>Buy Section</h1>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buy")}>Buy Products</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/myrequests")}>Outgoing Requests</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/products/buyed")}>Buyed Products</Button>
        </ButtonGroup>

        <h1 style={{textAlign: "center",fontSize: 40}}>Image section</h1>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/image/input")}>Upload Image</Button>
          <Button style={{fontSize: 20}} onClick={() => navigate("/image/output")}>View Image</Button>
        </ButtonGroup>

        <h1 style={{textAlign: "center",fontSize: 40}}>Logout</h1>
        <ButtonGroup>
        <Button style={{fontSize: 20}} onClick={logout}>logout</Button>
        </ButtonGroup>
      {/* <center>
      <div>
        <h1>Welcome back, {usr.user_name}.</h1>
      </div>
      </center> */}

    </Fragment>   
  );
};

export default Home;