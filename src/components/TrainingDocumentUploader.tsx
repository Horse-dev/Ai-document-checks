import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Upload,
  X,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";

interface TrainingDocument {
  id: string;
  name: string;
  type: string;
  keywords: string[];
  status: "processing" | "complete" | "error";
  progress: number;
}

interface TrainingDocumentUploaderProps {
  documentTypes?: string[];
  onUpload?: (document: File, type: string, keywords: string[]) => void;
  onRemove?: (documentId: string) => void;
  documents?: TrainingDocument[];
}

const TrainingDocumentUploader = ({
  documentTypes = [
    "Birth Certificate",
    "Driver License",
    "Passport",
    "Tax Form",
    "Medical Record",
  ],
  onUpload = () => {},
  onRemove = () => {},
  documents = [
    {
      id: "1",
      name: "birth-certificate-sample.pdf",
      type: "Birth Certificate",
      keywords: ["birth", "certificate", "date of birth", "name"],
      status: "complete",
      progress: 100,
    },
    {
      id: "2",
      name: "drivers-license-example.pdf",
      type: "Driver License",
      keywords: ["license", "driver", "expiration", "id number"],
      status: "complete",
      progress: 100,
    },
    {
      id: "3",
      name: "passport-sample.pdf",
      type: "Passport",
      keywords: ["passport", "nationality", "expiration", "number"],
      status: "processing",
      progress: 65,
    },
  ],
}: TrainingDocumentUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile && selectedType && keywords.trim()) {
      onUpload(
        selectedFile,
        selectedType,
        keywords.split(",").map((k) => k.trim()),
      );
      setSelectedFile(null);
      setSelectedType("");
      setKeywords("");
    }
  };

  const handleRemoveDocument = (id: string) => {
    onRemove(id);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Training Document Uploader</CardTitle>
          <CardDescription>
            Upload training documents and associate them with document types and
            keywords to improve classification accuracy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Upload New Training Document
              </h3>

              <div
                className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium mb-1">
                  {selectedFile
                    ? selectedFile.name
                    : "Drag and drop or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Supports PDF, DOC, DOCX, JPG, PNG (max 10MB)
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Enter keywords that identify this document type..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleUpload}
                  disabled={!selectedFile || !selectedType || !keywords.trim()}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Training Document
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Training Documents</h3>
              <ScrollArea className="h-[400px] border rounded-md p-4">
                {documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="border rounded-md p-3 bg-white"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <Badge variant="outline" className="mt-1">
                                {doc.type}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveDocument(doc.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {doc.status === "processing" && (
                          <div className="mt-2">
                            <Progress value={doc.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              Processing: {doc.progress}%
                            </p>
                          </div>
                        )}

                        {doc.status === "complete" && (
                          <div className="mt-2 flex items-center text-green-600 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" /> Processing
                            complete
                          </div>
                        )}

                        {doc.status === "error" && (
                          <div className="mt-2 flex items-center text-red-600 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" /> Error
                            processing document
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">
                            Keywords:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {doc.keywords.map((keyword, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <FileText className="h-10 w-10 mb-2" />
                    <p>No training documents uploaded yet</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-gray-500">
            {documents.length} training documents uploaded
          </p>
          <Button variant="outline">Export Training Data</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TrainingDocumentUploader;
