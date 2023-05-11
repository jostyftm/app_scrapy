import React, { useEffect, useState } from "react";
import Panel from "../../../Components/Shared/Panel";
import Pagination from '../../../Components/Pagination';
import Moment from 'react-moment';

import { getAllResources } from "../../../Services/resourcesServices";

const ResourceListPage = () => {

    const [resources, setResources] = useState([]);

    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchResource = async () => {
        
        try{
            const responseResource = await getAllResources({
                params:{
                    paginate:true,
                    page:currentPage,
                    q:query,
                    limit:6
                }
            });
            setResources(responseResource.data.data);
            setLinks(responseResource.data.links);

            console.log(responseResource);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {

        fetchResource();
    }, [query, currentPage]);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Rescursos</h1>
                {/* <button 
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalAddSearch"
                >
                    Nueva busqueda
                </button> */}
            </div>
            <Panel>
                <div>

                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Titulo</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((resource, index) => (
                                <tr key={index}>
                                   <td>{resource.id}</td> 
                                   <td>{resource.resource_type?.name}</td> 
                                   <td>
                                        <a 
                                            className="nav-link" 
                                            href={resource.url} 
                                            target="_blank"
                                        >{resource.title}</a>
                                    </td> 
                                   <td>
                                    <Moment format="LL">
                                        {resource.created_at}
                                        </Moment>
                                    </td> 
                                   <td>
                                    <Moment format="LL">
                                        {resource.updated_at}
                                    </Moment>
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </Panel>
        </>
    );
}

export default ResourceListPage;