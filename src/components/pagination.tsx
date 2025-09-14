import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  totalPages: number;
}

interface Props {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  goToPage,
  goToNext,
  goToPrev,
}: Props) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={goToPrev}
          >
            <ChevronLeft className="mr-1 size-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {currentPage > 3 && (
              <>
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(1)}
                  className="cursor-pointer"
                >
                  1
                </Button>
                {currentPage > 4 && (
                  <Ellipsis className="text-muted-foreground size-4" />
                )}
              </>
            )}

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;

              if (pageNum > totalPages) return null;

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <Ellipsis className="text-muted-foreground size-4" />
                )}

                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => goToPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            className="cursor-pointer"
            onClick={goToNext}
          >
            Next
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
