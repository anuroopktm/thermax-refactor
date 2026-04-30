import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

interface PlateGroup {
  id: string;
  groupName: string;
  invalidCount: number;
  heatNo: string;
  plateNo: string;
}

interface PlateGroupsCardProps {
  group: PlateGroup;
}

export function PlateGroupsCard({ group }: PlateGroupsCardProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <CardTitle>{group.groupName}</CardTitle>
        <CardAction>
          <Badge variant="warning" className="rounded-md py-3">
            <AlertTriangle />
            {group.invalidCount} Invalid
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground w-16">Heat No:</span>
          <span className="font-semibold">{group.heatNo}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground w-16">Plate No:</span>
          <span className="font-semibold">{group.plateNo}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <span className="text-xs text-amber-600">
          {group.invalidCount} fields need attention
        </span>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            navigate(
              `/heating-ocr/activity/${id}/plate-groups/${group.id}/item`,
            )
          }
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
