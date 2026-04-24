import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeaderBreadcrumbsProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export function HeaderBreadcrumbs({ breadcrumbs }: HeaderBreadcrumbsProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink
                  render={<Link to={crumb.href}>{crumb.label}</Link>}
                />
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
