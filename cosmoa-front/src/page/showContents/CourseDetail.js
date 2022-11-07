import React from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

function CourseDetail() {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // <Link to="" />
    // navigate(`/coursedetail/${courseId}`);
    // const courseId = params.id;

    // { history: {}, location: {}, match: {}, ... }
    console.log({ navigate, location, params })


    return (<>
        Course Detail Page
    </>)
}

export default CourseDetail;
