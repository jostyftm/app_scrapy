import React, { useEffect, useRef, useState } from "react";
import InputSearchComponent from "../Components/InputSearch";
import UseQuery from "../Hooks/UseQuery";
import { searchResources } from "../Services/resourcesServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, SEARCH_PAGE } from "../Routes/config";
import Pagination from "../Components/Pagination";


const SearchPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    
    const [query, setQuery] = useState('');
    const [resources, setResources] = useState([]);
    const [currentUrl, setCurrentUrl] = useState('');

    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    let queryP = UseQuery();
    let location = useLocation();
    let navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        let inputValue = e.target.q.value;

        console.log(`Vamos a buscar ${inputValue}`);

        let queryPartial = inputValue.replace(/\s+/g, '+');
        let url = `${SEARCH_PAGE}?q=${queryPartial}`;

        setCurrentUrl(url);
        
        setQuery(queryPartial)
        navigate(url);
    }

    const fetchResources = async () => {
        setIsLoading(true);

        try{
            const response = await searchResources({
                params:{
                    paginate:true,
                    page:currentPage,
                    q:query,
                    limit:10
                }
            });
            setResources(response.data.data);
            setLinks(response.data.links);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {

        if(queryP){
            setQuery(queryP.get('q'));

            if(query){
                fetchResources();
            }
        }
        
    }, [query, currentPage]);

    if(!queryP.get('q')){

        return (<Navigate
            to={HOME_PAGE}
            state={{from: location}}
            replace
        />);
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <InputSearchComponent 
                        value={query}
                        onSubnmit={(e) => handleSearch(e)}
                    />
                </div>
            </div>
        </div>
        <div className="container-fluid border-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <nav className="nav mt-2">
                            <a className="nav-link active">Noticias</a>
                            <a className="nav-link disabled">Documentos</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-3">
            <div className="row flex-column">
                {resources.map((resource, index) => (
                    <div key={index} className="col-md-6 d-block">
                        <div className="d-flex align-items-center">
                            <div className="mr-2">
                                <FontAwesomeIcon icon={faGlobe} />
                            </div>
                            <div className="mx-2">
                                <span className="d-block" style={{fontSize:'14px'}}>{resource.search?.website?.name}</span>
                                <span className="text-muted d-block" style={{fontSize:'12px'}}>{resource.url}</span>
                            </div>
                        </div>
                        <div className="">
                            <a target="_blank" href={resource.url} className="fs-5 d-block link">{resource.title}</a>
                        </div>
                        <div>
                            <p className="text-muted" style={{fontSize:'14px'}}>{resource.short_description}</p>
                        </div>  
                    </div>
                ))}
                <Pagination
                    links={links} 
                    handleClickPagination={
                        (e, page) => {
                            e.preventDefault();
                            setCurrentPage(page)
                        }
                    } 
                />
            </div>
        </div>
        </>
    );
}

export default SearchPage;