export default function MyMsg({ msg = "" }: { msg: string }) {
	return (
		<div className="flex justify-end animate-slide-up">
			<div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-sm leading-relaxed shadow-lg shadow-violet-500/20">
				{msg}
			</div>
		</div>
	);
}
