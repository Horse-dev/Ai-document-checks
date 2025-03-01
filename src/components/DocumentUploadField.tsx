import React, { useState, useRef } from "react";
import {
  Upload,
  FileIcon,
  AlertCircle,
  Check,
  X,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DocumentUploadFieldProps {
  onUpload?: (file: File) => void;
  onClassify?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  isProcessing?: boolean;
  error?: string | null;
}

const DocumentUploadField = ({
  onUpload = () => {},
  onClassify = () => {},
  acceptedFileTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
  maxFileSize = 10, // 10MB default
  isProcessing = false,
  error = null,
}: DocumentUploadFieldProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the file
  const handleFile = (file: File) => {
    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      setUploadStatus("error");
      return;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setUploadStatus("error");
      return;
    }

    setFile(file);
    setUploadStatus("uploading");

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus("success");
        onUpload(file);
        onClassify(file);
      }
    }, 100);
  };

  // Trigger file input click
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset the upload
  const handleReset = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full max-w-[600px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Document Upload</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Upload your document for automatic classification
          </p>

          {uploadStatus === "idle" && (
            <div
              className={`w-full h-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-gray-300"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleChange}
                accept={acceptedFileTypes.join(",")}
              />

              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center mb-2">
                Drag & drop your document here, or
              </p>
              <Button
                onClick={onButtonClick}
                variant="outline"
                className="mt-2"
              >
                Browse Files
              </Button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Accepted file types: {acceptedFileTypes.join(", ")}
                <br />
                Maximum file size: {maxFileSize}MB
              </p>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="w-full">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium truncate flex-1">
                  {file?.name}
                </span>
                <span className="text-xs text-gray-500">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 mb-4" />
              <p className="text-sm text-center text-gray-500">
                Uploading document...
              </p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium truncate flex-1">
                  {file?.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleReset}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {isProcessing ? (
                <div className="text-center py-2">
                  <p className="text-sm text-gray-600">
                    Processing document...
                  </p>
                  <Progress value={undefined} className="h-2 mt-2" />
                </div>
              ) : (
                <Alert
                  variant="success"
                  className="bg-green-50 border-green-200"
                >
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>Upload Complete</AlertTitle>
                  <AlertDescription>
                    Your document has been uploaded successfully and is being
                    classified.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {uploadStatus === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Upload Failed</AlertTitle>
              <AlertDescription>
                {error ||
                  `Please check that your file is under ${maxFileSize}MB and is one of the accepted file types.`}
              </AlertDescription>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Try Again
              </Button>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadField;
