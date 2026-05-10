"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  Car, 
  MapPin, 
  Users, 
  ChevronRight,
  Info
} from "lucide-react";
import { useRecommendVehicle } from "@/hooks/useAI";
import { useTranslations } from "next-intl";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export default function AIAssistantModal({ isOpen, onClose, onSelectCategory }: AIAssistantModalProps) {
  const t = useTranslations("Hero");
  const { mutate: recommend, isPending, data: recommendation } = useRecommendVehicle();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    passengers: 1,
    purpose: "",
    specialRequirements: ""
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recommend(formData);
    nextStep();
  };

  const handleSelect = () => {
    const data = recommendation?.data || recommendation;
    if (data?.suggestedCategoryId && onSelectCategory) {
      onSelectCategory(data.suggestedCategoryId);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[210] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="size-24" />
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Smart Trip Assistant</h2>
                  <p className="text-xs text-blue-100 font-medium italic">Powered by Chaka AI</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="size-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-8">
              {step <= 2 && (
                <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-slate-900">Where are you heading?</h3>
                          <div className="space-y-3">
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                              <input
                                required
                                type="text"
                                placeholder="Pickup Location"
                                value={formData.pickup}
                                onChange={e => setFormData({ ...formData, pickup: e.target.value })}
                                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium outline-none focus:border-blue-500 transition-all"
                              />
                            </div>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                              <input
                                required
                                type="text"
                                placeholder="Destination"
                                value={formData.destination}
                                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium outline-none focus:border-blue-500 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Users className="size-5 text-blue-500" />
                            How many passengers?
                          </h3>
                          <div className="flex items-center gap-4">
                            {[1, 2, 4, 7, 10].map(num => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setFormData({ ...formData, passengers: num })}
                                className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
                                  formData.passengers === num 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {num}{num === 10 ? "+" : ""}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 group"
                        >
                          Next Details
                          <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-slate-900">Any specific purpose?</h3>
                          <p className="text-xs text-slate-500 font-medium">e.g. Wedding, Business Meeting, Airport Transfer, Family Tour...</p>
                          <textarea
                            value={formData.purpose}
                            onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                            placeholder="Tell me about your trip..."
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all resize-none"
                          />
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-[2] h-14 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/30"
                          >
                            <Sparkles className="size-5" />
                            Get AI Recommendation
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center py-4">
                  {isPending ? (
                    <div className="space-y-4 py-8">
                      <div className="size-16 rounded-3xl bg-blue-50 flex items-center justify-center mx-auto mb-4 relative">
                        <Loader2 className="size-8 text-blue-600 animate-spin" />
                        <Sparkles className="size-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Finding your perfect ride...</h3>
                      <p className="text-sm text-slate-500 max-w-[250px] mx-auto leading-relaxed">
                        Our AI is analyzing your trip details to find the most comfortable and cost-effective vehicle.
                      </p>
                    </div>
                  ) : recommendation ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-100 text-left relative overflow-hidden group">
                        <div className="absolute -top-6 -right-6 p-12 bg-white/50 rounded-full blur-2xl group-hover:bg-white/80 transition-all" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                              AI Suggested
                            </div>
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                            <Car className="size-6 text-blue-600" />
                            {(recommendation.data || recommendation).suggestedCategoryName}
                          </h4>
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {(recommendation.data || recommendation).explanation}
                          </p>
                        </div>
                      </div>

                      {(recommendation.data || recommendation).alternativeSuggestion && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left flex gap-3">
                          <Info className="size-5 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">Alternative: {(recommendation.data || recommendation).alternativeSuggestion}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{(recommendation.data || recommendation).alternativeExplanation}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                          Try Again
                        </button>
                        <button
                          onClick={handleSelect}
                          className="flex-[2] h-14 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
                        >
                          Select this Category
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-8">
                      <p className="text-rose-600 font-bold">Oops! Something went wrong.</p>
                      <button onClick={() => setStep(1)} className="mt-4 text-blue-600 font-bold underline">Try Again</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
