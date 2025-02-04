import axios from 'axios';
import moment from 'moment';
import { BASE_SHARE_URL, BASE_URL } from '../../config';
// import ActionToast from '../actions/ActionToast';
import store from '../store/configureStore';
import { CommonHelper } from '../../helper/CommonHelper';

const axiosClient = axios.create({
    // baseURL: BASE_URL,
});


// handle request
axiosClient.interceptors.request.use(async (config) => {
    const state = store.getState()
    // if (CommonHelper.data?.eventCode && state?.userReducer?.events && state?.userReducer?.events[CommonHelper.data?.eventCode]?.token) {
    //     config.headers.Authorization = `Bearer ${state?.userReducer?.events[CommonHelper.data?.eventCode]?.token}`;
    // }
    // // token
    // // config.headers.Authorization = `Bearer ${keycloak.token}`;
    // // language
    // // config.headers.common['Accept-Language'] = localStorage.getItem("I18N_LANGUAGE");
    // config.headers.code = CommonHelper.data?.eventCode
    // config.headers[`Content-Language`] = CommonHelper.data?.language
    // // company id
    // convert data of date
    // if (config.data) {
    //     convertDate(config.data);
    // }

    return config;
})

// handle response
axiosClient.interceptors.response.use((response) => {
    var res = null;

    if (response && response.data) {
        if (response.data instanceof Blob) {
            // check if response file blob
            res = response.data;
        } else {
            // normal request
            if (response.data) {
                res = response.data
            } else {
                console.log("Response Error !!!", response)
                // CommonFunction.toastError(response.message ? response.message : response.data.message);
                makeError(response.message ? response.message : response.data.message)
            }
        }
    } else {
        console.log("Axios: No response", response);
        if (response.message) {
            // CommonFunction.toastError(response.message);
            makeError(response.message)
        }
    }
    return res;
}, error => {
    // Handle errors
    if (error.response && error.response.data) {
        // CommonFunction.toastError(error.response.data.message);
        makeError(error.response.data.message)
    } else {
        makeError(error.message)
        // CommonFunction.toastError(error.message);
    }
    return null;
});

export default axiosClient;

const makeError = (error) => {
    // store.dispatch(ActionToast.createErorr(error))
    // ToastHelper.show({ severity: 'error', summary: i18n.t("common.error"), detail: error })
}