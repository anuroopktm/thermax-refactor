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
import {
  formatDate,
  formatStatus,
  getStatusVariant,
  getInitials,
} from "@/lib/utils";

export interface ActivityModel {
  id: number;
  title: string;
  template?: string | null;
  createdAt?: string;
  status?: string;
  userInitials?: string;
  [key: string]: any;
}

interface SharedActivityCardProps<T extends ActivityModel = ActivityModel> {
  activity: T;
  href?: string;
  hideActions?: boolean;
  hideStatus?: boolean;
  onEdit?: (activity: T) => void;
  onDelete?: (activity: T) => void;
}

export function SharedActivityCard<T extends ActivityModel>({
  activity,
  href,
  hideActions,
  hideStatus,
  onEdit,
  onDelete,
}: SharedActivityCardProps<T>) {
  const initials =
    activity.userInitials ||
    (activity.user?.name ? getInitials(activity.user.name) : "??");
  const displayDate =
    activity.createdAt || activity.created_on || activity.created_at;

  const content = (
    <Card className="group-hover:shadow-md transition cursor-pointer">
      <CardContent className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarFallback className="font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground">
            {activity.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Created on: {formatDate(displayDate)}
          </p>
        </div>

        {!hideStatus && (
          <Badge variant={getStatusVariant(activity.status || "Completed")}>
            {formatStatus(activity.status || "Completed")}
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
