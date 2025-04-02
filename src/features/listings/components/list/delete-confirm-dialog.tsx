"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Modal
      title="هل أنت متأكد من الحذف؟"
      description="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف السيارة نهائياً من النظام."
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className="flex items-center justify-end space-x-2 pt-6 rtl:space-x-reverse">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          إلغاء
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          حذف
        </Button>
      </div>
    </Modal>
  );
}
