import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const InputSearchComponent = ({value, onSubnmit}) => {

    const formRef = useRef(null);

    return(
        <form 
            ref={formRef}
            className="mt-4"
            onSubmit={onSubnmit}
        >
            <div className="d-flex align-items-center border rounded-pill p-2 px-4">
                <input 
                    name="q"
                    type={"text"} 
                    className="w-100 border-0 input-seacrh" 
                    defaultValue={value || ''}
                />
                <FontAwesomeIcon icon={faSearch} className="mx-1" />
            </div>
        </form>
    );
}

export default InputSearchComponent;