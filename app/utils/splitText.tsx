import type {ReactNode} from "react";
import type {Lang} from "../dictionaries";

// ja: 1文字ずつ / en: 1単語ずつ span 化（単語間は通常のスペースで折り返し可能にする）
export const splitTextWithClass = (
	text: string,
	lang: Lang,
	className: string
): ReactNode[] => {
	if (lang === "ja") {
		return text.split("").map((c, i) => (
			<span key={i} className={className}>
				{c}
			</span>
		));
	}
	return text.split(" ").flatMap((w, i) => {
		const word = (
			<span key={i} className={className}>
				{w}
			</span>
		);
		return i === 0 ? [word] : [" ", word];
	});
};

export const splitText = (text: string, lang: Lang = "ja") =>
	splitTextWithClass(text, lang, "char");
