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
import { SCREEN, SCREEN_RESIZE, SCREEN_SIZE } from "../../utils/constants";
import { Carousel } from "primereact/carousel";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { Message } from "primereact/message";
import images from "../../utils/images";
import GoogleMapReact from 'google-map-react';
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import { TabPanel, TabView } from "primereact/tabview";
import { PanelMenu } from "primereact/panelmenu";
// import jsmpeg from "jsmpeg";
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { Badge } from "primereact/badge";
// import JSMpeg from '@flomon-ui/jsmpeg'
// import jsmpeg from "jsmpeg";
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

export default function Camera({ className, size }) {

	const { t } = useTranslation()

	const [lazyPage] = useState({})

	const [camera, setCamera] = useState([]);
	const [chartOptions, setChartOptions] = useState({});
	const onMenu = useCallback((num) => {
		// console.log(new Array(num))
		let a = []
		for (let i = 0; i < num; i++) {
			a.push(i)
		}
		setCamera(a)
	}, [])


	

	useEffect(() => {

	}, []);

	const userClass = useMemo(() => {
		let num = 12
		let height = 12
		if (camera.length > 1 && camera.length <= 4) {
			num = 6
			if (camera.length <= 2) {
				height = 12
			} else {
				height = 6
			}
		}
		if (camera.length > 4 && camera.length <= 9) {
			num = 4
			if (camera.length <= 6) {
				height = 6
			} else {
				height = 4
			}
		}
		if (camera.length > 9 && camera.length <= 24) {
			
			if (camera.length <= 16) {
				num = 3
				height = 3
			} else if (camera.length <= 18) {
				num = 2
				height = 3
			} else {
				num = 2
				height = "2-4"
			}
		}

		if (camera.length > 24) {
			num = Math.floor(12 / Math.floor(camera.length / 5))
			height = "2-4"
		}
		if (camera.length) {
			return `w-${!!num ? num : 1} sx-h-${!!height ? height : 12}`
		}

		return ""
	}, [camera])

	const renderCamera = (cam, index) => {
		return <Cam
			key={index}
			cam={cam}
			className={`${userClass}`}
		/>
	}



	return <div className="sx-camera sx-layout w-full sx-h-full">
		<div className="sx-layout-center">
			<div className="grid m-0 h-full">
				<div className="col-4 h-screen">

					<div className="sx-layout w-full h-full">
						<div className="sx-layout-top mb-3">
							<div className="flex">
								<span className="p-input-icon-left flex-1 mr-3">
									<i className="pi pi-search" />
									<InputText
										placeholder="Tìm kiếm ..."
										className="w-full"
										size={10}
									/>
								</span>
								<Button
									className=""
									outlined
									icon="pi pi-filter"
								/>
							</div>
						</div>
						<div className="sx-layout-center relative">
							<div className="overflow-scroll absolute w-full h-full">
								<Menu
onMenu={onMenu}
								/>

							</div>
						</div>
					</div>
				</div>
				<div className="col-8 h-screen">
					<div className="flex flex-wrap w-full h-full">
						{camera.map(renderCamera)}
					</div>
				</div>

			</div>
		</div>
	</div >
}

