import { useEffect } from 'react';

type KeyCombo = {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};

type ShortcutAction = () => void;

interface ShortcutMap {
    [description: string]: {
        combo: KeyCombo;
        action: ShortcutAction;
    };
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {

            for (const key in shortcuts) {
                const { combo, action } = shortcuts[key];

                const matchesKey = event.key.toLowerCase() === combo.key.toLowerCase();
                const matchesCtrl = !!combo.ctrl === event.ctrlKey;
                const matchesShift = !!combo.shift === event.shiftKey;
                const matchesAlt = !!combo.alt === event.altKey;
                const matchesMeta = !!combo.meta === event.metaKey;

                if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
                    event.preventDefault();
                    action();
                    return;
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}
