import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
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
} from "./ui/alert-dialog";

interface DocumentType {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: string;
  documentCount: number;
}

interface DocumentTypeManagerProps {
  documentTypes?: DocumentType[];
  onCreateDocumentType?: (
    documentType: Omit<DocumentType, "id" | "createdAt" | "documentCount">,
  ) => void;
  onUpdateDocumentType?: (documentType: DocumentType) => void;
  onDeleteDocumentType?: (id: string) => void;
}

const DocumentTypeManager = ({
  documentTypes = [
    {
      id: "1",
      name: "Birth Certificate",
      description:
        "Official document certifying the details of a person's birth",
      keywords: ["birth", "certificate", "date of birth", "name", "parents"],
      createdAt: "2023-06-15",
      documentCount: 42,
    },
    {
      id: "2",
      name: "Driver's License",
      description:
        "Official document permitting a person to drive a motor vehicle",
      keywords: ["license", "driver", "ID", "expiration", "state"],
      createdAt: "2023-07-22",
      documentCount: 78,
    },
    {
      id: "3",
      name: "Passport",
      description:
        "Official document issued by a government, certifying the holder's identity and citizenship",
      keywords: ["passport", "travel", "citizenship", "expiration", "photo"],
      createdAt: "2023-08-05",
      documentCount: 36,
    },
  ],
  onCreateDocumentType = () => {},
  onUpdateDocumentType = () => {},
  onDeleteDocumentType = () => {},
}: DocumentTypeManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentType | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newDocumentType, setNewDocumentType] = useState({
    name: "",
    description: "",
    keywords: [],
  });
  const [newKeyword, setNewKeyword] = useState("");

  const filteredDocumentTypes = documentTypes.filter(
    (docType) =>
      docType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docType.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docType.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const handleCreateDocumentType = () => {
    onCreateDocumentType(newDocumentType);
    setNewDocumentType({ name: "", description: "", keywords: [] });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateDocumentType = () => {
    if (selectedDocumentType) {
      onUpdateDocumentType(selectedDocumentType);
      setSelectedDocumentType(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteDocumentType = (id: string) => {
    onDeleteDocumentType(id);
  };

  const handleAddKeyword = (isEdit: boolean) => {
    if (newKeyword.trim()) {
      if (isEdit && selectedDocumentType) {
        setSelectedDocumentType({
          ...selectedDocumentType,
          keywords: [...selectedDocumentType.keywords, newKeyword.trim()],
        });
      } else {
        setNewDocumentType({
          ...newDocumentType,
          keywords: [...newDocumentType.keywords, newKeyword.trim()],
        });
      }
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string, isEdit: boolean) => {
    if (isEdit && selectedDocumentType) {
      setSelectedDocumentType({
        ...selectedDocumentType,
        keywords: selectedDocumentType.keywords.filter((k) => k !== keyword),
      });
    } else {
      setNewDocumentType({
        ...newDocumentType,
        keywords: newDocumentType.keywords.filter((k) => k !== keyword),
      });
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Document Type Manager</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Document Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Document Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDocumentType.name}
                  onChange={(e) =>
                    setNewDocumentType({
                      ...newDocumentType,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDocumentType.description}
                  onChange={(e) =>
                    setNewDocumentType({
                      ...newDocumentType,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="keywords" className="text-right">
                  Keywords
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add keyword"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddKeyword(false)}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newDocumentType.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {keyword}
                        <X
                          size={14}
                          className="cursor-pointer"
                          onClick={() => handleRemoveKeyword(keyword, false)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleCreateDocumentType}
                disabled={!newDocumentType.name}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search document types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocumentTypes.map((docType) => (
          <Card key={docType.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{docType.name}</CardTitle>
                <div className="flex gap-1">
                  <Dialog
                    open={
                      isEditDialogOpen &&
                      selectedDocumentType?.id === docType.id
                    }
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedDocumentType(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDocumentType(docType)}
                      >
                        <Pencil size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Edit Document Type</DialogTitle>
                      </DialogHeader>
                      {selectedDocumentType && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={selectedDocumentType.name}
                              onChange={(e) =>
                                setSelectedDocumentType({
                                  ...selectedDocumentType,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-description"
                              className="text-right"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={selectedDocumentType.description}
                              onChange={(e) =>
                                setSelectedDocumentType({
                                  ...selectedDocumentType,
                                  description: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-keywords"
                              className="text-right"
                            >
                              Keywords
                            </Label>
                            <div className="col-span-3 space-y-2">
                              <div className="flex gap-2">
                                <Input
                                  id="edit-keywords"
                                  value={newKeyword}
                                  onChange={(e) =>
                                    setNewKeyword(e.target.value)
                                  }
                                  placeholder="Add keyword"
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  onClick={() => handleAddKeyword(true)}
                                >
                                  Add
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedDocumentType.keywords.map(
                                  (keyword, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="flex items-center gap-1"
                                    >
                                      {keyword}
                                      <X
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() =>
                                          handleRemoveKeyword(keyword, true)
                                        }
                                      />
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={handleUpdateDocumentType}
                          disabled={!selectedDocumentType?.name}
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the document type "
                          {docType.name}" and cannot be undone.
                          {docType.documentCount > 0 && (
                            <span className="block mt-2 font-semibold text-red-500">
                              Warning: This document type has{" "}
                              {docType.documentCount} associated documents.
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteDocumentType(docType.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Created: {new Date(docType.createdAt).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                {docType.description}
              </p>
              <Separator className="my-2" />
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">Keywords:</div>
                <div className="flex flex-wrap gap-1">
                  {docType.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                {docType.documentCount} training document
                {docType.documentCount !== 1 ? "s" : ""}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocumentTypes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No document types found. Create one to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentTypeManager;
