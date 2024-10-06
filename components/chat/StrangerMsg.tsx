export default function StrangerMsg({ msg = "", name = "Anonymous", time = new Date().toLocaleTimeString() }) {
  return (
    <section className="w-fit flex gap-1 flex-col items-start">
      <div className="flex gap-2 items-start justify-center">
        <span className="font-bold truncate max-w-48">{name}</span>
        <span className="text-sm text-zinc-500 mt-[2px]">{time}</span>
      </div>
      <div>{msg}</div>
    </section>
  );
}
