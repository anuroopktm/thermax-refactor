import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { formatDate, formatStatus, getStatusVariant } from "@/lib/utils";

export interface ActivityItem {
  template?: string | null;
  id: string;
  title: string;
  createdAt: string;
  status: string;
  userInitials: string;
  // [key: string]: any;
}

interface SharedActivityCardProps {
  activity: ActivityItem;
  href?: string;
  hideActions?: boolean;
  hideStatus?: boolean;
  onEdit?: (activity: ActivityItem) => void;
  onDelete?: (activity: ActivityItem) => void;
}

export function SharedActivityCard({
  activity,
  href,
  hideActions,
  hideStatus,
  onEdit,
  onDelete,
}: SharedActivityCardProps) {
  const content = (
    <Card className="group-hover:shadow-md transition cursor-pointer">
      <CardContent className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarFallback className="font-medium">
            {activity.userInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground">
            {activity.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Created on: {formatDate(activity.createdAt)}
          </p>
        </div>

        {!hideStatus && (
          <Badge variant={getStatusVariant(activity.status)}>
            {formatStatus(activity.status)}
          </Badge>
        )}

        {!hideActions && (
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              render={
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              align="end"
              className="min-w-24"
            >
              <DropdownMenuItem
                onClick={() => onEdit?.(activity)}
                className="cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(activity)}
                className="text-destructive cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="group">
        {content}
      </Link>
    );
  }

  return <div className="group">{content}</div>;
}
