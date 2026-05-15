import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  path: string;
}

export function AppCard({ title, description, imageUrl, path }: Props) {
  return (
    <Link to={path} className="group">
      <Card className="h-full cursor-pointer overflow-hidden pt-0 transition-all duration-200 group-hover:shadow-lg group-hover:ring-1 group-hover:ring-primary">
        {/* Image */}
        <div className="aspect-4/3 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
