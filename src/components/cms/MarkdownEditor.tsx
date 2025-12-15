"use client";

import { useState, useRef, useEffect } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, minHeight = "400px", placeholder = "Write your content here..." }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = value.substring(0, start) + text + value.substring(end);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const renderPreview = (text: string) => {
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>');
    
    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      return `<pre class="bg-muted/50 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm font-mono">${code.trim()}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Lists
    html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li class="ml-4">.*<\/li>\n?)+/gim, '<ul class="list-disc list-inside my-3 space-y-1">$&</ul>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="my-4">');
    html = html.replace(/\n/g, '<br />');
    
    if (!html.startsWith('<')) {
      html = `<p class="my-4">${html}</p>`;
    }
    
    return html;
  };

  const toolbarButtons = [
    { label: "B", title: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
    { label: "I", title: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
    { label: "H1", title: "Heading 1", action: () => insertMarkdown("# ", "", "Heading") },
    { label: "H2", title: "Heading 2", action: () => insertMarkdown("## ", "", "Heading") },
    { label: "H3", title: "Heading 3", action: () => insertMarkdown("### ", "", "Heading") },
    { label: "Code", title: "Inline Code", action: () => insertMarkdown("`", "`", "code") },
    { label: "{}",  title: "Code Block", action: () => insertMarkdown("```\n", "\n```", "code block") },
    { label: "• List", title: "Bullet List", action: () => insertAtCursor("- List item\n- List item\n") },
    { label: "1. List", title: "Numbered List", action: () => insertAtCursor("1. List item\n2. List item\n") },
    { label: "Link", title: "Insert Link", action: () => insertMarkdown("[", "](url)", "link text") },
    { label: "Quote", title: "Blockquote", action: () => insertMarkdown("> ", "", "quote") },
    { label: "---", title: "Horizontal Rule", action: () => insertAtCursor("\n---\n") },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30 p-2 flex items-center gap-1 flex-wrap">
        {toolbarButtons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={btn.action}
            title={btn.title}
            className="px-2.5 py-1.5 text-xs font-medium rounded hover:bg-muted transition-colors"
          >
            {btn.label}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              showPreview ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className="relative">
        {showPreview ? (
          <div
            className="p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 font-mono text-sm bg-transparent focus:outline-none resize-none"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-border bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {value.length} characters • {value.split(/\s+/).filter(Boolean).length} words
        </div>
        <div className="flex items-center gap-3">
          <span>Markdown supported</span>
          {showPreview && <span className="text-primary">• Preview mode</span>}
        </div>
      </div>
    </div>
  );
}
