import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Progress } from "../components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface ClassificationResultProps {
  documentName?: string;
  documentType?: string;
  confidence?: number;
  status?: "success" | "pending" | "failed";
  extractedFields?: Array<{ name: string; value: string }>;
  errorMessage?: string;
}

const ClassificationResult = ({
  documentName = "sample-document.pdf",
  documentType = "Birth Certificate",
  confidence = 85,
  status = "success",
  extractedFields = [
    { name: "Full Name", value: "John Doe" },
    { name: "Date of Birth", value: "01/15/1985" },
    { name: "Document ID", value: "BC-12345678" },
  ],
  errorMessage = "Unable to classify document. Please select document type manually.",
}: ClassificationResultProps) => {
  return (
    <Card className="w-full max-w-[600px] bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="truncate max-w-[300px]">{documentName}</span>
          </CardTitle>
          {status === "success" && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              Classified
            </Badge>
          )}
          {status === "pending" && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              Processing
            </Badge>
          )}
          {status === "failed" && (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
              Failed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {status === "pending" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Analyzing document...</p>
            <Progress value={45} className="h-2" />
          </div>
        )}

        {status === "failed" && (
          <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Document Type</p>
                <p className="font-medium">{documentType}</p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">
                        {confidence}% match
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Confidence level of document classification
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Extracted Information
              </p>
              <div className="space-y-2">
                {extractedFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-50 p-2 rounded-md"
                  >
                    <span className="text-sm text-gray-600">{field.name}:</span>
                    <span className="text-sm font-medium">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassificationResult;