const Cam = ({ cam, className, key }) => {

	const [rate, setRate] = useState()

	const videoStream = useMemo(() => {
		if (cam) {
			// 			let websocket = new WebSocket("ws://127.0.0.1:9999")
			// 		// console.log(websocket)
			// 		var canvas = document.getElementById('videoCanvas');
			// var player = new jsmpeg(websocket, {canvas:canvas, autoplay: true, loop: true});

			const mediaStream = new MediaStream();
			// mediaStream.addTrack(stream.track);

			return mediaStream;
		}
		return null
	}, [cam]);

	const canvasRef = useRef();
	const playerRef = useRef();

	useEffect(() => {
		// let websocket = new WebSocket("ws://127.0.0.1:9999")
		// console.log(websocket)
		let websocket = new WebSocket("ws://127.0.0.1:9999")
		// 		// console.log(websocket)
		var canvas = document.getElementById(`videoCanvas-${cam}`);
		// var player = new jsmpeg(websocket, {canvas:canvas, autoplay: true, loop: true});
		// playerRef.current = new JSMpeg.VideoElement(`#videoCanvas-${cam}`, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", { canvas: canvas, autoplay: false, loop: true, control: true, audio: false });
		playerRef.current = new JSMpeg.Player("ws://127.0.0.1:9999", { canvas: canvas, autoplay: false, loop: true, control: true, audio: false });
		if (playerRef.current) {
			// player.resume()
			setRate(100 * (playerRef.current?.video?.destination?.height ?? 0) / (playerRef.current?.video?.destination?.width ?? 1))
		}
		return () => {
			playerRef.current?.destroy();
		};
	}, [])
	// const playerRef = useRef();
	// useEffect(() => {
	// 	if (canvasRef.current) {
	// 		let websocket = new WebSocket("ws://127.0.0.1:9999")
	// 		playerRef.current = new JSMpeg.Player(websocket, {
	// 			canvas: canvasRef.current,
	// 			autoplay: true,
	// 		});
	// 	}
	// 	return () => {
	// 		playerRef.current?.destroy();
	// 	};
	// }, [canvasRef]);

	return <div
		className={`${className}`}
	>
		<div className="w-full h-full border-round overflow-hidden flex align-items-center justify-content-center bg-gray-900">
			<div className={`relative ${rate ? "w-full" : "w-full h-full"}`} style={rate ? { paddingTop: `${rate}%` } : {}}>

				{/* <canvas id={`videoCanvas-${cam}`} className={`e-player w-full h-full absolute top-0 right-0`}>

				</canvas> */}
				<ReactPlayer
					// className="w-full h-full absolute top-0 left-0"
					//
					playsinline // extremely crucial prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					className="e-player e-object-fit absolute top-0 right-0"
					//
					url={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
					//
					width="100%"
					height="100%"
					onError={(err) => {
						console.log(err, "participant video error");
					}}
				/>
			</div>
		</div>
	</div>
}


const Menu = React.memo(({onMenu}) => {
	console.log("re")
	const itemRenderer = (item, options) => (
		<a className="flex align-items-center px-3 py-2 cursor-pointer" onClick={(e) => {

			onMenu(item.num)
			if (options.onClick) {
				options.onClick(e)
			}
		}}>
			<span className={`${item.icon} text-primary`} />
			<span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
			{item.num && <Badge className="ml-auto" value={item.num} />}
			{item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
		</a>
	);

	const items = [
		{
			label: 'Công ty A (Số 20A đường Hồ Sen - Lê Chân - Hải Phòng)',
			icon: 'pi pi-slack',
			num: 3,
			template: itemRenderer,
			items: [
				{
					label: 'Kho hàng số 1',
					icon: 'pi pi-th-large',
					num: 2,
					template: itemRenderer,
					items: [
						{
							label: 'Cửa kho 1',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						},
						{
							label: 'Kho 1',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						}
					]
				},
				{
					label: 'Kho hàng số 2',
					icon: 'pi pi-image',
					num: 1,
					template: itemRenderer,
					items: [
						{
							label: 'Cửa kho 2',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						}
					]
				}
			]
		},
		{
			label: 'Công ty B (Số 20A đường Hồ Sen - Lê Chân - Hải Phòng)',
			icon: 'pi pi-slack',
			num: 4,
			template: itemRenderer,
			items: [
				{
					label: 'Kho hàng số 1',
					icon: 'pi pi-th-large',
					num: 3,
					template: itemRenderer,
					items: [
						{
							label: 'Cửa kho 1',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						},
						{
							label: 'Kho 1',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						},
						{
							label: 'Kho 1',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						}
					]
				},
				{
					label: 'Kho hàng số 2',
					icon: 'pi pi-image',
					num: 1,
					template: itemRenderer,
					items: [
						{
							label: 'Cửa kho 2',
							icon: 'pi pi-stop-circle',
							num: 1,
							template: itemRenderer,
						}
					]
				}
			]
		},

	];
	return <PanelMenu model={items} className="w-full" multiple ite />
})
