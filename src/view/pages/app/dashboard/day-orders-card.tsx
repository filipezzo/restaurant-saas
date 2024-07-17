import { Utensils } from "lucide-react";
import useDayOrderCard from "../../../../app/hooks/use-dayorder-card";
import MetricCardsSkeleton from "../../../components/metric-cards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function DayOrdersCard() {
  const { data } = useDayOrderCard();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
            <strong className="text-2xl font-bold tracking-tight">
              {data.amount.toLocaleString("pt-br")}
            </strong>
            <p className="mt-1 text-xs text-muted-foreground">
              {data.diffFromYesterday > 0 ? (
                <>
                  <span className="text-emerald-400">
                    +{data.diffFromYesterday}%
                  </span>{" "}
                  em relação ao dia de ontem
                </>
              ) : (
                <>
                  <span className="text-rose-400">
                    {data.diffFromYesterday}%
                  </span>{" "}
                  em relação ao dia de ontem
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
