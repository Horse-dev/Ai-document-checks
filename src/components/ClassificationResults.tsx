import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  PieChart,
  BarChart2,
  RefreshCw,
  FileWarning,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ClassificationResultsProps {
  statistics?: {
    totalDocuments: number;
    correctlyClassified: number;
    misclassified: number;
    unclassified: number;
    accuracy: number;
  };
  misclassifiedDocuments?: Array<{
    id: string;
    filename: string;
    uploadDate: string;
    predictedType: string;
    actualType: string;
    confidence: number;
  }>;
}

const ClassificationResults = ({
  statistics = {
    totalDocuments: 1250,
    correctlyClassified: 1125,
    misclassified: 75,
    unclassified: 50,
    accuracy: 90,
  },
  misclassifiedDocuments = [
    {
      id: "1",
      filename: "birth_certificate_john_doe.pdf",
      uploadDate: "2023-06-15",
      predictedType: "Medical Record",
      actualType: "Birth Certificate",
      confidence: 65,
    },
    {
      id: "2",
      filename: "drivers_license_jane_smith.pdf",
      uploadDate: "2023-06-16",
      predictedType: "Passport",
      actualType: "Driver's License",
      confidence: 72,
    },
    {
      id: "3",
      filename: "tax_return_2022.pdf",
      uploadDate: "2023-06-17",
      predictedType: "Invoice",
      actualType: "Tax Return",
      confidence: 58,
    },
    {
      id: "4",
      filename: "medical_report_annual.pdf",
      uploadDate: "2023-06-18",
      predictedType: "Insurance Claim",
      actualType: "Medical Report",
      confidence: 67,
    },
    {
      id: "5",
      filename: "property_deed.pdf",
      uploadDate: "2023-06-19",
      predictedType: "Contract",
      actualType: "Property Deed",
      confidence: 61,
    },
  ],
}: ClassificationResultsProps) => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [isRetrainingDialogOpen, setIsRetrainingDialogOpen] = useState(false);

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Classification Results</h1>
        <Button
          onClick={() => setIsRetrainingDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retrain System
        </Button>
      </div>

      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger
            value="misclassified"
            className="flex items-center gap-2"
          >
            <FileWarning className="h-4 w-4" />
            Misclassified Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statistics.totalDocuments}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Correctly Classified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {statistics.correctlyClassified}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Misclassified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {statistics.misclassified}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Unclassified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {statistics.unclassified}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Classification Accuracy</CardTitle>
              <CardDescription>Overall system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {statistics.accuracy}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {statistics.correctlyClassified} of{" "}
                    {statistics.totalDocuments} documents
                  </span>
                </div>
                <Progress value={statistics.accuracy} className="h-2" />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Classification Breakdown
                </h3>
                <div className="h-64 flex items-end justify-around border-b border-l">
                  {/* Placeholder for chart - in a real implementation, use a charting library */}
                  <div className="w-16 bg-green-500 h-[60%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Birth Certificates
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      95%
                    </div>
                  </div>
                  <div className="w-16 bg-green-500 h-[80%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Driver's Licenses
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      98%
                    </div>
                  </div>
                  <div className="w-16 bg-yellow-500 h-[50%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Tax Returns
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      85%
                    </div>
                  </div>
                  <div className="w-16 bg-red-500 h-[30%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Medical Reports
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      75%
                    </div>
                  </div>
                  <div className="w-16 bg-green-500 h-[70%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Passports
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      92%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="misclassified">
          <Card>
            <CardHeader>
              <CardTitle>Misclassified Documents</CardTitle>
              <CardDescription>
                Documents that were incorrectly classified by the system. Review
                and retrain to improve accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Predicted Type</TableHead>
                    <TableHead>Actual Type</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {misclassifiedDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        {doc.filename}
                      </TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <XCircle className="h-3 w-3" />
                          {doc.predictedType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          {doc.actualType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={doc.confidence}
                            className="h-2 w-16"
                          />
                          <span className="text-sm">{doc.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Document Review</DialogTitle>
                              <DialogDescription>
                                Review and correct the classification for this
                                document.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <h4 className="font-medium">Filename</h4>
                                <p className="text-sm">{doc.filename}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">
                                  System Classification
                                </h4>
                                <p className="text-sm text-red-500">
                                  {doc.predictedType}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">
                                  Correct Classification
                                </h4>
                                <p className="text-sm text-green-500">
                                  {doc.actualType}
                                </p>
                              </div>
                              <div className="border rounded p-4 bg-gray-50">
                                <h4 className="font-medium mb-2">
                                  Document Preview
                                </h4>
                                <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                                  <FileWarning className="h-12 w-12 text-gray-400" />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Download</Button>
                              <Button>Add to Training Set</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Retrain System Dialog */}
      <AlertDialog
        open={isRetrainingDialogOpen}
        onOpenChange={setIsRetrainingDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retrain Classification System</AlertDialogTitle>
            <AlertDialogDescription>
              This will initiate a retraining process using all current training
              documents and corrections. The process may take several minutes to
              complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Start Retraining</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassificationResults;
