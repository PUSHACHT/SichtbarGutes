import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StickyMobileCTAProps {
  onCheckClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onCheckClick }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#162d50]/95 backdrop-blur-md border-t border-[#2f5b7a] p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
      <div className="text-white text-xs">
        <span className="font-bold block">1.500 € Förderung</span>
        <span className="text-[#d8e2f0] text-[10px]">0 € Kosten bei Ablehnung</span>
      </div>
      <button
        onClick={onCheckClick}
        className="btn-spring bg-[#2f5b7a] text-white text-xs font-bold px-4 py-2.5 rounded flex items-center gap-1.5 shadow"
      >
        <span>Schnell-Check</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
