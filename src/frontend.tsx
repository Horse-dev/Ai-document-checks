import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DocumentUploadField from "./components/DocumentUploadField";
import ClassificationResult from "./components/ClassificationResult";

// Load WordPress dependencies
declare global {
  interface Window {
    docClassData: {
      ajax_url: string;
      nonce: string;
      plugin_url: string;
    };
  }
}

// Initialize frontend components
document.addEventListener("DOMContentLoaded", () => {
  // Find all document upload fields on the page
  const uploadFields = document.querySelectorAll(".docclass-document-upload");

  uploadFields.forEach((field) => {
    const acceptedTypes = JSON.parse(
      field.getAttribute("data-accepted-types") || "[]",
    );
    const maxSize = parseInt(field.getAttribute("data-max-size") || "10", 10);

    ReactDOM.render(
      <DocumentUploadField
        acceptedFileTypes={acceptedTypes}
        maxFileSize={maxSize}
        onUpload={(file) => {
          // Handle file upload via AJAX
          const formData = new FormData();
          formData.append("action", "docclass_classify_document");
          formData.append("nonce", window.docClassData.nonce);
          formData.append("document", file);

          fetch(window.docClassData.ajax_url, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                // Show classification result
                const resultContainer = document.createElement("div");
                resultContainer.className = "docclass-classification-result";
                field.parentNode?.insertBefore(
                  resultContainer,
                  field.nextSibling,
                );

                ReactDOM.render(
                  <ClassificationResult
                    documentName={data.result.document_name}
                    documentType={data.result.document_type}
                    confidence={data.result.confidence}
                    status="success"
                    extractedFields={data.result.extracted_fields}
                  />,
                  resultContainer,
                );
              } else {
                console.error("Classification failed:", data.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      />,
      field,
    );
  });
});
