'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { DocumentInput } from '@/components/DocumentInput';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { useDemo } from '@/hooks/useDemo';
import { ArrowRight, Eye, Shield, Languages, Zap, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURE_PILLS: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: 'Original always visible' },
  { icon: Shield, text: 'AI guides, you decide' },
  { icon: Languages, text: 'English · Odia' },
  { icon: Zap, text: 'Rule-based urgency' },
];

export default function HomePage() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();
  const { isDemoMode } = useDemo();
  const router = useRouter();

  const handleAnalyze = () => {
    if (!selectedDocId) return;
    router.push(`/viewer?doc=${selectedDocId}&lang=${language}&demo=${isDemoMode}`);
  };

  return (
    <div className="min-h-screen bg-surface-bg">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isDemoMode={isDemoMode}
        showLanguage={true}
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 text-balance">
            Understand emergency documents
            <br />
            <span className="text-stone-500">when every minute counts</span>
          </h1>
          <p className="text-stone-600 mt-3 text-sm sm:text-base max-w-lg mx-auto">
            CrisisLens highlights confusing sections, classifies urgency, and translates
            bureaucratic language into plain English and Odia — while keeping the original visible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FEATURE_PILLS.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-600"
            >
              <Icon className="w-3.5 h-3.5" />
              {text}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DocumentInput
            onSelectDocument={setSelectedDocId}
            selectedId={selectedDocId}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!selectedDocId}
          >
            Analyze Document
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-4 bg-white rounded-xl border border-stone-200 text-center"
        >
          <p className="text-sm text-stone-600 italic leading-relaxed">
            Picture a mother in Kalahandi: her husband was discharged from Dharamgarh hospital after a road accident.
            The discharge letter was in English, full of medical jargon. She reads Odia.
            She had 48 hours to submit insurance documents — and no idea what the letter said.
          </p>
          <p className="text-xs text-stone-400 mt-2">
            — Illustrative scenario. CrisisLens is built for families who miss deadlines because they cannot read bureaucratic documents.
          </p>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
