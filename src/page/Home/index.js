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
import Weather from "../Weather";
import images from "../../utils/images";
import { Image } from 'primereact/image'
import Maps from "../Maps";
import Camera from "../Camera";

export default function Home({ className }) {

	const { p } = useParams()

	const { t } = useTranslation()

	const [screenResize] = useState(SCREEN_RESIZE[SCREEN_SIZE.big])

	const [isShowRight, setIsShowRight] = useState(false);

	const [screen, setScreen] = useState([SCREEN.WEATHER, SCREEN.MAP, SCREEN.CAMERA]);

	const [screenShare, setScreenShare] = useState();

	const [meetingId, setMeetingId] = useState(p);

	const onIsShowRight = () => {
		setIsShowRight(!isShowRight)
	}

	const printScreen = useMemo(() => {
		if (screen.length) {
			const scx = screenResize[screen.length]
			let index = -1
			scx.map(o => {

				if (o.childs) {
					o.childs = o.childs.map(x => {
						index++
						x.id = screen[index]
						return x
					})
				} else {
					index++
					o.id = screen[index]
				}
				return o
			})
			return scx
		}
		return []
	}, [screen, screenResize])

	const onShare = (id) => () => {
		setScreenShare(!!screenShare ? null : id)
	}

	const renderScreen = (item, index) => {

		if (item.childs) {
			return <div className={`e-player-wrapper-frame ${item.className}`} key={index}>
				<div className="flex flex-wrap w-full h-full">
					{item.childs.map(renderScreen)}
				</div>
			</div>
		}
		return <div className={`${item.id == screenShare ? "w-full h-full" : item.className} ${classNames({ "e-player-wrapper border-round": true, "hidden": screenShare && item.id != screenShare })} ${item.id == screenShare ? "e-player-wrapper-hide" : "relative"}`} key={`${item.id} - ${index}`}>
			<div className={`w-full h-full ${!!screenShare && item.id == screenShare || false ? "relative" : "relative"}`}>
				{renderCom(item.id)}
				<div className="absolute bottom-0 right-0 p-1">
					<Button
						text
						rounded
						icon={classNames({ "pi": true, "pi-window-maximize": item.id != screenShare, "pi-window-minimize": item.id == screenShare })}
						onClick={onShare(item?.id)}
					/>
				</div>
			</div>

		</div>
	}

	const renderCom = (id) => {
		switch (id) {
			case SCREEN.WEATHER:
				return <Weather
					size={screenShare}
				/>
			case SCREEN.MAP:
				return <Maps
					size={screenShare}
				/>
			case SCREEN.CAMERA:
				return <Camera
					size={screenShare}
				/>

			default:
				return null
			// return <Image
			// 	src={images.demo}
			// />
		}
	}
	console.log(printScreen)

	return <div className="e-meet w-full sx-h-full">
		<div className="flex w-full h-full relative">
			<div className={classNames({ "e-meet-left flex-1 h-full": true, "e-meet-chat-active": !!isShowRight })}>
				<div className="flex flex-wrap w-full h-full relative">
					{/* <div className={`e-player-wrapper p-2 ${userClass} border-1`}>
						{screenShare && <div className="relative w-full h-full border-round overflow-hidden">

						</div>
						}
					</div> */}
					{/* <div className={classNames({ "flex flex-wrap w-full": true, "md:w-3 sm:overflow-x-scroll md:overflow-y-scroll md:h-full": !!screenShare })}>
						<div className={`e-player-wrapper p-2 ${userClass} border-1`}>
							<div className="relative w-full h-full border-round overflow-hidden">


							</div>
						</div>
					</div> */}
					{printScreen.map(renderScreen)}

				</div>
				{/* <SpeedDial model={items} direction="right" style={{ top: 'calc(50% - 2rem)', left: 0 }} /> */}
				<div className="absolute bottom-0 left-0 p-1">
					<Button
						text
						rounded
						icon="pi pi-external-link"
						onClick={onIsShowRight}
					/>
				</div>

			</div>
			<div className={classNames({ "e-meet-chat-wapper absolute overflow-hidden": true, "e-meet-chat-active": !!isShowRight })}>
				<div className="e-meet-chat h-full border-round">
					<div className="sx-layout">
						<div className="sx-layout-top px-3 py-1 border-bottom-1 border-gray-600">
							<div className="flex align-items-center justify-content-between">
								<span className="event-color-white">{isShowRight ? t("meeting.chat") : null}</span>
								<Button
									text
									icon="pi pi-times event-color-white"
									rounded
									onClick={onIsShowRight}
								/>
							</div>
						</div>


						<div className="px-3">
							<div>

							</div>
						</div>


					</div>
				</div>
			</div>
		</div>
	</div>
}
