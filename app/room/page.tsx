import ChatForm from "@/components/ChatForm";
import MyMsg from "@/components/MyMsg";
import StrangerMsg from "@/components/StrangerMsg";

export default function Room() {
  return (
    <div className="flex gap-4 flex-col h-screen justify-between py-4">
      <div className="overflow-y-auto py-4 w-screen">
        <div className="max-w-max mx-auto">
          <article className="px-4 flex flex-col gap-10">
            <MyMsg msg="Hello" />
            <StrangerMsg msg="heyyyyyyyyyy" name="Eissa" />
          </article>
        </div>
      </div>
      <ChatForm className="w-full md:max-w-max px-4 mx-auto" />
    </div>
  );
}
