import PromptGenerator from '@/components/prompt-generator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            AI Prompt Generator
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Transform your ideas into well-crafted prompts. Simply describe your needs, and let our tool generate the perfect prompt for you.
          </p>
        </header>
        <PromptGenerator />
      </div>
    </main>
  );
}