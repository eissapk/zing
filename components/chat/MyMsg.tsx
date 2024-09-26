import styles from "@/components/chat/Chat.module.css";
export default function MyMsg({ msg = "" }) {
  return (
    <section className={`${styles.me} w-fit`}>
      <div className="rounded-full bg-zinc-200 p-4 inline-block">{msg}</div>
    </section>
  );
}
