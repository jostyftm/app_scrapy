import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"
import Panel from "../../../Components/Shared/Panel";

import { getAllWebsites } from "../../../Services/websiteServices";
import WebsiteEditModal from "../../../Components/Website/Edit";
import WebsiteCreateModal from "../../../Components/Website/Create";
import { WEBSITE_CONFIG_PAGE_ROUTE } from "../../../Routes/config";
import Moment from "react-moment";

const WebsiteListPage = () => {

    const [websites, setWebsites] = useState([]);
    const [websiteSelected, setWebsiteSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchWebsites = async () => {

        setIsLoading(true);

        try{
            const responseWebsite = await getAllWebsites();

            setWebsites(responseWebsite.data);
            console.log(responseWebsite);
        }catch(err){

        }
    }

    useEffect(() => {

        fetchWebsites();
        
    }, []);


    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Sitios webs</h1>
                <button 
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalAddWebsite"
                >
                    Nuevo sitio
                </button>
            </div>
            <Panel>
                <div>

                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Url</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {websites?.map((website, index) => (
                                <tr key={index}>
                                    <td>{website.id}</td>
                                    <td>{website.name}</td>
                                    <td>{website.state}</td>
                                    <td><span className="badge bg-primary">{website.url}</span></td>
                                    <td>
                                        <Moment format="LL">
                                            {website.created_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="LL">
                                            {website.updated_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-sm rounded-pill btn-primary"
                                                data-bs-toggle="dropdown" 
                                                aria-expanded="false"
                                                type="button"
                                                id="employee"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsisH}
                                                />
                                            </button>
                                            <ul
                                                className="dropdown-menu shadow border-0 rounded"
                                            >
                                                <li>
                                                    <button
                                                        className="dropdown-item text-default"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalEditWebsite"
                                                        onClick={(e) => setWebsiteSelected(website.id)}
                                                    >
                                                        {/* <FontAwesomeIcon icon={faEdit} className="me-2" /> */}
                                                        Editar sitio web
                                                    </button>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="dropdown-item"
                                                        to={WEBSITE_CONFIG_PAGE_ROUTE(website.id)}
                                                    >
                                                        {/* <FontAwesomeIcon icon={faEdit} className="me-2" /> */}
                                                        Configurar sitio web
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteClient"
                                                        onClick={(e) => setWebsiteSelected(website.id)}
                                                    >
                                                        {/* <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> */}
                                                        Eliminar sitio web
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <WebsiteEditModal 
                    id="modalEditWebsite"
                    webisteId={websiteSelected}
                    onUpdate={(result) => {if(result){fetchWebsites()}}}
                />
                <WebsiteCreateModal
                    id="modalAddWebsite"
                    onCreate={(result) => {if(result){fetchWebsites()}}}
                />
            </Panel>
        </>
    );
}

export default WebsiteListPage;