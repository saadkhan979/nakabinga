import React, { useRef } from "react";
import "./fileUploader.css";
import { FaUpload } from "react-icons/fa";

const FileUploader = ({
    label = "Upload File",
    required = false,
    file,
    onChange,
    height = "200px",
    className = "",
    uploadText = "Click to Upload or Drag & Drop File",
    error,
    removeType = "icon", // "icon" | "text"
    removeText = "Remove", // text if removeType="text"
    accept = "*/*", // default accept any file
    showPreview = true, // show preview only for images/videos
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            onChange({ file: selectedFile, previewUrl });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const previewUrl = URL.createObjectURL(droppedFile);
            onChange({ file: droppedFile, previewUrl });
        }
    };

    const handleRemove = () => {
        onChange(null);
        fileInputRef.current.value = null;
    };

    const renderPreview = () => {
        if (!showPreview || !file) return null;

        const fileUrl =
            typeof file === "string" ? file : file.previewUrl || file.url || "";

        if (fileUrl.endsWith(".mp4") || file?.file?.type?.startsWith("video/")) {
            return (
                <video src={fileUrl} controls className="w-100 h-100 rounded object-fit-contain" />
            );
        } else if (fileUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) || file?.file?.type?.startsWith("image/")) {
            return (
                <img src={fileUrl} alt="Preview" className="w-100 h-100 rounded object-fit-contain" />
            );
        } else {
            return (
                <div className="text-secondary mt-3 small">
                    <strong>{file?.file?.name || "File uploaded"}</strong>
                </div>
            );
        }
    };

    return (
        <div className={`file-uploader ${className}`}>
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
                {file ? (
                    <div className="position-relative w-100 h-100">
                        {renderPreview()}
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
                        <p className="cUploadFile">
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
                    accept={accept}
                    className="d-none"
                    onChange={handleFileChange}
                />
            </div>

            {error && <div className="text-danger mt-1 small">{error}</div>}
        </div>
    );
};

export default FileUploader;
