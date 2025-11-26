import React, { useState, useRef } from "react";
import { FaCamera, FaUser } from "react-icons/fa";

const ProfilePhotoUpload = ({ currentPhoto, onPhotoChange }) => {
  const [preview, setPreview] = useState(currentPhoto || "");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4a5568] shadow-lg bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-white text-4xl" />
          )}
        </div>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors border-4 border-white group-hover:scale-110 transform duration-200"
        >
          <FaCamera className="text-white text-sm" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-gray-500 text-center">
        Click the camera icon to upload a photo
        <br />
        (Max 5MB, JPG/PNG)
      </p>
    </div>
  );
};

export default ProfilePhotoUpload;
