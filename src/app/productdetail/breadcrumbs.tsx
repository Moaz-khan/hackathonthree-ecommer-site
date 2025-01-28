import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaAngleRight } from "react-icons/fa";

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <FaAngleRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/productdetail">Men</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <FaAngleRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>T-shit</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
