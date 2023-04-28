import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Box, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";




const ImageOUT = () => {
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

        <ButtonGroup>
            <Button style={{fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
        </ButtonGroup>
        
          <h1 style={{textAlign: "center",fontSize: 40}}>Welcome back {usr.user_name}</h1>

          <h1 style={{textAlign: "center",fontSize: 20}}>Image output page</h1>
      </Fragment>   
    );
};

export default ImageOUT;