import { ArrowRight } from "lucide-react";
import { useAprovedOrder } from "../../../../app/hooks/use-approved-order";
import { useDeliveredOrder } from "../../../../app/hooks/use-deliver-order";
import { useDispatchOrder } from "../../../../app/hooks/use-dispatch-order";
import { Button } from "../../../components/ui/button";
import { OrderStatus } from "./order-status";

interface Props {
  status: OrderStatus;
  id: string;
}

export function OrderNextStatus({ status, id }: Props) {
  const { mutateAsync: aprroveFn, isPending: isApprovingOrder } =
    useAprovedOrder();

  const { mutateAsync: dispatchFn, isPending: isDispatchingOrder } =
    useDispatchOrder();

  const { mutateAsync: deliverFn, isPending: isDeliveringOrder } =
    useDeliveredOrder();

  if (status === "pending") {
    return (
      <Button
        disabled={isApprovingOrder}
        onClick={() => aprroveFn({ orderId: id })}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Aprovar
      </Button>
    );
  }

  if (status === "processing") {
    return (
      <Button
        disabled={isDispatchingOrder}
        onClick={() => dispatchFn({ orderId: id })}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Em entrega
      </Button>
    );
  }

  if (status === "delivering") {
    return (
      <Button
        disabled={isDeliveringOrder}
        onClick={() => deliverFn({ orderId: id })}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Entregue
      </Button>
    );
  }

  return null;
}
