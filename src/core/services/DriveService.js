import axios from "axios";
import axiosClient from "./axiosClient";

const DriveService = {
    dvbk: {
        getCars: () => {
            return axiosClient.get("http://dvbk.vn/BachKhoaAPI/GetInfoCar?username=ctvietbac&password=123456")
        },
        getCarRouter: (num, from, to) => {
            return axiosClient.get(`http://dvbk.vn/BachKhoaAPI/GetTripInfoAPI?username=ctvietbac&password=123456&numberplate=${num}&datefrom=${from}&dateto=${to}`)
        }
    }
}

export default DriveService