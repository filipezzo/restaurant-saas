import React from "react";
import { formatValue } from "../../../../app/helpers/formatValue";
import { TableCell, TableRow } from "../../../components/ui/table";

export interface OrderProps {
  order: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  };
}

export default function OrderDetails({ order }: OrderProps) {
  const total = formatValue(order.priceInCents * order.quantity);
  return (
    <React.Fragment key={order.id}>
      <TableRow>
        <TableCell className="text-muted-foreground">
          {order?.product.name}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {order.quantity}
        </TableCell>
        <TableCell className="text-right text-muted-foreground">
          {formatValue(order.priceInCents)}
        </TableCell>
        <TableCell className="text-right text-muted-foreground">
          {total ?? 0}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
