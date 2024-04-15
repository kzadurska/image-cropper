import "react-advanced-cropper/dist/style.css";

import { useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";

export const CropImage = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [image, setImage] = useState(
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

	return (
		<>
			<button onClick={onDownload}>download cropped</button>
			<button onClick={onOpenInTab}>open in new tab</button>
			<Cropper src={image} className={"cropper"} ref={cropperRef} />;
		</>
	);
};
