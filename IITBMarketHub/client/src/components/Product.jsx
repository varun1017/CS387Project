import React, { useState, useEffect, Fragment } from "react";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router";



const Product = () => {
    // const [course, setCourse] = useState({});
    const { product_id } = useParams();
    // const[photo,setPhoto] = use
    const [usr, setUsr] = useState('');
    const [photo, setPhoto] = useState(null);
    const [prod, setProd] = useState([]);
    const [formatdate1,setfd1] = useState('');
    const [formatdate2,setfd2] = useState('');
    // const [prevcours, setPrevCour] = useState([]);
    const navigate = useNavigate();


    const getProductphoto = async () => {
        try {
        //   var jsonData;
          // const res = await  axios.get("http://localhost:4000/auth/dashboard"); //   axios.get(`http://localhost:4000/auth/product/${product_id}`, {withCredentials:true})
          fetch(`http://localhost:4000/auth/image/product/${product_id}`,{
            method:'POST',
            headers:{'Content-Type':'application/pdf'},
            credentials: 'include',
          })        
          .then( (res) => res.blob())
          .then((data)=>{

            if(data.error){
                console.log("failed................");
            }
            else{
            // jsonData= (res.data);
                // console.log(res.data);
                const file = new Blob([data],{type:'application/pdf'});
                const fileUrl = URL.createObjectURL(file);
                console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                setPhoto(fileUrl);
            // setInstr(res.data[0][0]);
            // setCurCour(res.data[1]);
            // setPrevCour(res.data[2]);
            }

        });
        //   console.log(parseData);
        } catch (err) {
          console.error(err.message);
        }
      };

      const getProddet = async () => {
        try {
        //   var jsonData;
          // const res = await  axios.get("http://localhost:4000/auth/dashboard");
          axios.get(`http://localhost:4000/auth/product/${product_id}`, {withCredentials:true}).then( (res) =>{
            // jsonData= (res.data);
            console.log(res.data[0]);
            setProd(res.data[0]);

            const date1 = new Date(res.data[0].created_at);
            setfd1(date1.toLocaleString());

            const date2 = new Date(res.data[0].prod_expdate);
            setfd2(date2.toLocaleString());
        });
        //   console.log(parseData);
        } catch (err) {
          console.error(err.message);
        }
      };

    const getProfile = async () => {
      try {
        axios.get("http://localhost:4000/auth/dashboard", {withCredentials:true}).then( (res) =>{
        console.log(res.data);
        setUsr(res.data[0].user_id);
      });
        // console.log(parseData);
      } catch (err) {
        console.error(err.message);
      }
    };
    
    useEffect(() => {
        getProductphoto();
        getProddet();
        getProfile();
    }, []);



    const logout = (e) => {
        e.preventDefault();
        axios.get("http://localhost:4000/auth/logout", {withCredentials:true}).then( (res) =>{
        navigate("/");
      });
      };

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

    // console.log(c_id);
    return (
    //     <Fragment>
    //   <ButtonGroup pt="1rem">
    //   <Button style={{fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
    //   {/* </ButtonGroup> */}

    //   {/* <ButtonGroup pt="1rem"> */}
    //   {/* </ButtonGroup> */}

    //   {/* <ButtonGroup pt="1rem"> */}
    //   <Button style={{fontSize: 20}} onClick={logout}>logout</Button>
    //   </ButtonGroup>

    //     <h1 style={{textAlign: "center",fontSize: 50}}>Instructor Information</h1>
    //     <h2 style={{textAlign: "center",fontSize: 30}}><b>Name</b>:{instr.name}</h2>
    //     <h2 style={{textAlign: "center",fontSize: 30}}><b>Department</b>:{instr.dept_name}</h2>

    //     <h1 style={{textAlign: "center",fontSize: 40}}>Current Semester Offerings</h1>
    //     <div className='item-container' style={{textAlign: "center",fontSize: 25}}>
    //         {curcours.map((curcour)=>(
    //             <div key={curcour.course_id}>
    //             <h3>
    //             <a href={`/course/${curcour.course_id}`}>{curcour.course_id}:{curcour.title}</a> 
    //                 </h3>
    //             </div>
    //         ))}
    //     </div>
    //     <h1 style={{textAlign: "center",fontSize: 40}}>Previous Semester Offerings</h1>
        
    //     {prevcours.length===0 ? (<h2 style={{textAlign: "center",fontSize: 25}}>No previous semester courses taught</h2>)
    //     : (
    //     <table className="table mt-5 text-center">
    //     <thead>
    //             <tr>
    //                 {/* <th>Instructor ID</th> */}
    //                 <th>Course ID</th>
    //                 <th>Title</th>
    //                 <th>Semester</th>
    //                 <th>Year</th>
    //             </tr>
    //     </thead>
    //     <tbody>
    //         {prevcours.map((prevcour)=>(
    //             <tr key={prevcour.course_id+prevcour.sec_id+prevcour.semester+prevcour.year}>
    //             <td>
    //             <a href={`/course/${prevcour.course_id}`}>{prevcour.course_id}</a>
    //                 </td>
    //             <td>{prevcour.title}</td>
    //             <td>{prevcour.semester}</td>
    //             <td>{prevcour.year}</td>
    //             </tr>
    //         ))}
    //     </tbody>
    //     </table>
    //     )}
        
    //     </Fragment>
    <div>

        <ButtonGroup>
          <Button style={{fontSize: 20}} onClick={() => navigate("/home")}>Home</Button>
          <Button style={{textAlign: "center", fontSize: 20}} onClick={() => navigate("/myprofile")}>View Profile</Button>
        </ButtonGroup>

        <h1 style={{textAlign: "left",fontSize: 40}}><strong>Product Name:</strong> {prod.prod_name}</h1>
        <h1 style={{textAlign: "left",fontSize: 40}}><strong>Seller ID:</strong> {prod.seller_id}</h1>
        {/* <h1 style={{textAlign: "left",fontSize: 40}}><strong>Buyer ID:</strong> {prod.buyer_id}</h1> */}
        <h1 style={{textAlign: "left",fontSize: 40}}><strong>Description:</strong> {prod.prod_desc}</h1>
        <h1 style={{textAlign: "left",fontSize: 40}}><strong>Price:</strong> {prod.price}</h1>
        <h1 style={{textAlign: "left",fontSize: 40}}><strong>Posted on:</strong> {formatdate1}</h1>
        
        {/* <h1 style={{textAlign: "left",fontSize: 40}}><strong>Expiry date:</strong> {formatdate2}</h1> */}
        {prod.buyer_id === null ? (
        <h1 style={{ textAlign: "left", fontSize: 40 }}>
          <strong>Expiry date:</strong> {formatdate2}
        </h1>
      ) : (
        <h1 style={{ textAlign: "left", fontSize: 40 }}>
          <strong>Buyer ID:</strong> {prod.buyer_id}
        </h1>
      )}

        <form>
        <br/>
        <h3 style={{textAlign:'left',fontSize: 40}}> <strong>Product Photo:</strong> </h3>
        <img src={photo} width="50%" height="50%"/>
        <br/>
        </form>

    

        {usr !== prod.seller_id && (<button onClick={() => handleProdReq(prod['prod_id'],prod['seller_id'])}
        style={{
          backgroundColor: 'orange',
          color: 'white',
          fontSize: '1.5rem',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
        }}
        >Request</button>

    )}

        

    </div>

    );
    };

export default Product;