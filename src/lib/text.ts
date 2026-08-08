export function splitHighlight(
  text: string,
  wordCount = 1,
): { lead: string; highlight: string } {
  const words = text.split(" ");

  if (words.length === 1) {
    // Single word (e.g. a compound product name like "MailForge") — split
    // at the last internal capital letter instead of by whitespace, with
    // no space between lead and highlight since it's one word.
    const boundary = text.slice(1).search(/[A-Z]/);
    if (boundary === -1) return { lead: "", highlight: text };
    return { lead: text.slice(0, boundary + 1), highlight: text.slice(boundary + 1) };
  }

  const highlightWords = words.slice(-wordCount);
  const leadWords = words.slice(0, words.length - wordCount);
  const lead = leadWords.length > 0 ? `${leadWords.join(" ")} ` : "";
  return { lead, highlight: highlightWords.join(" ") };
}
