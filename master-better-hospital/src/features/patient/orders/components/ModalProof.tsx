import React from "react";

interface ModalProofProps {
	imageUrl: string;
	onClose: () => void;
}

export default function ModalProof({ imageUrl, onClose }: ModalProofProps) {
	return (
		<div
			id="Preview-Modal"
			className="modal z-50 flex flex-1 items-center justify-center h-full fixed top w-full"
		>
			<button
				type="button"
				className="backdrop absolute w-full h-full bg-[#292D32B2]"
				onClick={onClose}
			/>
			<div className="relative flex flex-col w-full max-w-[640px] sm:max-w-[100%] h-fit m-auto items-center justify-center gap-8 px-5">
				<div className="flex w-full items-center justify-center">
					<div className="rounded-2xl overflow-hidden size-auto">
						<img
							src={imageUrl}
							className="w-full h-full object-contain max-h-[80vh]"
							alt="img"
						/>
					</div>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="flex items-center w-fit h-12 rounded-full border border-white/10 bg-white/10 py-3 px-4 gap-2"
				>
					<img
						src="/assets/images/icons/close-circle-white.svg"
						className="flex size-6 shrink-0"
						alt="icon"
					/>
					<p className="font-medium text-white">Close Preview</p>
				</button>
			</div>
		</div>
	);
}
