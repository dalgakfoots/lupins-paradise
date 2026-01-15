'use client';

import { Editor } from '@monaco-editor/react';
import { useRef, useEffect } from 'react';

interface MonacoWrapperProps {
    code: string;
    language?: string;
    theme?: string;
    onType?: () => void;
}

export default function MonacoWrapper({ code, language = "typescript", theme = "vs-dark", onType }: MonacoWrapperProps) {
    const onTypeRef = useRef(onType);

    useEffect(() => {
        onTypeRef.current = onType;
    }, [onType]);

    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current && code) {
            // When code updates, scroll to bottom to show new typing
            // We use a small timeout to let the model update first
            setTimeout(() => {
                const model = editorRef.current.getModel();
                if (model) {
                    const lineCount = model.getLineCount();
                    editorRef.current.revealLine(lineCount);
                    // Also attempt to move cursor to end?
                    editorRef.current.setPosition({ lineNumber: lineCount, column: model.getLineMaxColumn(lineCount) });
                }
            }, 10);
        }
    }, [code]);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;

        // Disable TypeScript validation to avoid red squiggles on mock code
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });

        // Intercept all typing
        editor.onKeyDown((e: any) => {
            // Ignore specialized keys (Ctrl, Alt, arrows, etc. if needed)
            // For simple "hacker typer", we can just trigger on almost anything.
            // Let's filter slightly to avoid triggering on just "Shift" press.
            const isModifier = e.ctrlKey || e.altKey || e.metaKey;

            // Allow navigation arrows to work normally?
            // e.keyCode: 3=Enter, ...
            // Let's just catch standard keys.

            if (!isModifier && onTypeRef.current) {
                // If we use preventDefault, the character won't be inserted.
                e.preventDefault();
                e.stopPropagation();
                onTypeRef.current();
            }
        });

        // Also disable pasting or context menu if we want strictly controlled input?
        // For now, keydown is main interaction.
    }

    return (
        <div className="w-full h-full">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue="// Click here and start typing..."
                value={code}
                theme={theme}
                onMount={handleEditorDidMount}
                options={{
                    readOnly: false, // Must be false to receive events and show cursor?
                    // Actually, if we preventDefault on all keys, it acts like readOnly but with cursor.
                    domReadOnly: false,
                    minimap: { enabled: true },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    cursorBlinking: "solid",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    // Hide some UI elements to make it cleaner
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    contextmenu: false,
                }}
            />
        </div>
    );
}
