import { useState, useEffect, useRef } from 'react';

export function useGhostTyper(targetText: string, speedMultiplier: number = 1.0) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Use a ref to keep track of current index without dependency loop
    const indexRef = useRef(0);

    // If target text changes, reset
    useEffect(() => {
        setDisplayedText("");
        indexRef.current = 0;
        setIsTyping(true);
    }, [targetText]);

    useEffect(() => {
        if (!isTyping) return;
        if (indexRef.current >= targetText.length) {
            setIsTyping(false);
            return;
        }

        let timeoutId: NodeJS.Timeout;

        const typeNextChar = () => {
            const remaining = targetText.length - indexRef.current;
            if (remaining <= 0) {
                setIsTyping(false);
                return;
            }

            // Logic for humanizing:
            // Base speed: 50-150ms per key
            // Variance: sometimes fast burst, sometimes pause (thinking)

            const char = targetText[indexRef.current];

            // "Mistake" logic could go here (type wrong char, then backspace)
            // For MVP, just simple typing.

            setDisplayedText((prev) => prev + char);
            indexRef.current++;

            // Calculate next delay
            let baseDelay = Math.random() * 100 + 50; // 50ms to 150ms

            // Add "thinking" pause on newlines or special chars
            if (char === '\n') baseDelay += 500;
            if (char === '{' || char === ';') baseDelay += 300;

            timeoutId = setTimeout(typeNextChar, baseDelay / speedMultiplier);
        };

        timeoutId = setTimeout(typeNextChar, 100);

        return () => clearTimeout(timeoutId);
    }, [targetText, isTyping, speedMultiplier]);

    const reset = (text: string) => {
        setDisplayedText("");
        indexRef.current = 0;
        setIsTyping(true);
    };

    return { displayedText, isTyping, reset };
}
