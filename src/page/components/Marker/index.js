import { Image } from "primereact/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import './styles.scss'
import { classNames } from "primereact/utils";

const Marker = ({ info }) => {

    return <div className="relative">
        <div className="absolute sx-marker-icon cursor-pointer">
            <dotlottie-player src="https://lottie.host/f5a969cc-c0a5-41e5-b380-c67cf7acad0f/YQP94le30T.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
        </div>
        <div className="absolute mt-2 sx-marker-label-container cursor-pointer">
            <div className="font-bold text-white sx-marker-label text-xs">{info.name}</div>
        </div>
        
    </div>
}

export default Marker

export const MarkerFlag = ({ info, onClose }) => {
    return <div className="relative">
        <div className={classNames({ "absolute bottom-0 left-0": true })} >
            {/* <div className="font-bold text-white sx-marker-label">{info.name}</div> */}
            <div className="sx-marker-line shadow-4 absolute bottom-0">
            </div>
            <div className="flex sx-marker-info shadow-4 absolute pl-3 pr-1 py-1 align-items-center">
                <span className="sx-marker-info-label font-bold text-base text-gray-500">{info.temperature}℃</span>
                <span className="sx-marker-info-label font-bold text-base ml-4 mr-2 text-gray-400">{info.dateFormat}, {info.time}</span>
                <div className="cursor-pointer" onClick={onClose}>
                    <i className="pi pi-times" />
                </div>
            </div>
        </div>
    </div>
}

export const MarkerCar = ({ info }) => {

    return <div className="relative">
        <div className="absolute sx-marker-car-container cursor-pointer"
        
        style={{transform: `rotate(${info.Angle ?? 0}deg)`}}
        >
            <Image
                src="https://freepngimg.com/thumb/car/75694-bird's-eye-car-top-view,plan-view-icon.png"
                height="28"
                width="28"
            />
        </div>
    </div>
}
