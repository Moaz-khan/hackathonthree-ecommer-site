import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationDemo = ({
  productsPerPage,
  totalProducts,
  onPageChange,
  isNextButtonDisabled,
}: {
  productsPerPage: number;
  totalProducts: number;
  onPageChange: (pageNumber: number) => void;
  isNextButtonDisabled: boolean;
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onPageChange(1)} />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(page)}
              isActive={page === 1} // Assume page 1 is active initially
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(totalPages)}
            className={
              isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDemo;
