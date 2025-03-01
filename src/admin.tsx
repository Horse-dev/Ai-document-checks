import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AdminDashboard from "./components/AdminDashboard";
import DocumentTypeManager from "./components/DocumentTypeManager";
import TrainingDocumentUploader from "./components/TrainingDocumentUploader";
import ClassificationResults from "./components/ClassificationResults";

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

// Initialize admin components
document.addEventListener("DOMContentLoaded", () => {
  // Admin Dashboard
  const adminDashboardContainer = document.getElementById(
    "docclass-admin-dashboard",
  );
  if (adminDashboardContainer) {
    ReactDOM.render(<AdminDashboard />, adminDashboardContainer);
  }

  // Document Types
  const documentTypesContainer = document.getElementById(
    "docclass-document-types",
  );
  if (documentTypesContainer) {
    ReactDOM.render(<DocumentTypeManager />, documentTypesContainer);
  }

  // Training Documents
  const trainingDocumentsContainer = document.getElementById(
    "docclass-training-documents",
  );
  if (trainingDocumentsContainer) {
    ReactDOM.render(<TrainingDocumentUploader />, trainingDocumentsContainer);
  }

  // Classification Results
  const resultsContainer = document.getElementById("docclass-results");
  if (resultsContainer) {
    ReactDOM.render(<ClassificationResults />, resultsContainer);
  }
});
