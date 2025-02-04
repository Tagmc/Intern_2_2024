/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles.scss"
import { useTranslation } from "react-i18next";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player"
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { SpeedDial } from "primereact/speeddial";
import { SCREEN, SCREEN_RESIZE, SCREEN_SIZE, WEATHER_CODE } from "../../utils/constants";
import { Carousel } from "primereact/carousel";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { Message } from "primereact/message";
import images from "../../utils/images";
import GoogleMapReact from 'google-map-react';
import Marker from "../components/Marker";
import { MarkerFlag } from "../components/Marker";
const responsiveOptions = [
	{
		breakpoint: '1400px',
		numVisible: 10,
	},
	{
		breakpoint: '1199px',
		numVisible: 6,
	},
	{
		breakpoint: '767px',
		numVisible: 4,
	},
	{
		breakpoint: '575px',
		numVisible: 1,
	}
];

const defaultProps = {
	center: {
		lat: 20.819443,
		lng: 106.685806
	},
	zoom: 11
};

export default function Weather({ className, size }) {

	const { t } = useTranslation()

	const [activeGalleriaIndex, setActiveGalleriaIndex] = useState(0)

	const [data, setData] = useState([{
		lat: 20.819443,
		lng: 106.685806,
		info: {
			name: "Hải Phòng",
			subName: "Thành phố Hải Phòng",
			temperature: 22,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 0,
			weatherStatus: 'Nhiều mây',
			rain: "Nhỏ",
			rainInfo: "< 0.3mm / 12 giờ",
			humidity: 30,
			storm: 'Khả năng thấp',
			wind: "Light air",
			windLevel: "109",
			windSpeed: "1.2",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 28,
			minTemperature: 15,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 21.021646,
		lng: 105.837592,
		info: {
			name: "Hà Nội",
			subName: "Thành phố Hà Nội",
			temperature: 23,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 1,
			weatherStatus: 'Nắng nhẹ',
			rain: "Không",
			rainInfo: "0mm / 12 giờ",
			humidity: 30,
			storm: 'Không',
			wind: "Light air",
			windLevel: "19",
			windSpeed: "0.5",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 25,
			minTemperature: 21,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 16.071746,
		lng: 107.9133188,
		info: {
			name: "Đà nẵng",
			subName: "Thành phố Đà nẵng",
			temperature: 25,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 2,
			weatherStatus: 'Mưa rải rác',
			rain: "Nhỏ",
			rainInfo: "< 0.3mm / 12 giờ",
			humidity: 30,
			storm: 'Có',
			wind: "Light air",
			windLevel: "129",
			windSpeed: "13",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 27,
			minTemperature: 22,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 10.7546182,
		lng: 106.3655847,
		info: {
			name: "Hồ Chí Minh",
			subName: "Thành phố Hồ Chí Minh",
			temperature: 31,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 3,
			weatherStatus: 'Mưa lớn kèm theo dông sét',
			rain: "Lớn",
			rainInfo: "> 5.3mm / 12 giờ",
			humidity: 30,
			storm: 'Có',
			wind: "Light air",
			windLevel: "209",
			windSpeed: "12",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 34,
			minTemperature: 26,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 20.4529239,
		lng: 106.2667127,
		info: {
			name: "Thái Bình",
			subName: "Thái Bình",
			temperature: 27,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 3,
			weatherStatus: 'Mưa lớn kèm theo dông sét',
			rain: "Lớn",
			rainInfo: "> 3.3mm / 12 giờ",
			humidity: 30,
			storm: 'Khả năng thấp',
			wind: "Light air",
			windLevel: "109",
			windSpeed: "1.2",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 32,
			minTemperature: 11,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 21.1505514,
		lng: 106.9437503,
		info: {
			name: "Quảng Ninh",
			subName: "Thành phố Quảng Ninh",
			temperature: 23,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 1,
			weatherStatus: 'Nắng nhẹ',
			rain: "Không",
			rainInfo: "0mm / 12 giờ",
			humidity: 30,
			storm: 'Khả năng thấp',
			wind: "Light air",
			windLevel: "109",
			windSpeed: "1.2",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 32,
			minTemperature: 19,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 9.1753552,
		lng: 105.1047709,
		info: {
			name: "Cà mau",
			subName: "Cà mau",
			temperature: 31,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 2,
			weatherStatus: 'Mưa rải rác',
			rain: "Nhỏ",
			rainInfo: "< 0.3mm / 12 giờ",
			humidity: 50,
			storm: 'Khả năng thấp',
			wind: "Light air",
			windLevel: "109",
			windSpeed: "1.2",
			landslide: "Không",
			cloud: 40,
			maxTemperature: 30,
			minTemperature: 19,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 10.723212786122648,
		lng: 115.82171420449305,
		info: {
			name: "Trường Sa",
			subName: "Trường Sa",
			temperature: 32,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 3,
			weatherStatus: 'Mưa lớn kèm theo dông sét',
			rain: "Lớn",
			rainInfo: "> 4.3mm / 12 giờ",
			humidity: 30,
			storm: 'Có',
			wind: "Light air",
			windLevel: "409",
			windSpeed: "102",
			landslide: "Không",
			cloud: 80,
			maxTemperature: 31,
			minTemperature: 19,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	},
	{
		lat: 16.462814,
		lng: 112.520436,
		info: {
			name: "Hoàng Sa",
			subName: "Hoàng Sa",
			temperature: 21,
			date: '21-03-2024',
			dateFormat: "Thứ 5 ngày 21",
			time: "10:30",
			icon: 3,
			weatherStatus: 'Mưa lớn kèm theo dông sét',
			rain: "Nhỏ",
			rainInfo: "< 0.3mm / 12 giờ",
			humidity: 30,
			storm: 'Khả năng thấp',
			wind: "Light air",
			windLevel: "109",
			windSpeed: "1.2",
			landslide: "Không",
			cloud: 19,
			maxTemperature: 25,
			minTemperature: 19,
			dawn: "6:00AM",
			sunset: "7:00PM"
		}
	}
	]);

	const [numVisible, setNumVisible] = useState(6);

	const [flag, setFlag] = useState()

	useEffect(() => {
		setNumVisible(size ? 15 : 6)
	}, [size])

	const onMapChildClick = (index) => {
		// console.log(item)
		setFlag(data[index])
		setActiveGalleriaIndex(index)
	}
	const onMapChildClose = () => {
		// console.log(item)
		setFlag()
	}

	const onGalleriaChange = (e) => {
		setActiveGalleriaIndex(e.index)
		setFlag(data[e.index])
	}

	const productTemplate = (item) => {
		return (
			<div className="surface-border border-round-xl m-2 text-center p-1 sx-weather-item">
				<div className="flex justify-content-center">
					<div className="w-4rem">
						<dotlottie-player
							src={WEATHER_CODE[item?.info?.icon]} background="transparent" speed="1" loop autoplay
						/>
					</div>
				</div>
				<div>
					<p className="mb-1 text-cyan-500 text-xs">{12}℃</p>
					<p className="mt-0 mb-1 text-cyan-500 text-xs">{item.info.name}</p>
				</div>
				<div>
					<p className="mb-1 text-gray-400 text-xs font-italic">{item.info.date}</p>
					<p className="my-0 text-gray-400 text-xs font-italic">{item.info.time}</p>
				</div>
			</div>
		);
	};

	const renderMarker = (item, index) => {
		return <Marker
			{...item}
			key={index}
		/>
	}

	const highlight = useMemo(() => {
		return flag ?? data[0]
	}, [flag])

	return <div className="sx-weather sx-layout w-full sx-h-full">
		<div className="sx-layout-top">
			<div className="grid m-0">
				<div className="col-6">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText
							placeholder="Tìm kiếm địa điểm..."
							className="w-20rem border-round-3xl"
							size={10}
						/>
					</span>
				</div>
				<div className="col-6">
					<div className="flex align-items-center justify-content-between h-full">
						<div className="flex align-items-center">
							<i className="pi pi-calendar-minus mr-3 text-cyan-500" />
							<span className="text-cyan-500">10:10:23 Ngày 5 tháng 12 năm 2022</span>
						</div>
						<div className="sx-celsius-container border-circle p-2">
							<span className="text-cyan-500">℃</span>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div className="sx-layout-center">
			<div className="grid m-0 h-full">
				<div className="col-8 h-full">
					<div className="sx-layout w-full h-full">
						<div className="sx-layout-top">
							<div className="grid m-0">
								<div className="col-8">
									<div className="sx-location border-round-xl flex align-items-center relative">
										<div className="p-3">
											<div className="flexalign-items-center mb-3">
												<span className="text-cyan-500 font-bold">{highlight?.info?.subName}</span>
											</div>
											<p className="mb-2 text-gray-400 text-xs font-italic">Latitude: {highlight?.lat}</p>
											<p className="my-0 text-gray-400 text-xs font-italic">Longtitude: {highlight?.lng}</p>
										</div>
										<div className="sx-earch w-4 h-full absolute top-0 right-0">

										</div>
									</div>
								</div>
								<div className="col-4 ">
									<div className="flex flex-column align-items-center justify-content-center">
										<div className="w-4rem">
											<dotlottie-player
												key={WEATHER_CODE[highlight?.info?.icon]}
												src={WEATHER_CODE[highlight?.info?.icon]} background="transparent" speed="1" loop autoplay
											/>
										</div>

										<span className="text-cyan-500">{highlight?.info?.temperature}℃</span>
										<span className="text-cyan-500">{highlight?.info?.weatherStatus}</span>
									</div>

								</div>
							</div>
						</div>
						<div className="sx-layout-center">
							<div className="grid h-full">
								<div className="col-12 h-full">
									<GoogleMapReact
										bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_SERVICE }}
										defaultCenter={defaultProps.center}
										defaultZoom={defaultProps.zoom}
										onChildClick={onMapChildClick}
									>
									{flag
										? <MarkerFlag
											{...flag}
											onClose={onMapChildClose}
										/>
										: null
									}
										{data.map(renderMarker)}

									</GoogleMapReact>
								</div>
							</div>
						</div>
						<div className="sx-layout-bottom">
							<Galleria
								value={data}
								activeIndex={activeGalleriaIndex}
								responsiveOptions={responsiveOptions}
								thumbnail={productTemplate}
								onItemChange={onGalleriaChange}
								numVisible={numVisible}
								key={numVisible}
							/>
						</div>
					</div>

				</div>
				<div className="col-4 h-full">
					<div className="sx-weather-right h-full border-round-xl p-3 flex flex-column justify-content-between">
						<div className="">
							<div className="mb-2">
								<Message severity="warn" text="Thái Nguyên có mưa giông" />
							</div>
							<div className="mb-2">
								<Message severity="error" text="Lào cai đang lở đất rất nghiêm trọng" />
							</div>
						</div>

						<div className="flex flex-wrap justify-content-center">
							<Item
								icon={images.heavyRain}
								label={`Lượng mưa: ${highlight?.info?.rain}`}
								description={highlight?.info?.rainInfo}
							/>
							<Item
								icon={images.highTemperature}
								label={`Độ ẩm: ${highlight?.info?.humidity}%`}
							/>
							<Item
								icon={images.storm}
								label={`Sấm sét: ${highlight?.info?.storm}`}
							/>
							<Item
								icon={images.wind}
								label={`Gió: ${highlight?.info?.wind}`}
								description={`Nhẹ: ${highlight?.info?.windLevel}`}
								subDescription={`Tốc độ: ${highlight?.info?.windSpeed}mph`}
							/>
							<Item
								icon={images.weather}
								label={`Nhiệt độ: ${highlight?.info?.temperature}℃`}
							/>
							<Item
								icon={images.landslide}
								label={`Sạt lở đất: ${highlight?.info?.landslide}`}
							/>
						</div>
						<div className="">
							<ItemLineTemplate
								className="mb-2"
								icon={images.clound}
								label={`Mây: ${highlight?.info?.cloud}%`}
							/>
							<ItemLineTemplate
								className="mb-2"
								icon={images.highTemperature}
								label={`Nhiệt độ lớn nhất: ${highlight?.info?.maxTemperature}℃`}
							/>
							<ItemLineTemplate
								className="mb-2"
								icon={images.temperature}
								label={`Nhiệt độ nhỏ nhất: ${highlight?.info?.minTemperature}℃`}
							/>
							<ItemLineTemplate
								className="mb-2"
								icon={images.sunrise}
								label={`Bình minh: ${highlight?.info?.dawn}`}
							/>
							<ItemLineTemplate
								icon={images.sunrise}
								label={`Hoàng hôn: ${highlight?.info?.sunset}`}
							/>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div >
}


const ItemLineTemplate = ({ icon, label, className }) => {
	return (
		<div className={`surface-border border-round-3xl text-center p-2 sx-weather-right-box w-full flex align-items-center ${className}`}>
			<Image
				src={icon}
				width="22"
				height="22"
			/>
			<div className="flex-1 flex justify-content-center">
				<span className="text-cyan-500 text-xs font-bold">{label}</span>
			</div>
		</div>
	);
};

const Item = ({ icon, label, description, subDescription }) => {
	return (
		<div className="surface-border border-round-xl m-2 text-center p-1 sx-weather-right-box w-5">
			<div className="flex justify-content-center">
				<Image
					src={icon}
					width="60"
					height="60"
				/>
			</div>
			<div>
				<p className="mb-1 text-cyan-500 text-xs">{label}</p>
				{description
					? <p className="mt-0 mb-1 text-cyan-500 text-xs">{description}</p>
					: null
				}
				{subDescription
					? <p className="mt-0 mb-1 text-cyan-500 text-xs">{subDescription}</p>
					: null
				}

			</div>
		</div>
	);
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;