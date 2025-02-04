import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

export default class AppHelper {
    static ref;
    static data = {
        token: null
    }

    static setAppHelper(ref) {
        this.ref = ref;
    }

    static changeToken = (_token) => {
        this.ref.changeToken(_token)
        this.data = {
            ...this.data,
            token: _token
        }
    }
}

const AppHelperNode = ({ changeToken }, ref) => {

    const location = useLocation();
    console.log(location)
    const dispatch = useDispatch()

    useEffect(() => {
        loadMaster()
    }, [])

    const loadMaster = () => {
        
    }

    useImperativeHandle(ref, () => ({
        changeToken: (data) => {
            changeToken(data)
        }
    }))

    return null
}

export const AppHelperComponent = forwardRef(AppHelperNode)
