import React from 'react';
import { createAlert, CheckConnectivity} from './CommonService';

// export const baseUrl = "http://127.0.0.1:8000/api/"; 
// export const baseUrl = "http://192.168.0.174:8000/api/"; 
export const baseUrl = "http://137.184.230.127/api/"; 


// 192.168.0.174

export const postToServer = (url, data, request) => {
    try {
        let parameters = {};
        parameters['headers'] = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
        parameters['body'] = JSON.stringify(data);
        parameters['method'] = request 
        console.log(baseUrl+url);
        console.log(data)
        return fetch(baseUrl+url, parameters).then((res) => {
            return res.json();
        }).catch(error => {
            // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()

        })
    } catch (error) {
        // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()

    }
}

export const postToServerWithToken = (url, data, request, token) => {
    
    try {
        let parameter = {};
        parameter['headers'] = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization':'Bearer '+token };
        parameter['body'] = JSON.stringify(data);
        parameter['method'] = request
        return fetch(url, parameter).then((res) => {
            console.log(parameter);
            
        // alert(JSON.stringify(parameter))
            return res.json();
        }).catch(error => {
            CheckConnectivity()
        });

    } catch (error) {
        // createAlert("Error", "Please check internet connection and try again");
        CheckConnectivity()
    }
}