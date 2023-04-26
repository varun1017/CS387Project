import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Box, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const Sell = () => {
    const [usr, setUsr] = useState([]);
    const [prodName, setProdName] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [prodExpDate, setProdExpDate] = useState("");
    const [images, setImages] = useState([]);
    // const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   setImages((prevImages) => [...prevImages, file]);
//   // console.log(images);
// };

const handleSubmit = async (event) => {
  event.preventDefault();

  // const formData = new FormData();
  // formData.append("prod_name", prodName);
  // formData.append("prod_desc", prodDesc);
  // formData.append("category_id", category);
  // formData.append("price", price);
  // formData.append("prodExpDate", prodExpDate);

  // for (const image of images) {
  //   formData.append("product_images", image);
  // }

  // console.log(formData);

  try{
    // const formData = new FormData();
    // formData.append('prodName', prodName);
    // formData.append('prodDesc', prodDesc);
    // formData.append('category', category);
    // formData.append('price', price);
    // formData.append('prodExpDate', prodExpDate);
    // formData.append("images", images[0].data);
    // for (let i = 0; i < images.length; i++) {
    //   formData.append(`image_${i}`, images[i]);
    // }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    
    // const response = await fetch("http://localhost:4000/auth/sell", {
    //   credentials: 'include',
    //   method: "POST",
    //   body: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });

    const body = { prodName,prodDesc,category,price,prodExpDate };
    console.log(body);
    const response = await fetch("http://localhost:4000/auth/sell", {
      credentials: 'include',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // let formData = new FormData();
    // formData.append('file', image.data);
    // const response1 = await fetch("http://localhost:4000/auth/sell", {
    //   method: 'POST',
    //   body1: formData,
    // });
    // if (response1) setStatus(response.statusText);

    if(response.ok){
      console.log(data);
      alert(`Successfully uploaded`);
      navigate('/home');
    }
    else {
      throw new Error("Fail");
    }
    // toast({
    //   title: "Product uploaded!",
    //   description: response.data.message,
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
  }
  catch(err){
    console.error(err.message);
  }
  //  catch (error) {
  //   toast({
  //     title: "Error13rt5",
  //     description: error.message,
  //     status: "error",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //  }

  //   const data = await response.json();
  //   if (response.ok) {
  //     // window.location.reload();
  //     // alert(`You have Successfully Registered Course:${c_id}, Section:${cs_id} `);
  //     console.log(data);
  //   } 
  //   else {
  //     throw new Error("Fail");
  //   }
  // }
  // catch(err){
  //   console.error(err.message);
  // }




  // try {
  //   const response = await axios.post("http://localhost:4000/auth/sell", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   toast({
  //     title: "Product uploaded!",
  //     description: response.data.message,
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  // } catch (error) {
  //   toast({
  //     title: "Error13rt5",
  //     description: error.message,
  //     status: "error",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  // }

};

// useEffect(() => {
//   handleSubmit();
// }, []);


const handleImageUpload = (e) => {
  const uploadedImages = Array.from(e.target.files).map((file) => {
    const img = {
      preview: URL.createObjectURL(file),
      data: file,
    };
    return img;
  });
  setImages(uploadedImages);
};


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
            <Button style={{fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
        </ButtonGroup>
      {/* <center>
      <div>
        <h1>Welcome back, {usr.user_name}.</h1>
      </div>
      </center> */}

 
      <Box maxW="500px" mx="auto" mt="10">
      <Heading as="h1" mb="5">
        Sell a Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="3" isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            value={prodName}
            onChange={(event) => setProdName(event.target.value)}
          />
        </FormControl>
        <FormControl mb="3" isRequired>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            value={prodDesc}
            onChange={(event) => setProdDesc(event.target.value)}
          />
        </FormControl>
        <FormControl mb="3" isRequired>
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </FormControl>
        <FormControl mb="3" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </FormControl>
        <FormControl mb="3" isRequired>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              type="datetime-local"
              placeholder="Enter product expiration date"
              value={prodExpDate}
              onChange={(event) => setProdExpDate(event.target.value)}
            />
        </FormControl>
        {/* <FormControl mb="3">
          <FormLabel>Images</FormLabel>
          <Input type="file" multiple onChange={handleImageUpload} />
          {images.length > 0 && (
            <Text fontSize="sm" mt="2">
              {images.length} image{images.length > 1 && "s"} selected
            </Text>
          )}
        </FormControl> */}
        {/* <input type='file' name='file' onChange={handleImageUpload}></input> */}
        <Button colorScheme="blue" type="submit">
          Upload Product
        </Button>
        {/* <button onClick={() => handleSubmit(,course['sec_id'])}>Register</button> */}
      </form>
      </Box>
      </Fragment>  
  );
};

export default Sell;