import People from "@/components/People";
import { Copy } from "lucide-react";
import ToolTip from "@/components/ToolTip";
import { Button } from "../ui/button";
function Nav({ roomId }: { roomId: string }) {
  return (
    <nav className="max-w-max mx-auto w-full px-4">
      <ul className="flex items-center justify-end gap-x-4">
        <li>
          <ToolTip title="Copy room link">
            <Button size={"icon"} variant={"outline"} className="rounded-full">
              <Copy className="w-4 h-4" />
            </Button>
          </ToolTip>
        </li>
        <li>
          <People roomId={roomId} />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
