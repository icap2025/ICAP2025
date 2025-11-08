"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserData, updateUserDataCookies } from "@/lib/auth";
import { updateProfile, updateProfilePicture } from "@/actions/user.action";
import { Edit, Loader2, Camera, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditProfileDrawerProps {
  userData: UserData | null;
  onProfileUpdated: () => void;
}

export default function EditProfileDrawer({ userData, onProfileUpdated }: EditProfileDrawerProps) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(userData?.profilePic || null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    Name: userData?.Name || "",
    affiliation: userData?.affiliation || "",
    designation: userData?.designation || "",
    phone: userData?.phone || "",
    abstractTitle: userData?.abstractTitle || "",
    participationCategory: userData?.participationCategory || "",
    presenterName: userData?.presenterName || "",
  });

  const participationOptions = [
    { value: "Oral", label: "Oral" },
    { value: "Poster", label: "Poster" },
    { value: "Only Attendee", label: "Only Attendee" },
    { value: "Online/Virtual", label: "Online/Virtual" },
  ];

  const isPaymentComplete = userData?.payment_status ?? false;

  // Update form data and preview when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        Name: userData.Name || "",
        affiliation: userData.affiliation || "",
        designation: userData.designation || "",
        phone: userData.phone || "",
        abstractTitle: userData.abstractTitle || "",
        participationCategory: userData.participationCategory || "",
        presenterName: userData.presenterName || "",
      });
      setProfilePicPreview(userData.profilePic || null);
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid File",
        description: "Please select an image file.",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Image size should be less than 5MB.",
      });
      return;
    }

    try {
      setIsUploadingImage(true);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        // Update preview
        setProfilePicPreview(base64String);

        // Upload to server
        const response = await updateProfilePicture(base64String);

        if (response.success) {
          // Update cookies with new profile picture
          updateUserDataCookies({ profilePic: response.user.profilePic });
          
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been updated successfully.",
          });
          
          // Refresh user data to get updated profile picture from auth context
          await onProfileUpdated();
        }
      };

      reader.onerror = () => {
        throw new Error('Failed to read image file');
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error("Image upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload image. Please try again.",
      });
      // Reset preview on error
      setProfilePicPreview(userData?.profilePic || null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);

      // Prepare update data
      const updateData: any = {
        Name: formData.Name,
        affiliation: formData.affiliation,
        designation: formData.designation,
        phone: formData.phone,
        presenterName: formData.presenterName,
      };

      // Only include abstract fields if payment is not complete
      if (!isPaymentComplete) {
        updateData.abstractTitle = formData.abstractTitle;
        updateData.participationCategory = formData.participationCategory;
      }

      const response = await updateProfile(updateData);

      if (response.success) {
        // Update cookies with the new profile data
        updateUserDataCookies({
          Name: formData.Name,
          affiliation: formData.affiliation,
          designation: formData.designation,
          phone: formData.phone,
          presenterName: formData.presenterName,
          ...((!isPaymentComplete) && {
            abstractTitle: formData.abstractTitle,
            participationCategory: formData.participationCategory as any,
          }),
        });
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        
        // Refresh user data from auth context
        await onProfileUpdated();
        
        // Small delay to ensure data is refreshed before closing
        setTimeout(() => {
          setOpen(false);
        }, 500);
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 border-2 border-green-500">
          <Edit className="h-4 w-4  md:my-0 my-5" />
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Update your personal and abstract information
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-auto max-h-[60vh] px-4">
            <div className="space-y-6 py-4">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    <AvatarImage 
                      src={profilePicPreview || userData?.profilePic || "/user-avatar.png"} 
                      alt={userData?.Name || "User"} 
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {userData?.Name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Label 
                    htmlFor="profile-picture-upload" 
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                      Change Picture
                    </div>
                  </Label>
                  <Input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploadingImage}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Recommended: Square image, max 5MB
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.Name}
                      onChange={(e) => handleInputChange("Name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliation">Affiliation *</Label>
                    <Input
                      id="affiliation"
                      value={formData.affiliation}
                      onChange={(e) => handleInputChange("affiliation", e.target.value)}
                      placeholder="Your institution/organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      placeholder="Your position/title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+880..."
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Abstract Information Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Abstract Information</h3>
                {isPaymentComplete && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mb-4 bg-orange-50 dark:bg-orange-950 p-3 rounded-md border border-orange-200 dark:border-orange-800">
                    ⚠️ Abstract details are locked after payment. Only presenter name can be changed.
                  </p>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="abstractTitle">Abstract Title *</Label>
                    <Textarea
                      id="abstractTitle"
                      value={formData.abstractTitle}
                      onChange={(e) => handleInputChange("abstractTitle", e.target.value)}
                      placeholder="Enter your abstract title"
                      rows={3}
                      disabled={isPaymentComplete}
                      className={isPaymentComplete ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participationCategory">Participation Category *</Label>
                    <Select
                      value={formData.participationCategory}
                      onValueChange={(value) => handleInputChange("participationCategory", value)}
                      disabled={isPaymentComplete}
                    >
                      <SelectTrigger 
                        id="participationCategory"
                        className={isPaymentComplete ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {participationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="presenterName">Presenter Name *</Label>
                    <Input
                      id="presenterName"
                      value={formData.presenterName}
                      onChange={(e) => handleInputChange("presenterName", e.target.value)}
                      placeholder="Name of the presenter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={isUpdating}
              className="w-full"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
