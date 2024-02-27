import React from 'react';
import { createAlert, CheckConnectivity} from './CommonService';
import { useDispatch, useSelector } from 'react-redux';

// export const baseUrl = "http://127.0.0.1:8000/api/"; 
// export const baseUrl = "http://192.168.0.174:8000/api/"; 
// export const baseUrl = "http://137.184.230.127/api/"; 
export const baseUrl ="https://smartcollect.co.ug/api/"


// 192.168.0.174

export const postToServer = (url:any, data:any, request:any) => {
    try {
        let parameters:any = {};
        parameters['headers'] = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
        parameters['body'] = JSON.stringify(data);
        parameters['method'] = request 
        return fetch(baseUrl+url, parameters).then((res:any) => {
            return res.json();
        }).catch((error:any) => {
            // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()

        })
    } catch (error:any) {
        // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()

    }
}

export const postToServerWithToken = (url:any, data:any, request:any, token:any) => {
    try {
        let parameter:any = {};
        parameter['headers'] = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization':'Bearer '+ token };
        parameter['body'] = JSON.stringify(data);
        parameter['method'] = request
        return fetch(baseUrl+url, parameter).then((res:any) => {
        // alert(JSON.stringify(parameter))
            return res.json();
        }).catch((error:any) => {
            CheckConnectivity()
        });

    } catch (error:any) {
        // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()
    }
}