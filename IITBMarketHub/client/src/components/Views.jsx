// import { Text } from "@chakra-ui/layout";
// import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Login/SignUp";

const Views = () => {
  return (
    // <Header>
    <Routes>
      {/* <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<SignUp />} />
      
      {/* <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/home/registration" element={<Registration />} />
        <Route path="/course/running" element={<RunCourse />} />
        <Route path="/course/running/:dept_name" element={<RunDeptCourse />} />
        <Route path="/course/:course_id" element={<Course />}  />
        <Route path="/instructor/:instructor_id" element={<Instructor />} />
      </Route> */}
      
      <Route path="*" element={<SignUp />} />
    </Routes>
    // </Header>
  );
};

export default Views;
