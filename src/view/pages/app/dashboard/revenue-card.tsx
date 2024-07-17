import { DollarSign } from "lucide-react";
import { formatValue } from "../../../../app/helpers/formatValue";
import useGetRevenue from "../../../../app/hooks/use-get-revenue";
import MetricCardsSkeleton from "../../../components/metric-cards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function RevenueCard() {
  const { data } = useGetRevenue();
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
            <strong className="text-2xl font-bold tracking-tight">
              {formatValue(data.receipt)}
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
