import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/resources";

export const getAllResources = (config) => requestGet(endpoint, config);

export const getResource = (id) => requestGet(`${endpoint}/${id}`);

export const saveResource = (data) => requestPost(endpoint, data);

export const updateResource = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteResource = (id) => requestDelete(`${endpoint}/${id}`);

export const searchResources = (config) => requestGet('/search', config); 