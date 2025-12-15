"use client";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown to HTML converter
  // For production, consider using react-markdown or marked
  const renderMarkdown = (text: string) => {
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      return `<pre class="bg-muted/50 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm font-mono">${code.trim()}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Unordered lists
    html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li class="ml-4">.*<\/li>\n?)+/gim, '<ul class="list-disc list-inside my-3 space-y-1">$&</ul>');
    
    // Ordered lists
    html = html.replace(/^\s*\d+\.\s+(.*)$/gim, '<li class="ml-4">$1</li>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="my-4">');
    html = html.replace(/\n/g, '<br />');
    
    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
      html = `<p class="my-4">${html}</p>`;
    }
    
    return html;
  };

  return (
    <div 
      className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
