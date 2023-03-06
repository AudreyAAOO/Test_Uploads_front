import { useState, useEffect } from "react";
import axios from "axios";
// import { Image } from "cloudinary-react";
import "./App.css";

const FormUpload = () => {
	//! STATE
	const [pictures, setPictures] = useState(); // State qui va contenir l'image sélectionnée
	const [preview, setPreview] = useState([]); // State qui va contenir les preview de l'image

	const userToken =
		"YI_645ieZ3z0YuuJu58vEJ3OLwAUMzEyHJbKEpcGnKSnOsynqA7qFoZ_GMg_2LAe";

	const handlePublish = async (event) => {
		event.preventDefault();

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

			setPreview([]); // réinitialiser preview à vide
			setPictures();
			// console.table("preview après requête --> ", preview);
			// console.log("preview[0] après requête --> ", preview[0]);
		} catch (error) {
			console.log("catch err response --> ", error.response);
			console.log("catch err --> ", error);
		}
	};

	const handlePreview = (event) => {
		setPictures(event.target.files);
		for (const item of event.target.files) {
			console.log("item: ", item);
			const array = [...preview];
			array.push(item);
			console.table("array --> ", array);
			setPreview(array);
			console.log("preview --> ", preview);
		}
		// console.log("event.target.files --> ", event.target.files);
		// console.log("event.target.files[0] --> ", event.target.files[0]);
		// console.log("event.target.files[1] --> ", event.target.files[1]);
	};

	useEffect(() => {
		console.log("useEffect ok");
	}, [handlePreview]);

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
					onChange={handlePreview}
				/>

				<div>
					<button className="button" type="submit">
						ENVOYER
					</button>
				</div>

				<div>
					{/* //! afficher une preview des images ------------------------------------ */}
					{/* //! ça fonctionne !!!!! */}
					{/* //! ah ben non  !!!!! */}
					{preview.length > 0 &&
						preview.map((pic, i) => {
							console.log("pic ", pic.name);
							console.log(
								"URL.createObjectURL(pic) : ",
								URL.createObjectURL(pic)
							);
							return (
								<div key={i}>
									<p>{pic.name}</p>
									<img
										src={URL.createObjectURL(pic)}
										alt="pré-visualisation"
										className="preview_img"
									/>
								</div>
							);
						})}
				</div>

				{/* //TODO voir si on peut récup l'url dynamiquement du package cloudinary-react) */}
				{/* <Image 
				cloudName="JohnDoe" 
				publicId="https://urldeimage.png" /> pas dynamique et montre la clé perso  */}
			</form>
		</div>
	);
};

export default FormUpload;
