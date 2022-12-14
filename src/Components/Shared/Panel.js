import React from "react";

const Panel = ({children, ...rest}) => {
    return(
        <div className="shadow-sm bg-white rounded p-4 mb-3">
            {children}
        </div>
    );
}

export default Panel;