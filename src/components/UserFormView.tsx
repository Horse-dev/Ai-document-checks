import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DocumentUploadField from "./DocumentUploadField";
import ClassificationResult from "./ClassificationResult";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Upload, User, Building, Mail, Phone } from "lucide-react";

interface UserFormViewProps {
  onSubmit?: (data: any) => void;
  documentTypes?: string[];
  isProcessingDocument?: boolean;
}

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  organization: z.string().optional(),
  comments: z.string().optional(),
});

const UserFormView = ({
  onSubmit = () => {},
  documentTypes = [
    "Birth Certificate",
    "Driver's License",
    "Passport",
    "Tax Return",
    "Medical Record",
  ],
  isProcessingDocument = false,
}: UserFormViewProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [classificationStatus, setClassificationStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      comments: "",
    },
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setClassificationStatus("pending");
    setActiveTab("form");

    // Simulate classification process
    setTimeout(() => {
      setClassificationStatus("success");
      // Pre-fill form with extracted data
      form.setValue("firstName", "John");
      form.setValue("lastName", "Doe");
    }, 3000);
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      document: uploadedFile,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">
          Document Upload & Submission
        </CardTitle>
        <CardDescription>
          Upload your document for automatic classification and complete the
          form with the extracted information.
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Document Upload
          </TabsTrigger>
          <TabsTrigger
            value="form"
            className="flex items-center gap-2"
            disabled={!uploadedFile}
          >
            <FileText className="h-4 w-4" />
            Form Submission
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <DocumentUploadField
              onUpload={handleFileUpload}
              onClassify={() => {}}
              acceptedFileTypes={[
                ".pdf",
                ".doc",
                ".docx",
                ".jpg",
                ".jpeg",
                ".png",
              ]}
              maxFileSize={10}
            />
          </div>
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Document Information</h3>
              <ClassificationResult
                documentName={uploadedFile?.name || "document.pdf"}
                documentType="Birth Certificate"
                confidence={92}
                status={classificationStatus}
                extractedFields={[
                  { name: "Full Name", value: "John Doe" },
                  { name: "Date of Birth", value: "01/15/1985" },
                  { name: "Document ID", value: "BC-12345678" },
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleFormSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 text-gray-400 mr-2" />
                                  <Input placeholder="John" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 text-gray-400 mr-2" />
                                  <Input placeholder="Doe" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                <Input
                                  type="email"
                                  placeholder="john.doe@example.com"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                <Input
                                  placeholder="(555) 123-4567"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization (Optional)</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Building className="h-4 w-4 text-gray-400 mr-2" />
                                <Input placeholder="Company Name" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Additional Comments (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information you'd like to provide..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button type="submit" className="w-full">
                          Submit Form
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserFormView;
