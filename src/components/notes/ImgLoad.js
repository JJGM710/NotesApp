import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const ImgLoad = ({ url }) => {
	const [loading, setLoading] = useState(false);
	const handleOnload = () => {
		setLoading(true);
	};

	return (
		<>
			{loading === false && (
				<div>
					<Spinner animation="grow" />
					<Spinner animation="grow" />
					<Spinner animation="grow" />
				</div>
			)}
			<div className="animate__animated animate__fadeIn ">
				<img
					src={url}
					alt="Imagen"
					className="notes__image "
					onLoad={handleOnload}
					style={{ display: loading ? 'block' : 'none' }}
				/>
			</div>
		</>
	);
};
