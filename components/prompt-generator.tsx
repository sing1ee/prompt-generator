"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Wand2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  requirement: z.string()
    .min(2, { message: "需求描述至少需要2个字" })
    .max(100, { message: "需求描述最长100个字" }),
});

export default function PromptGenerator() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setGeneratedPrompt("");
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "错误",
          description: error.error,
        });
        setIsGenerating(false);
        return;
      }

      // Get the response as a stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Failed to read response');
      }

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        // Decode the stream data
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        // Process each line
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.content) {
                setGeneratedPrompt((prev) => prev + data.content);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }

      toast({
        title: "Prompt Generated!",
        description: "Your prompt has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  // 复制代码到剪贴板
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [index]: false }));
      }, 2000);
      toast({
        title: "Copied!",
        description: "Code has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
              Your Requirements
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your needs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your requirements here..."
                          className="min-h-[200px] resize-none"
                          disabled={isGenerating}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Prompt"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Generated Prompt
            </h2>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {generatedPrompt ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');

                    // 生成唯一的索引
                    const codeIndex = Math.random().toString(36).substring(7);

                    return (
                      <div className="relative group">
                        <div className="absolute right-2 top-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(codeString, Number(codeIndex))}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copied[codeIndex] ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match?.[1] || 'text'}
                          PreTag="div"
                          className="!mt-0"
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                  // Preserve line breaks
                  p: ({children}) => <p className="whitespace-pre-wrap mb-4">{children}</p>,
                  h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                }}
              >
                {generatedPrompt}
              </ReactMarkdown>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400 italic">
                Your generated prompt will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}