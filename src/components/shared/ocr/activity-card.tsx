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

interface ActivityItem {
  id: string;
  title: string;
  createdAt: string;
  status: string;
  userInitials: string;
}

interface SharedActivityCardProps {
  activity: ActivityItem;
  href?: string;
}

export function SharedActivityCard({
  activity,
  href,
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
            Created on: {activity.createdAt}
          </p>
        </div>

        <Badge
          variant={activity.status === "In Progress" ? "warning" : "outline"}
        >
          {activity.status}
        </Badge>

        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="min-w-24">
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
