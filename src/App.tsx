import "react-advanced-cropper/dist/style.css";

import { useState } from "react";

import { CropImage } from "./sections/crop-image/CropImage";

const PREDEFINED_CROP_SIZES = [
	"400x400",
	"932x125",
	"1080x288",
	"1600x350",
	"1536x500",
	" 1280x720",
];

export function App() {
	const [predefinedSize, setPredefinedSize] = useState(PREDEFINED_CROP_SIZES[0]);
	// TODO allow any dimensions user chooses

	const selectSize = (event) => setPredefinedSize(event.target.value);

	return (
		<div className="App">
			<select onChange={selectSize}>
				{PREDEFINED_CROP_SIZES.map((size) => (
					<option key={size}>{size}</option>
				))}
			</select>
			<CropImage predefinedSize={predefinedSize} />
		</div>
	);
}
