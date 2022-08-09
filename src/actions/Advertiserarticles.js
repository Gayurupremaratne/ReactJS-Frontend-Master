import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { BASE_URL } from '../config/globals';
//let access_token = localStorage.getItem('access_token');
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";


export const ADD_ARTICLE = "ADD_ARTICLE";

export const addArticles = (data1, data2) => {
    //console.log(data1,data2)
    return (dispatch, getState) => {

        const url = `/article/create`;

        axios.post(`${url}`,

            data1, data2).then(({ data }) => {

                toastr.success('Success', 'Successfully Added');

            });
    }
}

export const updateArticle = (data, id) => {
    return function (dispatch, getState) {
        const url = `/article/update/${id}`;
        console.log(url);
        axios.put(`${url}`,
            data
        ).then(function (response) {
            console.log(response);
            toastr.success('Success', 'You have successfully submitted the article');
            // if (response.data.status) {
            //     dispatch(
            //         {
            //             type: SHOW_NOTIFICATION,
            //             payload: { type: "success", message: response.data.friendly_message }
            //         });
            // } else {
            //     dispatch(
            //         {
            //             type: SHOW_NOTIFICATION,
            //             payload: { type: "warning", message: response.data.friendly_message }
            //         });
            // }
        }).catch(function (error) {
            console.log('LLLLLLLLLLL');
            toastr.success('Success', 'Successfully Added');
            dispatch(
                {
                    type: SHOW_NOTIFICATION,
                    payload: { type: "warning", message: error }
                });
        });
    }
}

export const uploadArticle = (data) => {
    return function (dispatch, getState) {
        const url = `/file/upload`;
        console.log(url);
        axios.post(`${url}`,
            data
        ).then(function (response) {
            console.log(response);
            toastr.success('Success', 'Successfully Added');
            // if (response.data.status) {
            //     dispatch(
            //         {
            //             type: SHOW_NOTIFICATION,
            //             payload: { type: "success", message: response.data.friendly_message }
            //         });
            // } else {
            //     dispatch(
            //         {
            //             type: SHOW_NOTIFICATION,
            //             payload: { type: "warning", message: response.data.friendly_message }
            //         });
            // }
        }).catch(function (error) {
            console.log('LLLLLLLLLLL');
            toastr.success('Success', 'Successfully Added');
            dispatch(
                {
                    type: SHOW_NOTIFICATION,
                    payload: { type: "warning", message: error }
                });
        });
    }
}


