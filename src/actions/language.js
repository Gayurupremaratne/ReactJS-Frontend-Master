import axios from 'axios';
import { BASE_URL } from '../config/globals';
//let user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['Content-Type'] = "application/json";


export const FETCH_LANGUAGE="FETCH_LANGUAGE";



export const getLanguage = (props) => {
    
    return (dispatch, getState) => {
        
        const url = `/language/list`;
        axios.get(`${url}`,
        ).then(({ data }) => {
            //console.log("Languages: ",data)
                dispatch({ type: FETCH_LANGUAGE, payload: data.data });
            
        });
    }
}