import { useState } from "react";
import { MoreHorizontal, Eye } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardAction } from "@/components/ui/card";
import { EditFaqDialog } from "./edit-faq-dialog";
import { type FaqModel } from "@/services/query/dr-conbot/types";
import { useDeleteDrConbotFaq } from "@/services/query/dr-conbot/faq.service";
import { conbotApi } from "@/services/interceptor";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface FaqCardProps {
  faq: FaqModel;
}

const STATUS_MAP = {
  approved: { variant: "success" as const, label: "Approved" },
  "in-review": { variant: "warning" as const, label: "In Review" },
  rejected: { variant: "destructive" as const, label: "Rejected" },
} as const;

export function FaqCard({ faq }: FaqCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const deleteMutation = useDeleteDrConbotFaq();

  const handleViewFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { data } = await conbotApi.get(`/doctor_conbot/faq/${faq.id}/link`);
      if (data?.link) {
        window.open(data.link, "_blank");
      } else {
        toast.error("View link not available");
      }
    } catch (err) {
      toast.error("Failed to generate view link");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      confirm(
        "Are you sure you want to remove this FAQ document? This will delete it permanently.",
      )
    ) {
      toast.promise(deleteMutation.mutateAsync(faq.id), {
        loading: "Deleting document...",
        success: "Document deleted successfully",
        error: (err) =>
          err?.response?.data?.detail || "Failed to delete document",
      });
    }
  };

  const statusBadge = STATUS_MAP[faq.status as keyof typeof STATUS_MAP] || {
    variant: "outline" as const,
    label: faq.status || "Not Specified",
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{faq.filename}</CardTitle>
          <CardDescription>{faq.description}</CardDescription>
          <CardAction className="flex items-center gap-4">
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleViewFile}
              className="cursor-pointer"
            >
              <Eye />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <CardAction>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <MoreHorizontal />
                    </Button>
                  </CardAction>
                }
              />
              <DropdownMenuContent align="end" className="min-w-28">
                <DropdownMenuItem
                  className="cursor-pointer font-medium"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer font-medium text-destructive focus:text-destructive"
                  onClick={handleDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
      </Card>

      <EditFaqDialog
        faq={faq}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
}
