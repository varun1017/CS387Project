import { Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./Home";
import Sell from "./Sell";
import BuyProds from "./BuyProds";
import MyProds from "./MyProds";
import InProdReq from "./InProdReq";
import OutProdReq from "./OutProdReq";
import BuyedProds from "./BuyedProds";
import SoldProds from "./SoldProds";
import Product from "./Product";
import ViewMyProfile from "./ViewMyProfile";
import BuyCatProds from "./BuyCatProds";


const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    // <Header>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/myprofile" element={<ViewMyProfile />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/products/buy" element={<BuyProds />} />
        <Route path="/products/buy/:category_name" element={<BuyCatProds />} />
        <Route path="/myproducts" element={<MyProds />} />
        <Route path="/myproducts/requests" element={<InProdReq />} />
        <Route path="/products/myrequests" element={<OutProdReq />} />
        <Route path="/products/buyed" element={<BuyedProds />} />
        <Route path="/myproducts/sold" element={<SoldProds />} />
        <Route path="/product/:product_id" element={<Product />} />
        {/* <Route path="/home/registration" element={<Registration />} />
        <Route path="/course/running" element={<RunCourse />} />
        <Route path="/course/running/:dept_name" element={<RunDeptCourse />} />
        <Route path="/course/:course_id" element={<Course />}  />
        <Route path="/instructor/:instructor_id" element={<Instructor />} /> */}
      </Route>
      
      <Route path="*" element={<Login />} />
    </Routes>
    // </Header>
  );
};

export default Views;
