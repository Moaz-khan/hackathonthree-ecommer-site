import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaAngleRight } from "react-icons/fa";

interface BreadcrumbProps {
  pageName: string; // Dynamic page name
}

export function BreadcrumbWithCustomSeparator({ pageName }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Static Home item */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separator */}
        <BreadcrumbSeparator>
          <FaAngleRight />
        </BreadcrumbSeparator>

        {/* Dynamic page name */}
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
