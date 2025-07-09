import React, { useRef, useEffect } from "react";

const DocumentViewer = ({ pdfUrl }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      // Attempt to disable right-click within the iframe content
      // This is not foolproof and depends on the iframe's content origin policy
      try {
        iframe.contentWindow.addEventListener("contextmenu", handleRightClick);
      } catch (e) {
        console.warn("Could not add right-click listener to iframe.", e);
      }
    }

    return () => {
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.removeEventListener(
            "contextmenu",
            handleRightClick
          );
        } catch (e) {
          console.warn("Could not remove right-click listener from iframe.", e);
        }
      }
    };
  }, [pdfUrl]); // Re-run effect if pdfUrl changes

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        ref={iframeRef}
        src={pdfUrl}
        title="Document Viewer"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default DocumentViewer;
