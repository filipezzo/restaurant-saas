import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  totalItems: number;
  pageIndex: number;
  ItemsPerPage: number;
  onPaginate(pageIndex: number): Promise<void> | void;
}

export function Pagination({
  ItemsPerPage,
  pageIndex,
  totalItems,
  onPaginate,
}: PaginationProps) {
  const pages = Math.ceil(totalItems / ItemsPerPage) || 1;

  return (
    <section className="flex items-center justify-between text-[14px]">
      <span>Total de {totalItems} item(s)</span>
      <div className="flex items-center gap-6">
        <span>
          Página {pageIndex + 1} de {pages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPaginate(0)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex < 1}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira Página</span>
          </Button>

          <Button
            onClick={() => onPaginate(pageIndex - 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex < 1}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>

          <Button
            onClick={() => onPaginate(pageIndex + 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pages === pageIndex + 1}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima Página</span>
          </Button>
          <Button
            onClick={() => onPaginate(pages - 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pages === pageIndex + 1}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
