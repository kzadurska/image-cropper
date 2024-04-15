import "react-advanced-cropper/dist/style.css";

import { useRef, useState } from "react";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";

const IMAGE_URLS = [
	"https://images.unsplash.com/photo-1695576514502-cbc0a333f2d9?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1712785021787-72b6d6c837e8?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1565769583756-fe3ffffcae49?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1712257156266-81682d7cb58c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1712256951971-ab2b5916ddb0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1593872423141-bb230bd352c6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const CropImage = ({ predefinedSize }: { predefinedSize: string }) => {
	const cropperRef = useRef<FixedCropperRef>(null);
	const pseudoRandomImageIndex = getRandomInt(0, 5);

	// TODO: https://unsplash.com/developers get image from api
	// TODO: add option to upload image
	// generate background like canvas gradient
	const [image] = useState(IMAGE_URLS[pseudoRandomImageIndex]);

	const getDimensionsFromSize = (): { width: number; height: number } => {
		const [width, height] = predefinedSize.split("x");

		return { width: parseInt(width, 10), height: parseInt(height, 10) };
	};

	const onDownload = () => {
		if (cropperRef.current) {
			const linkElement = document.createElement("a");
			linkElement.download = `${predefinedSize}.png`;
			linkElement.href = cropperRef.current.getCanvas(getDimensionsFromSize())?.toDataURL() ?? "";
			linkElement.click();
		}
	};

	const onOpenInTab = () => {
		if (cropperRef.current) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${
					cropperRef.current.getCanvas(getDimensionsFromSize())?.toDataURL() ?? ""
				}"/>`;
			}
		}
	};

	return (
		<>
			<button onClick={onDownload}>download cropped</button>
			<button onClick={onOpenInTab}>open in new tab</button>
			<FixedCropper
				transformImage={{ adjustStencil: false }}
				src={image}
				ref={cropperRef}
				stencilProps={{
					handlers: false,
					lines: true,
					movable: true,
					resizable: false,
				}}
				stencilSize={getDimensionsFromSize()}
			/>
		</>
	);
};

function getRandomInt(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);

	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
