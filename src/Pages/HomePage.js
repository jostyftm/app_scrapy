import React from "react";

import { useNavigate } from "react-router-dom";
import InputSearchComponent from "../Components/InputSearch";
import { SEARCH_PAGE } from "../Routes/config";

const HomePage = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let inputValue = e.target.q.value;
        let url = `${SEARCH_PAGE}?q=${inputValue.replace(/\s+/g, '+')}`;

        navigate(url);
    }

    return(
        <div className="container">
            <div className="row vh-100 align-items-center">
                <div className="col-md-6 mx-auto">
                    <h1 className="text-center">¿Que quieres saber?</h1>
                    <InputSearchComponent 
                        onSubnmit={(e) => handleSubmit(e)}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;