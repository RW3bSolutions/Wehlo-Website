// hooks/useHighlightQuery.js
import { useEffect } from "react";

export function useHighlightQuery() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const q = params.get("q");
        if (!q) return;

        const highlightAndScroll = () => {
            const escapedQuery = q.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            const regex = new RegExp(escapedQuery, "i");
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );

            let found = false;
            while (walker.nextNode()) {
                const node = walker.currentNode;
                if (regex.test(node.nodeValue)) {
                    const matchIndex = node.nodeValue
                        .toLowerCase()
                        .indexOf(q.toLowerCase());
                    if (matchIndex > -1) {
                        const range = document.createRange();
                        range.setStart(node, matchIndex);
                        range.setEnd(node, matchIndex + q.length);

                        const highlightSpan = document.createElement("span");
                        highlightSpan.textContent = node.nodeValue.substring(
                            matchIndex,
                            matchIndex + q.length
                        );
                        highlightSpan.style.backgroundColor = "yellow";
                        highlightSpan.style.padding = "2px 4px";
                        highlightSpan.style.borderRadius = "4px";
                        highlightSpan.style.transition =
                            "background-color 0.5s ease";

                        const before = document.createTextNode(
                            node.nodeValue.substring(0, matchIndex)
                        );
                        const after = document.createTextNode(
                            node.nodeValue.substring(matchIndex + q.length)
                        );
                        const parent = node.parentNode;

                        parent.replaceChild(after, node);
                        parent.insertBefore(highlightSpan, after);
                        parent.insertBefore(before, highlightSpan);

                        highlightSpan.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                        found = true;
                        break;
                    }
                }
            }

            // Optional: Remove highlight after 3 seconds
            if (found) {
                setTimeout(() => {
                    const highlights = document.querySelectorAll(
                        'span[style*="background-color: yellow"]'
                    );
                    highlights.forEach((el) => {
                        el.style.transition = "background-color 1s ease";
                        el.style.backgroundColor = "transparent";
                    });
                }, 3000);
            }
        };

        setTimeout(highlightAndScroll, 300); // Delay to wait for full render
    }, []);
}
