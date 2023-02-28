import * as React from "react";
import { useState } from "react";
import axios from "axios";
import './App.css';
// import { Image } from "cloudinary-react";


import FormUpload from './FormUpload';
import FormUploadOne from './FormUploadOne';


const Home = () => {

    return (<>

        <FormUpload />
        <FormUploadOne />


    </>);
};

export default Home;
