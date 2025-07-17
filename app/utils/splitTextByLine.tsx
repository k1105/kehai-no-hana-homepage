export const splitTextByLine = (text: string) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  return lines.map((line, lineIndex) => (
    <div key={lineIndex} className="line-animation">
      {line}
    </div>
  ));
};
