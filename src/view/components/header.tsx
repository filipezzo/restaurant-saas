import { Home, ListOrdered, UtensilsCrossed } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { LinkItem } from "./linkItem";
import { ThemeToggle } from "./theme/theme-toggle";
import { Separator } from "./ui/separator";

const navItems = [
  {
    id: 1,
    label: "Início",
    icon: <Home />,
    to: "/",
  },

  {
    id: 2,
    label: "Pedidos",
    icon: <ListOrdered />,
    to: "/orders",
  },
];

export function Header() {
  return (
    <header className="flex h-16 items-center gap-6 border-b border-b-foreground/10 px-6">
      <UtensilsCrossed className="hidden md:block" />
      <Separator orientation="vertical" className="hidden h-6 md:block" />
      <nav>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <LinkItem to={item.to} item={item} key={item.id} />
          ))}
        </ul>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <AccountMenu />
      </div>
    </header>
  );
}
