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
import { MarkerCar } from "../components/Marker";
import DriveService from "../../core/services/DriveService";
import { filter } from 'lodash'
import moment from "moment";
import { Polyline } from "google-maps-react";
import { decode } from "@googlemaps/polyline-codec";

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

export default function Maps({ className, size }) {

	const { t } = useTranslation()

	const [list, setList] = useState([])

	const [route, setRoute] = useState([])

	const [selectCar, setSelectCar] = useState()

	const [activeTab, setActiveTab] = useState(0)

	const refMap = useRef()

	const [data, setData] = useState([
		{
			lat: 20.819443,
			lng: 106.685806,
			info: {
				name: "Nguyễn văn A",
				number: "15H1-33445",
				rotate: 45
			}
		}
	])

	const [lazyPage] = useState({})

	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		loadBKCar()
	}, [])

	const loadBKCar = () => {
		DriveService.dvbk.getCars().then(res => {
			if (res?.length) {
				setList(res)
			}
		})
	}

	const loadBKCarRouter = (num) => {
		setRoute([])
		DriveService.dvbk.getCarRouter(num, moment().startOf("day").format("HH-mm_DD-MM-YYYY"), moment().format("HH-mm_DD-MM-YYYY")).then(res => {
			if (res?.length) {
				setRoute(res)
				const path = res.map(o => ({
					lat: o.Lt,
					lng: o.Ln
				}))
				renderPolyline(path)
			} else {
				setRoute([])
				renderPolyline()
			}
		})
	}

	useEffect(() => {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
		const data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					type: 'bar',
					label: 'Dataset 2',
					backgroundColor: "#ffffff",
					data: [21, 84, 24, 75, 37, 65, 34],
					borderColor: 'white',
					borderWidth: 2
				},
				{
					type: 'bar',
					label: 'Dataset 3',
					backgroundColor: "#646464",
					data: [41, 52, 24, 74, 23, 21, 32]
				}
			]
		};
		const options = {
			maintainAspectRatio: false,
			aspectRatio: 0.6,
			plugins: {
				legend: {
					labels: {
						color: textColor
					}
				}
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary
					},
					grid: {
						color: surfaceBorder
					}
				},
				y: {
					ticks: {
						color: textColorSecondary
					},
					grid: {
						color: surfaceBorder
					}
				}
			}
		};

		setChartData(data);
		setChartOptions(options);
	}, []);

	const renderCol0 = (row) => {
		return <div className="flex align-items-center">
			<Avatar
				label="A"
				shape="circle"
				size='large'
			/>
			<div className="ml-2">
				<div className="text-cyan-500 font-bold mb-1">{row?.DriverName}</div>
				<div className="text-gray-400">{row?.NumberPlate}</div>
			</div>
		</div>
	}

	const renderCol1 = (row) => {
		return <span></span>
	}

	const renderCol2 = (row) => {
		return <ProgressBar value={50} />
	}

	const renderColEnd = (row) => {
		return (
			<div>
				<Button icon="pi pi-eye" rounded text onClick={() => { }} />
				<Button icon="pi pi-pencil" rounded text onClick={() => { }} />
				<Button icon="pi pi-trash" rounded text onClick={() => { }} />
			</div>
		)
	}

	const onCar = (item) => () => {
		setSelectCar(item)
		refMap.current.map.panTo(new refMap.current.maps.LatLng(item.Lt, item.Ln))
		if (refMap.current.polyline) {
			refMap.current.polyline.setMap(null)
			refMap.current.polyline = null
		}
		loadBKCarRouter(item.NumberPlate)
	}

	const renderColU0 = (row) => {
		return <span className="text-cyan-500 cursor-pointer" onClick={onCar(row)}>{row?.NumberPlate}</span>
	}
	const renderColU1 = (row) => {
		return <div>
			{/* <div className="text-cyan-500">
				--:--:--
			</div> */}
			<div className="text-cyan-500">
				{row.Date}
			</div>
		</div>
	}
	const renderColU2 = (row) => {
		return <span className="text-cyan-500">{row?.Speed}km/h</span>
	}
	const renderColU3 = (row) => {
		return <span className="text-cyan-500">{row.Address}</span>
	}

	const tabHeaderTemplate = (label, num) => ({ onClick }) => {
		return <div className="flex flex-column align-items-center gap-2 p-3 cursor-pointer" onClick={onClick}>
			<div className="font-bold white-space-nowrap text-gray-400">{label}</div>
			<div className="font-bold white-space-nowrap text-gray-400">{num}</div>
		</div>
	}

	const renderMarker = (item) => {
		// return <MarkerCar
		// 	// {...item}
		// 	info={item}
		// 	lat={item.Lt}
		// 	lng={item.Ln}
		// 	key={item.DeviceID}
		// />
		return <div className="w-1rem h-1rem bg-blue-600"
			lat={item.Lt}
			lng={item.Ln}
		></div>
	}

	const listStop = useMemo(() => {
		return filter(list, { CarStatus: "Dừng" })
	}, [list])
	const listParking = useMemo(() => {
		return filter(list, { CarStatus: "Đỗ" })
	}, [list])
	const listOnRoad = useMemo(() => {
		return filter(list, { CarStatus: "Di chuyển" })
	}, [list])
	const listFail = useMemo(() => {
		return filter(list, { CarStatus: "Mất tín hiệu" })
	}, [list])

	const onChangeTab = (e) => {
		setActiveTab(e.index)
	}

	const onGoogleApiLoaded = ({ map, maps }) => {
		refMap.current = { map, maps }
	}

	const renderPolyline = (path) => {
		if (refMap.current.polyline) {
			refMap.current.polyline.setMap(null)
			refMap.current.polyline = null
		}
		if (path && path.length) {
			// let decodedPath = decode(path)
			// decodedPath = decodedPath.map(o => ({
			// 	lat: o[0], lng: o[1]
			// }))
			const flightPath = new refMap.current.maps.Polyline({
				path: path,
				geodesic: true,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2,
			})
			flightPath.setMap(refMap.current.map);
			refMap.current.polyline = flightPath
		}
	}

	return <div className="sx-maps sx-layout w-full sx-h-full">
		<div className="sx-layout-center">
			<div className="grid m-0 h-full">
				<div className="col-4 h-full">

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
								<DataTable
									header={() => (
										<TabView
											activeIndex={activeTab}
											onTabChange={onChangeTab}
										>
											<TabPanel headerTemplate={tabHeaderTemplate("Di chuyển", listOnRoad.length)} />
											<TabPanel headerTemplate={tabHeaderTemplate("Dừng", listStop.length)} />
											<TabPanel headerTemplate={tabHeaderTemplate("Đỗ", listParking.length)} />
											<TabPanel headerTemplate={tabHeaderTemplate("Sai tuyến đường", listFail.length)} />
										</TabView>
									)}
									value={activeTab == 0 ? listOnRoad : activeTab == 1 ? listStop : activeTab == 2 ? listParking : listFail}
									dataKey="id"
									className=""
									resizableColumns
									columnResizeMode="expand"
									emptyMessage={"Không có dữ liệu"}
									scrollable
									scrollDirection="both"
									scrollHeight="flex"
									lazy
									// paginator
									// // first={lazyPage?.first ?? 0}
									// rows={lazyPage?.size ?? 20}
									// // totalRecords={lazyPage?.total}
									// rowsPerPageOptions={[20, 25, 50, 100]}
									// onPage={onPage}
									// paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
									// currentPageReportTemplate="{first} - {last} of {totalRecords}"
									reorderableColumns
									reorderableRows
								>
									<Column
										headerClassName="text-gray-400"
										className="py-2"
										showFilterMenu={false}
										showClearButton={false}
										header={"Biển số"}
										style={{ flex: "1 0 180px" }}
										body={renderColU0}
									/>
									<Column

										headerClassName="text-gray-400"
										className="py-2"
										header={"Thời gian"}
										style={{ flex: "1 0 250px" }}
										body={renderColU1}
									/>
									<Column

										headerClassName="text-gray-400"
										className="py-2"
										header={"Tốc độ"}
										style={{ flex: "1 0 250px" }}
										body={renderColU2}
									/>
									<Column

										headerClassName="text-gray-400"
										className="py-2"
										header={"Địa điểm"}
										style={{ flex: "1 0 250px" }}
										body={renderColU3}
									/>
								</DataTable>

							</div>
						</div>

						<div className="sx-layout-bottom mt-2">
							<div className="mb-2">
								<Message severity="warn" text="Biển số xe 15H1-3344 Tài xế Nguyễn Văn A đang di chuyển sai tuyến đường" />
							</div>
							<div className="mb-2">
								<Message severity="error" text="Biển số xe 15H1-3344 Tài xế Nguyễn Văn A đang di chuyển sai tuyến đường " />
							</div>
						</div>
					</div>
				</div>
				<div className="col-8 h-full">
					<div className="sx-height-screen-50">
						<div className="grid h-full">
							<div className="col-12 sx-height-screen-50">
								<GoogleMapReact
									bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_SERVICE }}
									defaultCenter={defaultProps.center}
									defaultZoom={defaultProps.zoom}
									yesIWantToUseGoogleMapApiInternals
									onGoogleApiLoaded={onGoogleApiLoaded}
								>
									{selectCar
										? <MarkerCar
											info={selectCar}
											lat={selectCar.Lt}
											lng={selectCar.Ln}
											key={selectCar.DeviceID}
										/>
										: null
									}
								</GoogleMapReact>
							</div>
						</div>
					</div>
					<div className="sx-height-screen-50">
						<div className="grid h-full">
							<div className="col-4 h-full">
								<div
									className="sx-bg-card p-card p-2 h-full"
								>
									<div className="sx-layout w-full h-full">
										<div className="sx-layout-top">
											<div className="p-card-title text-cyan-500 text-xl">Thống kê quãng đường</div>
										</div>
										<div className="sx-layout-center overflow-scroll">
											{chartData?.datasets
												? <Chart className="w-full h-full" type="line" data={chartData} options={chartOptions} />
												: null
											}
										</div>
										<div className="sx-layout-bottom">
											<div className="grid">
												<div className="col-6">
													<div className="text-gray-400 text-xs">Xe di chuyển</div>
													<div className="text-cyan-500 font-bold">{listOnRoad.length}</div>
												</div>
												<div className="col-6">

													<div className="text-gray-400 text-xs">Xe dừng</div>
													<div className="text-cyan-500 font-bold">{listStop.length}</div>
												</div>
												<div className="col-6">

													<div className="text-gray-400 text-xs">Xe đỗ</div>
													<div className="text-cyan-500 font-bold">{listParking.length}</div>
												</div>
												<div className="col-6">
													<div className="text-cyan-500 font-bold">01</div>
													<div className="text-gray-400 text-xs">{listFail.length}</div>
												</div>
											</div>
										</div>
									</div>



								</div>
							</div>
							<div className="col-8 h-full">
								<div
									className="sx-bg-card p-card p-2 h-full"
								>

									<div className="sx-layout w-full h-full">
										<div className="sx-layout-top">
											<div className="p-card-title text-cyan-500 text-xl">Danh sách tài xế</div>
										</div>
										<div className="sx-layout-center overflow-scroll">
											<DataTable
												value={list}
												dataKey="id"
												className=""
												resizableColumns
												columnResizeMode="expand"
												emptyMessage={"không có dữ liệu"}
												scrollable
												scrollDirection="both"
												scrollHeight="flex"
												lazy
												// paginator
												// // first={lazyPage?.first || 0}
												// rows={lazyPage?.size || 20}
												// // totalRecords={lazyPage?.total}
												// rowsPerPageOptions={[20, 25, 50, 100]}
												// onPage={onPage}
												// paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
												// currentPageReportTemplate="{first} - {last} of {totalRecords}"
												reorderableColumns
												reorderableRows
											>
												<Column
													headerClassName="text-gray-400"
													className="py-1"
													showFilterMenu={false}
													showClearButton={false}
													header={"Tài xế"}
													style={{ flex: "1 0 180px" }}
													body={renderCol0}
												/>
												<Column

													headerClassName="text-gray-400"
													className="py-1"
													header={"Số điện thoại"}
													style={{ flex: "1 0 250px" }}
													body={renderCol1}
												/>
												<Column

													headerClassName="text-gray-400"
													className="py-1"
													header={"Chính xác tuyến đường"}
													style={{ flex: "1 0 250px" }}
													body={renderCol2}
												/>
												<Column

													headerClassName="text-gray-400"
													columnKey="action"
													alignFrozen="right"
													frozen
													header={"Thao tác"}
													style={{ width: 180 }}
													className="col-frozen-table-end flex align-items-center justify-content-center py-1"
													body={renderColEnd}
												/>
											</DataTable>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


					{/* </div> */}
					{/* </div> */}

				</div>

			</div>
		</div>
	</div >
}
