import "react-advanced-cropper/dist/style.css";

import { useRef, useState } from "react";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";

const NASA_API_IMAGE_URL =
	"https://api.nasa.gov/planetary/apod?api_key=sNDfW8rGIEdGUK8e5aX5VdbGM2RGN2DOM1JEISLn&count=1";

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

	// TODO: https://unsplash.com/devsizepers get image from api
	// TODO: add option to upload image
	// generate background like canvas gradient
	const [image, setImage] = useState(IMAGE_URLS[pseudoRandomImageIndex]);
	const [fileSize, setFileSize] = useState(0);

	const getDimensionsFromSize = (): { width: number; height: number } => {
		const [width, height] = predefinedSize.split("x");

		return { width: parseInt(width, 10), height: parseInt(height, 10) };
	};

	const getImageUrl = () =>
		cropperRef.current?.getCanvas(getDimensionsFromSize())?.toDataURL() ?? "";

	const onDownload = () => {
		if (cropperRef.current) {
			const linkElement = document.createElement("a");
			linkElement.download = `${predefinedSize}.png`;
			linkElement.href = getImageUrl();
			linkElement.click();
		}
	};

	const onOpenInTab = () => {
		if (cropperRef.current) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${getImageUrl()}"/>`;
			}
		}
	};

	const handleInteractionEnd = () => {
		try {
			getByteLength(getImageUrl())
				.then((size) => setFileSize(size))
				.catch((error) => console.error("Error getting byte length:", error));
		} catch (error) {
			console.error("Error getting byte length:", error);
		}
	};

	// useEffect(() => {
	// 	fetchNasaImage()
	// 		.then((url) => setImage(url))
	// 		.catch((error) => console.error("Error fetching data:", error));
	// }, []);

	return (
		<>
			<button onClick={onDownload}>download cropped</button>
			<button onClick={onOpenInTab}>open in new tab</button>
			<p>size {Math.round(fileSize / 1024)} kB</p>
			<FixedCropper
				onInteractionEnd={handleInteractionEnd}
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

async function getByteLength(url: string | URL) {
	let fileSize = 0;

	try {
		const response = await fetch(url);
		const blob = await response.blob();
		fileSize = blob.size;
	} catch (error) {
		console.error(error);
	}

	return fileSize;
}

async function fetchNasaImage(): Promise<string> {
	try {
		const response = await fetch(NASA_API_IMAGE_URL);
		const data = await response.json();
		const imageUrl = data[0].url;
		console.log(imageUrl);

		return imageUrl as string;
	} catch (error) {
		console.error("Error fetching NASA image:", error);
	}

	return "";
}
