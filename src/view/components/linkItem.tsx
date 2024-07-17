import { ReactNode } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

interface ILinkProps extends LinkProps {
  item: { id: number; label: string; icon: ReactNode };
  to: string;
}

export function LinkItem({ item, to, ...props }: ILinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      data-current={to === pathname}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
      to={to}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}
