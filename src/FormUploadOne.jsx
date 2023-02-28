import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

const FormUploadOne = () => {
	//! STATE
	const [oneImg, setOneImg] = useState(); // State qui va contenir l'image sélectionnée

	const handleOneImg = async (event) => {
		event.preventDefault();

		const userToken =
			"YI_645ieZ3z0YuuJu58vEJ3OLwAUMzEyHJbKEpcGnKSnOsynqA7qFoZ_GMg_2LAe";

		const formData = new FormData(); // constructeur FormData
        formData.append("pictures", oneImg);
		try {
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

			console.log("response axios : ", response);
		} catch (error) {
			console.log("catch err response : ", error.response);
		}
	};

	return (
		<div className="cadreFormPublish">
			<h2 className="titreForm">Uploader une image</h2>
			<form onSubmit={handleOneImg} id="form">
				<label htmlFor="addPhoto" className="addPhoto">
					<h4>+ Ajoute une photo</h4>
				</label>
				<input
					id="addPhoto"
					type="file"
					onChange={(event) => {
						console.log(event.target.files[0]);
						setOneImg(event.target.files);
					}}
				/>
				<div>
					<button className="button" type="submit">
						ENVOYER
					</button>
				</div>
				{/* //TODO
                //! afficher une preview de l'image  */}
			</form>
		</div>
	);
};

export default FormUploadOne;
