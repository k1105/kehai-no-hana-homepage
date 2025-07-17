export const splitText = (text: string) =>
	text.split("").map((c, i) => (
		<span key={i} className="char">
			{c}
		</span>
	));
