import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Keyboard } from "lucide-react";

function JoinRoom() {
  return (
    <>
      <section className="flex relative">
        <Keyboard className="absolute left-4 top-[50%] translate-y-[-50%] h5 w-5" />
        <Input type="text" placeholder="Enter code or link" className="ps-12 h-12 text-base" />
      </section>

      <section>
        <Button variant={"ghost"} className="h-12 text-base">
          Join
        </Button>
      </section>
    </>
  );
}

export default JoinRoom;
