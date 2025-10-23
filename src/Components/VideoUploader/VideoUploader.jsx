import React, { useRef } from "react";
import "./videoUploader.css";
import { FaUpload } from "react-icons/fa";

const VideoUploader = ({
    label = "Upload Video",
    required = false,
    video,
    onChange,
    height = "200px",
    className = "",
    uploadText = "Click to Upload or Drag & Drop Video",
    error,
    removeType = "icon", // "icon" | "text"
    removeText = "Remove", // if removeType="text"
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("video/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleRemove = () => {
        onChange(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className={`video-uploader ${className}`}>
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
                {video ? (
                    <div className="position-relative w-100 h-100">
                        <video
                            src={
                                typeof video === "string"
                                    ? video
                                    : video.previewUrl || video.url
                            }
                            controls
                            className="w-100 h-100 rounded object-fit-contain"
                        />
                        <button
                            type="button"
                            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${removeType === "icon"
                                ? "btn-danger"
                                : "primeryButton btn-dark"
                                }`}
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
                        <p className="cUploadVideo">
                            <span>
                                <FaUpload />
                            </span>
                        </p>
                        <p className="mb-1 fw-bold text-secondary">{uploadText}</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/mov,video/avi,video/webm"
                    className="d-none"
                    onChange={handleFileChange}
                />
            </div>

            {/* 👇 Error Message */}
            {error && <div className="text-danger mt-1 small">{error}</div>}
        </div>
    );
};

export default VideoUploader;
