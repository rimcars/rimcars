"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, Trash2 } from "lucide-react";
import { Seller } from "@/types/seller";
import { toast } from "sonner";
import { removeAvatar } from "../actions/profile-actions";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { updateAvatar as globalUpdateAvatar } from "@/app/actions";
import { USER_UPDATED_EVENT } from "@/hooks/use-user";

interface UserAvatarSectionProps {
  user: Seller;
  translations: {
    change_avatar: string;
    remove_avatar: string;
    update_avatar: string;
    cancel: string;
    avatar_updated: string;
    avatar_removed: string;
    avatar_update_error: string;
    avatar_delete_error: string;
    dismiss: string;
    joined_at: string;
  };
}

export function UserAvatarSection({
  user,
  translations,
}: UserAvatarSectionProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Format the created_at date
  const formattedDate = user.created_at
    ? format(new Date(user.created_at), "dd MMMM yyyy", { locale: ar })
    : "";

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel upload
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Upload avatar
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("avatarFile", selectedFile);

      // Add the old avatar URL if it exists
      if (user.avatar_url) {
        formData.append("oldAvatarUrl", user.avatar_url);
      }

      // Use the global updateAvatar action
      const result = await globalUpdateAvatar(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success(translations.avatar_updated);
      // Reset state
      setSelectedFile(null);
      setPreviewUrl(null);

      // Trigger user data update event
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error(translations.avatar_update_error);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove avatar
  const handleRemoveAvatar = async () => {
    setIsRemoving(true);
    try {
      // Create empty FormData to remove the avatar
      const formData = new FormData();
      if (user.avatar_url) {
        formData.append("oldAvatarUrl", user.avatar_url);
      }

      // Use the global updateAvatar action with no file to remove the avatar
      const result = await globalUpdateAvatar(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success(translations.avatar_removed);

      // Trigger user data update event
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
    } catch (error) {
      console.error("Error removing avatar:", error);
      toast.error(translations.avatar_delete_error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Card className="border rounded-xl shadow-sm bg-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center md:flex-row-reverse md:items-center md:justify-between gap-6">
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-primary/10 shadow-md">
                <AvatarImage
                  src={previewUrl || user.avatar_url || ""}
                  alt={user.name || "صورة المستخدم"}
                />
                <AvatarFallback className="text-3xl bg-primary/10 font-bold">
                  {user.name?.slice(0, 2)?.toUpperCase() || "MS"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md">
                <label className="cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center w-full">
              {selectedFile ? (
                <div className="flex gap-2 w-full justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="min-w-24"
                  >
                    {isUploading
                      ? translations.update_avatar + "..."
                      : translations.update_avatar}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isUploading}
                  >
                    {translations.cancel}
                  </Button>
                </div>
              ) : (
                user.avatar_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={handleRemoveAvatar}
                    disabled={isRemoving}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {translations.remove_avatar}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="text-center md:text-right w-full md:w-auto">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            {formattedDate && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center md:justify-end gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {translations.joined_at}: {formattedDate}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
