import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import DocumentTypeManager from "./DocumentTypeManager";
import TrainingDocumentUploader from "./TrainingDocumentUploader";
import ClassificationResults from "./ClassificationResults";
import { FileText, BookOpen, BarChart2 } from "lucide-react";

interface AdminDashboardProps {
  activeTab?: "document-types" | "training" | "results";
}

const AdminDashboard = ({
  activeTab = "document-types",
}: AdminDashboardProps) => {
  const [currentTab, setCurrentTab] = useState<string>(activeTab);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage document types, upload training documents, and monitor
            classification results
          </p>
        </div>

        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="p-0">
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="document-types"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    <FileText className="h-4 w-4" />
                    Document Types
                  </TabsTrigger>
                  <TabsTrigger
                    value="training"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    <BookOpen className="h-4 w-4" />
                    Training Documents
                  </TabsTrigger>
                  <TabsTrigger
                    value="results"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    <BarChart2 className="h-4 w-4" />
                    Classification Results
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="document-types" className="mt-0 p-0">
                <DocumentTypeManager />
              </TabsContent>

              <TabsContent value="training" className="mt-0 p-0">
                <TrainingDocumentUploader />
              </TabsContent>

              <TabsContent value="results" className="mt-0 p-0">
                <ClassificationResults />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
