import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useGetOrders } from "../../../app/hooks/use-get-data";
import { Pagination } from "../../components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { OrderTableSkeleton } from "./components/order-table-skeleton";
import { TableFilter } from "./components/table-filter";
import { TableItem } from "./components/table-item";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");
  const { data: orders, isLoading } = useGetOrders({
    pageIndex,
    orderId,
    customerName,
    status,
  });

  function handlePaginate(page: number) {
    setSearchParams((state) => {
      state.set("page", (page + 1).toString());
      return state;
    });
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-mono text-xl font-semibold">Pedidos</h1>
      <TableFilter />
      <div className="overflow-hidden rounded-md border border-muted-foreground">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="hidden w-[140px] md:table-cell">
                Identificador
              </TableHead>
              <TableHead className="hidden w-[180px] text-nowrap md:table-cell">
                Realizado há
              </TableHead>
              <TableHead className="hidden w-[140px] md:table-cell">
                Status
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px] text-nowrap">
                Total do pedido
              </TableHead>
              <TableHead className="hidden w-[164px] md:table-cell"></TableHead>
              <TableHead className="hidden w-[64px] md:table-cell"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <OrderTableSkeleton />}
            {orders &&
              orders.orders.map((order) => (
                <TableItem key={order.orderId} order={order} />
              ))}
          </TableBody>
        </Table>
      </div>
      {orders && (
        <Pagination
          onPaginate={handlePaginate}
          ItemsPerPage={10}
          pageIndex={pageIndex}
          totalItems={orders.meta.totalCount}
        />
      )}
    </div>
  );
}
