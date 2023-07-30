import React from "react";

const ImagePreview = ({ imageUrl }) => (
  <div className="image-preview">
    {imageUrl && (
      <img
        src={imageUrl}
        style={{
          paddingTop: "5px",
          maxWidth: "700px",
          maxHeight: "700px",
        }}
        alt="Preview"
        loading="lazy"
      />
    )}
  </div>
);

export default ImagePreview;
