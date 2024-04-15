import "react-advanced-cropper/dist/style.css";

import { useRef, useState } from "react";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";

export const CropImage = ({ predefinedSize }: { predefinedSize: string }) => {
	const cropperRef = useRef<FixedCropperRef>(null);

	// TODO: https://unsplash.com/developers get image from api
	// TODO: add option to upload image
	// generate background
	const [image] = useState(
		"https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
	);

	const onDownload = () => {
		if (cropperRef.current) {
			const linkElement = document.createElement("a");
			linkElement.download = "image.png";
			linkElement.href = cropperRef.current.getCanvas()?.toDataURL() ?? "";
			linkElement.click();
		}
	};

	const onOpenInTab = () => {
		if (cropperRef.current) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${
					cropperRef.current.getCanvas()?.toDataURL() ?? ""
				}"/>`;
			}
		}
	};

	const getDimensionsFromSize = (): { width: number; height: number } => {
		const [width, height] = predefinedSize.split("x");

		return { width: parseInt(width, 10), height: parseInt(height, 10) };
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
