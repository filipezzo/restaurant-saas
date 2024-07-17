import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatValue } from "../../../../app/helpers/formatValue";
import useGetOrdersDetails from "../../../../app/hooks/use-get-orders-details";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import OrderDetails from "./order-details";
import { OrderStatus } from "./order-status";

interface TableRowDetailsProps {
  orderId: string;
  open: boolean;
}

export function TableRowDetails({ orderId, open }: TableRowDetailsProps) {
  const { data: details } = useGetOrdersDetails({ orderId, open });
  if (!details) return null;
  return (
    <DialogContent className="max-w-[90%] rounded-md md:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Pedido: {details.id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow className="border-muted-foreground">
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <OrderStatus status={details.status} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                <span className="text-end font-medium text-muted-foreground">
                  {details.customer.name}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                <span className="font-medium text-muted-foreground">
                  {details.customer.phone ?? "-"}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <span className="font-medium text-muted-foreground">
                  {details.customer.email}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">
                <span className="font-medium text-muted-foreground">
                  {formatDistanceToNow(details?.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>

              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.orderItems.map((order) => (
              <OrderDetails key={order.id} order={order} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell>{formatValue(details.totalInCents ?? 0)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
