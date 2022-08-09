import axios from 'axios';
import { BASE_URL } from '../config/globals';
//let user = JSON.parse(localStorage.getItem('user'));
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";


export const FETCH_CATEGORY="FETCH_CATEGORY";



export const getCategory = (props) => {
    
    return (dispatch, getState) => {
        
        const url = `/categories`;
        axios.get(`${url}`,
        ).then(({ data }) => {
            //console.log(data)
                dispatch({ type: FETCH_CATEGORY, payload: data.data });
            
        });
    }
}
