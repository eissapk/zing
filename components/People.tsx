import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UsersRound } from "lucide-react";

function People({ list = [] }: { list: any[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="rounded-full">
          <UsersRound className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            People <span className="text-sm text-zinc-700">{list.length ? `(${list.length})` : ""}</span>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2 py-4 border-t border-t-zinc-200 pt-4 mt-4">
          {list.map((d, i) => (
            <li className="font-bold text-zinc-700 truncate max-w-48 first-letter:capitalize text-sm" key={i}>
              {d}
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
export default People;
