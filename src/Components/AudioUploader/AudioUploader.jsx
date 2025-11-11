import React, { useRef } from "react";
import "./audioUploader.css";
import { FaUpload } from "react-icons/fa";

const AudioUploader = ({
    label = "Upload Audio",
    required = false,
    audio,
    onChange,
    height = "120px",
    className = "",
    uploadText,
    error,
    removeType = "icon", // "icon" | "text"
    removeText = "Remove", // if removeType="text"
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("audio/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("audio/")) {
            const previewUrl = URL.createObjectURL(file);
            onChange({ file, previewUrl });
        }
    };

    const handleRemove = () => {
        onChange(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className={`audio-uploader ${className}`}>
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
                {audio ? (
                    <div className="position-relative w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <audio
                            src={
                                typeof audio === "string"
                                    ? audio
                                    : audio.previewUrl || audio.url
                            }
                            controls
                            className="w-100 rounded"
                        />
                        <button
                            type="button"
                            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${removeType === "icon" ? "btn-danger" : "primeryButton btn-dark"
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
                        <p className="cUploadAudio">
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
                    accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg"
                    className="d-none"
                    onChange={handleFileChange}
                />
            </div>

            {/* 👇 Error Message */}
            {error && <div className="text-danger mt-1 small">{error}</div>}
        </div>
    );
};

export default AudioUploader;
