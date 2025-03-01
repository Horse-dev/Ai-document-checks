import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import AdminDashboard from "./AdminDashboard";
import UserFormView from "./UserFormView";
import { FileText, Upload } from "lucide-react";

const Home = () => {
  const [activeView, setActiveView] = useState<"admin" | "user">("admin");

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Document Classification Plugin
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            AI-powered document classification system with JetFormBuilder
            integration for WordPress
          </p>
        </div>

        <Card className="bg-white shadow-sm border-gray-200 mb-8">
          <CardContent className="p-0">
            <Tabs
              value={activeView}
              onValueChange={(value) =>
                setActiveView(value as "admin" | "user")
              }
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="w-full justify-center rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="admin"
                    className="flex items-center gap-2 py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    <FileText className="h-4 w-4" />
                    Admin Dashboard
                  </TabsTrigger>
                  <TabsTrigger
                    value="user"
                    className="flex items-center gap-2 py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    <Upload className="h-4 w-4" />
                    User Form View
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="admin" className="mt-0 p-0">
                <AdminDashboard />
              </TabsContent>

              <TabsContent value="user" className="mt-0 p-0">
                <UserFormView />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2023 Document Classification Plugin. All rights reserved.</p>
          <p className="mt-1">Powered by AI and JetFormBuilder</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
