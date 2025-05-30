"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface BasicShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

interface ShareOption {
  name: string;
  arabicName: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const BasicShareModal: React.FC<BasicShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  if (!isOpen) return null;

  const shareOptions: ShareOption[] = [
    {
      name: "Facebook",
      arabicName: "فيسبوك",
      icon: <Facebook className="h-5 w-5" />,
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Twitter",
      arabicName: "تويتر",
      icon: <Twitter className="h-5 w-5" />,
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
      },
    },
    {
      name: "LinkedIn",
      arabicName: "لينكد إن",
      icon: <Linkedin className="h-5 w-5" />,
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "WhatsApp",
      arabicName: "واتساب",
      icon: <MessageCircle className="h-5 w-5" />,
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
          "_blank"
        );
      },
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("تم نسخ الرابط بنجاح");
    } catch (err) {
      toast.error("حدث خطأ أثناء نسخ الرابط");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">مشاركة السيارة</h2>
          <p className="text-sm text-muted-foreground">اختر منصة للمشاركة</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={option.onClick}
            >
              {option.icon}
              <span>{option.arabicName}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyLink}
            className="shrink-0"
            aria-label="نسخ الرابط"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
