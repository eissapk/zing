import styles from "@/components/chat/Chat.module.css";
export default function MyMsg({ msg = "" }) {
  return (
    <section className={`${styles.me} w-fit`}>
      <div className="rounded-full bg-zinc-200 py-4 inline-block text-center px-5">{msg}</div>
    </section>
  );
}
