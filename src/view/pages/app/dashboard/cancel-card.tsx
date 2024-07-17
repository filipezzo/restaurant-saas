import { DollarSign } from "lucide-react";
import { useCanceledCard } from "../../../../app/hooks/use-canced-card";
import MetricCardsSkeleton from "../../../components/metric-cards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function CancelCard() {
  const { data } = useCanceledCard();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Cancelamento (mês)
        </CardTitle>
        <DollarSign className="size-5 text-muted-foreground" />
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
                  <span className="text-rose-400">
                    +{data.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-emerald-400">
                    {data.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
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
