import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./App.css";

const FormUpload = () => {
	//! STATE
	const [pictures, setPictures] = useState(); // State qui va contenir l'image sélectionnée

	const handlePublish = async (event) => {
		event.preventDefault();

		const userToken =
			"YI_645ieZ3z0YuuJu58vEJ3OLwAUMzEyHJbKEpcGnKSnOsynqA7qFoZ_GMg_2LAe";

		const formData = new FormData(); // constructeur FormData

		try {
			//! avec forEAch  // <--- ça fonctionne
			// const copyPictures = pictures ? [...pictures] : [];
			// copyPictures.forEach((file) => {
			// 	formData.append("pictures", file, file.name);
			// 	console.log("formData : ", formData);
			// 	console.log("file.name: ", file.name);
			// });

			//! avec for   // <--- ça fonctionne
			for (let i = 0; i < pictures.length; i++) {
				formData.append("pictures", pictures[i]);
				console.log("formData : ", formData);
			}

			// formData.append("upload_preset", "dqlooqdn");

			const response = await axios.post(
				`http://127.0.0.1:3200/upload`,
				formData,
				{
					headers: {
						Authorization: "Bearer " + userToken,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			alert(JSON.stringify(response.data)); //! ?
			console.log("response axios : ", response);
		} catch (error) {
			console.log("catch err response : ", error.response);
		}
	};

	return (
		<div className="cadreFormPublish">
			<h2 className="titreForm">Uploader plusieurs image</h2>

			<form onSubmit={handlePublish} id="form">
				<label htmlFor="addPhotos" className="addPhoto">
					<h4>+ Ajoute des photos</h4>
				</label>
				<input
					id="addPhotos"
					type="file"
					multiple="multiple"
					onChange={(event) => {
						// console.log(event.target.files[0]);
						console.log("log event.target.files : ", event.target.files); // voir les détails de l'image
						setPictures(event.target.files);
					}}
					// style={{ display: "none" }}
				/>
				<div>
					<button className="button" type="submit">
						ENVOYER
					</button>
				</div>
				{/* //TODO
				//! afficher une preview des images  */}

				{/* <Image 
				cloudName="JohnDoe" 
				publicId="https://urlimage.png" /> pas dynamique et montre la clé perso  */} 

				<div>
					{/* {pictures && (
						<img
							className="preview_img"
							src={URL.createObjectURL(pictures)}
							alt="preview"
						/>
					)} */}
				</div>
			</form>
		</div>
	);
};

export default FormUpload;
