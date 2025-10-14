import React, { useRef } from "react";
import "./imageUploader.css"
import { FaCamera, FaUpload } from "react-icons/fa";


const ImageUploader = ({
    label = "Upload Image",
    required = false,
    image,
    onChange,
    height = "180px",
    className = "",
    uploadImage,
    error,
    removeType = "icon",   // 👈 new prop ("icon" | "text")
    removeText = "", // 👈 if text mode, what to show

}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleRemove = () => {
        onChange(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className={`image-uploader ${className}`}>
            {label && (
                <label>
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}
            <div
                className="upload-box border rounded d-flex flex-column align-items-center justify-content-center text-center"
                style={{ height, cursor: "pointer", position: "relative" }}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {image ? (
                    <div className="position-relative w-100 h-100">
                        <img
                            src={
                                typeof image === "string"
                                    ? image
                                    : image.previewUrl || image.url // ✅ show from fetched data or newly uploaded
                            }
                            alt="preview"
                            className="w-100 h-100 rounded object-fit-contain"
                        />
                        <button
                            type="button"
                            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${removeType === "icon" ? "btn-danger" : "primeryButton btn-dark"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                        >
                            {removeType === "icon" ? "✕" : removeText}
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="cUploadimage"><span><FaUpload /></span> {uploadImage}</p>
                        <p className="mb-1 fw-bold mb-1 text-secondary">Or</p>
                        <p className="mb-1 fw-bold mb-1 text-secondary">Drag & Drop Image</p>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/webp,image/gif"
                    className="d-none"
                    onChange={handleFileChange}
                />
            </div>

            {/* 👇 Error Message */}
            {error && <div className="text-danger mt-1 small">{error}</div>}
        </div>
    );
};

export default ImageUploader;
