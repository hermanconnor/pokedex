import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationLinks = ({ totalPages, currentPage, onPageChange }: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
            onClick={() => {
              onPageChange(Math.max(1, currentPage - 1));
            }}
          />
        </PaginationItem>

        {/* Mobile: Show only current page indicator */}
        <div className="mx-2 flex items-center gap-2 sm:hidden">
          <span className="text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => {
                    onPageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 4 && <PaginationEllipsis />}
            </>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum =
              Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;

            if (pageNum > totalPages) return null;

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={() => {
                    onPageChange(pageNum);
                  }}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => {
                    onPageChange(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(totalPages, currentPage + 1));
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationLinks;
