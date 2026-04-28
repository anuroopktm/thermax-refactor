import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface ChildActivitySubItem {
  id: string;
  name: string;
  createdAt: string;
  status: "Passed" | "Failed";
  userInitials: string;
}

interface ChildActivityItemCardProps {
  item: ChildActivitySubItem;
}

export function ChildActivityItemCard({ item }: ChildActivityItemCardProps) {
  const isPassed = item.status === "Passed";

  return (
    <Link to={item.id}>
      <Card className="hover:shadow-md transition">
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarFallback className="font-medium">
              {item.userInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              Created on: {item.createdAt}
            </p>
          </div>

          <Badge variant={isPassed ? "default" : "secondary"}>
            {item.status}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
