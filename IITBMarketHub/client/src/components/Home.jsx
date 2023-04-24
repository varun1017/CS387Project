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

  return (
    <Fragment>
        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/sell")}>Sell</Button>
        </ButtonGroup>
      <center>
      <div>
        <h1>Welcome back, {usr.user_name}.</h1>
      </div>
      </center>

    </Fragment>   
  );
};

export default Home;