import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Box, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";




const ImageIN = () => {
    const [usr, setUsr] = useState([]);
    const [photo, setPhoto] = useState('');
    const toast = useToast();
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

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("photo", photo);

      try {
        const response = await axios.post(
          "http://localhost:4000/auth/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }

    };

    
  
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

          <h1 style={{textAlign: "center",fontSize: 20}}>Image input page</h1>

          <form onSubmit={handleSubmit}>

          <div>
            <label for="photo">Choose a photo:</label>
            <input type="file" id="photo" name="photo" accept="image/*"
            onChange={(event)=>setPhoto(event.target.files[0])}
            required/>
          </div>

          <Button colorScheme="blue" type="submit">
          Upload Image
        </Button>

          </form>
      </Fragment>   
    );
};

export default ImageIN;

// import { useState } from "react";
// import { useNavigate } from "react-router";
// import axios from "axios";
// import {
//   Button,
//   ButtonGroup,
//   Heading,
//   Text,
//   VStack,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   useToast,
// } from "@chakra-ui/react";

// const ImageIN = () => {
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [usr, setUsr] = useState([]);

//   const [image, setImage] = useState(null);

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/auth/upload/image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       toast({
//         title: "Image uploaded",
//         description: "Your image has been uploaded successfully.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "There was an error uploading your image.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       console.error(err);
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/auth/dashboard",
//         { withCredentials: true }
//       );

//       setUsr(response.data[0][0]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(
//         "http://localhost:4000/auth/logout",
//         { withCredentials: true }
//       );

//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <ButtonGroup>
//         <Button
//           style={{ fontSize: 20 }}
//           onClick={() => navigate("/home")}
//         >
//           Home
//         </Button>
//       </ButtonGroup>

//       <h1 style={{ textAlign: "center", fontSize: 40 }}>
//         Welcome back {usr.user_name}
//       </h1>

//       <form onSubmit={onSubmit}>
//         <VStack>
//           <FormControl>
//             <FormLabel>Image:</FormLabel>
//             <Input type="file" accept="image/*" onChange={onImageChange} />
//           </FormControl>
//           {image && (
//             <Box mt={4}>
//               <img src={image} alt="Preview" width="50%" />
//             </Box>
//           )}
//           <Button type="submit" mt={4}>
//             Upload
//           </Button>
//         </VStack>
//       </form>

//       <Button mt={4} onClick={logout}>
//         Logout
//       </Button>
//     </>
//   );
// };

// export default ImageIN;
