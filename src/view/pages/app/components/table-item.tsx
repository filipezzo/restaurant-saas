import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { formatValue } from "../../../../app/helpers/formatValue";
import { useCancelOrder } from "../../../../app/hooks/use-cancel-order";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { TableCell, TableRow } from "../../../components/ui/table";
import { OrderNextStatus } from "./order-next-status";
import { OrderStatus } from "./order-status";
import { TableRowDetails } from "./table-details";

interface ItemProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function TableItem({ order }: ItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: cancelOrder, isPending: isCanceling } = useCancelOrder();
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <TableRowDetails orderId={order.orderId} open={isDialogOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="hidden font-mono text-xs font-medium md:table-cell">
        {order.orderId}
      </TableCell>
      <TableCell className="hidden text-muted-foreground md:table-cell">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="text-nowrap font-medium">
        {order.customerName}
        <dl className="md:hidden">
          <dt className="sr-only">total</dt>
          <dd>{formatValue(order.total)}</dd>
        </dl>
      </TableCell>
      <TableCell className="hidden font-medium md:table-cell">
        {formatValue(order.total)}
      </TableCell>
      <TableCell>
        <OrderNextStatus status={order.status} id={order.orderId} />
        <Button
          className="md:hidden"
          onClick={() => cancelOrder({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
          disabled={
            !["pending", "processing"].includes(order.status) || isCanceling
          }
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Button
          onClick={() => cancelOrder({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
          disabled={
            !["pending", "processing"].includes(order.status) || isCanceling
          }
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
