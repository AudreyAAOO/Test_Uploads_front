import { useState } from "react";
import axios from "axios";
// import { Image } from "cloudinary-react";
import "./App.css";

const FormUpload = () => {
	//! STATE
	const [pictures, setPictures] = useState(); // State qui va contenir l'image sélectionnée
	const [preview, setPreview] = useState([]); // State qui va contenir les preview de l'image
	// const array = [];

	const handlePublish = async (event) => {
		event.preventDefault();

		const userToken =
			"YI_645ieZ3z0YuuJu58vEJ3OLwAUMzEyHJbKEpcGnKSnOsynqA7qFoZ_GMg_2LAe";

		const formData = new FormData(); // constructeur FormData

		try {
			//! avec forEach  // <--- ça fonctionne
			// const copyPictures = pictures ? [...pictures] : [];
			// copyPictures.forEach((file) => {
			// 	formData.append("pictures", file, file.name);
			// 	console.log("formData : ", formData);
			// 	console.log("file.name: ", file.name);
			// });

			//! avec for   // <--- ça fonctionne
			for (let i = 0; i < pictures.length; i++) {
				formData.append("pictures", pictures[i]);
				// formData.append("upload_preset", "dqlooqdn");
				console.log("formData --> ", formData);
			}

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
			alert(JSON.stringify("requête effectuée --> ", response.data));

			console.log("pictures --> ", pictures);
			console.log("réponse axios --> ", response.data);

			setPreview([]);

			console.table("preview après requête --> ", preview);
			console.log("preview[0] après requête --> ", preview[0]);
		} catch (error) {
			console.log("catch err response --> ", error.response);
			console.log("catch err --> ", error);
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
						setPictures(event.target.files);
						// setPreview(URL.createObjectURL(event.target.files[0]));
						for (const item of event.target.files) {
							console.log("item: ", item);
							// setPreview(array.push(URL.createObjectURL(item))
							// array.push(item)
							const array = [];
							setPreview(array.push(URL.createObjectURL(item)));
							console.log("preview --> ", preview);
							console.table("array --> ", array);
							console.log("array[0] --> ", array[0]);
						}
						console.log("event.target.files --> ", event.target.files);
						console.log("event.target.files[0] --> ", event.target.files[0]);
						console.log("event.target.files[1] --> ", event.target.files[1]);
					}}
				/>
				<div>
					<button className="button" type="submit">
						ENVOYER
					</button>
				</div>
				{/* //TODO
				//! afficher une preview des images */}
				<div>
					{/* {preview && 
					preview.map((pic, i) => {
						console.log("pic ", pic);
						// console.log("URL.createObjectURL(pic) : ", URL.createObjectURL(pic));
						return (<img
								key={i}
								// src={URL.createObjectURL(pic[i])}
								src={pic}
								alt="pré-visualisation"
								className="preview_img"
							/>);})} */}
				</div>
				<div>
					{preview > 1 && (
						<img className="preview_img" src={preview} alt="preview_img" />
					)}
				</div>

				{/* //TODO voir si on peur récup l'url dynamiquement */}
				{/* <Image 
				cloudName="JohnDoe" 
				publicId="https://urldeimage.png" /> pas dynamique et montre la clé perso  */}
			</form>
		</div>
	);
};

export default FormUpload;
