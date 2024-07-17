import { Utensils } from "lucide-react";
import useMonthOrders from "../../../../app/hooks/use-month-orders";
import MetricCardsSkeleton from "../../../components/metric-cards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function MonthOrdersCard() {
  const { data } = useMonthOrders();
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
            <strong className="text-2xl font-bold tracking-tight">
              {data.amount.toLocaleString("pt-br")}
            </strong>
            <p className="mt-1 text-xs text-muted-foreground">
              {data.diffFromLastMonth > 0 ? (
                <>
                  <span className="text-emerald-400">
                    +{data.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-400">
                    {data.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardsSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
