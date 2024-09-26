import ChatForm from "@/components/chat/Form";
// import LeftRoom from "@/components/chat/LeftRoom";
import MyMsg from "@/components/chat/MyMsg";
import Nav from "@/components/chat/Nav";
import StrangerMsg from "@/components/chat/StrangerMsg";
// import { redirect } from "next/navigation";
import { socket } from "@/lib/socket";

export default function Room({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log({ id });

  // if room doesn't exist
  // if (id === "123") redirect("/room");

  // if (leftRoom) return <LeftRoom id={id} />;

  // const name = prompt("Enter your name");
  // console.log({ name });
  // appendMessage("You joined");
  // socket.emit("new-user", id, name);

  socket.on("room-created", (room) => {
    console.log("room created", { room });

    // const wrapper = document.createElement("div");
    // const roomElement = document.createElement("span");
    // roomElement.innerText = room;
    // const roomLink = document.createElement("a");
    // roomLink.href = `/${room}`;
    // roomLink.innerText = "Join";
    // wrapper.append(roomElement);
    // wrapper.append(roomLink);
    // roomContainer.append(wrapper);
  });

  socket.on("chat-message", (data) => {
    console.log("chat-message", { data });

    // appendMessage(`${data.name}: ${data.message}`);
  });

  socket.on("user-connected", (name) => {
    console.log("user-connected", { name });
    // appendMessage(`${name} connected`);
  });

  socket.on("user-disconnected", (name) => {
    console.log("user-disconnected", { name });
    // appendMessage(`${name} disconnected`);
  });

  return (
    <div className="flex gap-4 flex-col h-screen justify-between py-4">
      <Nav peopleList={["eissa", "ahmed"]} />
      <div className="overflow-y-auto py-4 w-screen">
        <div className="max-w-max mx-auto">
          <article className="px-4 flex flex-col gap-10">
            <MyMsg msg="Hello" />
            <StrangerMsg msg="heyyyyyyyyyy" name="Eissa" />
          </article>
        </div>
      </div>
      <ChatForm className="w-full md:max-w-max px-4 mx-auto" roomName={id} />
    </div>
  );
}
