"use client";

import { useState } from "react";
import { useDriverTrips, useRespondTripRequest } from "@/hooks/useTrip";
import { useAIEstimate } from "@/hooks/useAIEstimate";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  XCircle,
  AlertCircle,
  Calendar,
  Wallet,
  Mail,
  User,
  Phone
} from "lucide-react";
import { toast } from "sonner";

export default function DriverRequestsPage() {
  const { data: tripsData, isLoading } = useDriverTrips();
  const respondRequest = useRespondTripRequest();

  const [activeTab, setActiveTab] = useState<"pending" | "finalized">("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [offeredPrice, setOfferedPrice] = useState("");
  const [aiEstimate, setAiEstimate] = useState<{ price: number; reasoning: string } | null>(null);

  const estimatePrice = useAIEstimate();

  const requests = tripsData?.data?.requests || [];
  const finalized = tripsData?.data?.finalized || [];

  const handleOpenModal = (req: any) => {
    setSelectedRequest(req);
    setOfferedPrice(req.trip.requestedPrice?.toString() || "");
    setAiEstimate(null); // Reset AI estimate on open
    setIsModalOpen(true);
  };

  const handleGetEstimate = async () => {
    if (!selectedRequest) return;
    
    try {
      const result = await estimatePrice.mutateAsync({
        pickup: selectedRequest.trip.pickupLocation,
        destination: selectedRequest.trip.destination,
        carCategoryName: selectedRequest.trip.carCategory?.categoryName || "Any",
        tripType: selectedRequest.trip.tripType,
      });
      
      if (result?.data?.error) {
        throw new Error(result.data.error);
      }
      
      setAiEstimate({
        price: result.data.estimatedPrice,
        reasoning: result.data.reasoning
      });
      toast.success("AI Estimate generated!");
    } catch (error: any) {
      console.error("AI Estimate Error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to generate AI estimate");
    }
  };

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await respondRequest.mutateAsync({
        requestId: selectedRequest.id,
        action: "ACCEPTED",
        offeredPrice: parseFloat(offeredPrice),
      });
      toast.success("Offer sent to Admin!");
      setIsModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      toast.error("Failed to send offer");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await respondRequest.mutateAsync({
        requestId,
        action: "REJECTED",
      });
      toast.success("Trip request rejected");
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <MapPin className="size-5 md:size-6 text-(--brand-primary)" />
            Trip Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage your trip invitations and finalized rides.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            New Requests ({requests.filter((r: any) => r.status === 'PENDING').length})
          </button>
          <button 
            onClick={() => setActiveTab("finalized")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'finalized' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            My Trips ({finalized.length})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Loading trips...</div>
        ) : activeTab === "pending" ? (
          /* Pending Requests */
          requests.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <AlertCircle className="mx-auto size-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No New Requests</h3>
              <p className="text-slate-500 mt-2">You don't have any pending trip requests right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {requests.map((req: any) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-xl border ${req.status === 'ACCEPTED' ? 'border-(--brand-primary) shadow-md shadow-blue-900/5' : 'border-slate-200 shadow-sm'} overflow-hidden relative`}
                >
                  {req.status === 'ACCEPTED' && (
                    <div className="absolute top-0 right-0 bg-(--brand-primary) text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                      OFFER SENT
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Car className="size-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 line-clamp-1">{req.trip.pickupLocation} → {req.trip.destination}</h2>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="size-3" /> {req.trip.pickupDate} {req.trip.pickupTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Trip Type</p>
                        <p className="text-sm font-bold text-slate-900 mt-1">{req.trip.tripType.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Required Car</p>
                        <p className="text-sm font-bold text-slate-900 mt-1">{req.trip.carCategory.categoryName}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Passenger Requested Fare</p>
                        <p className="text-lg font-bold text-slate-900 mt-1">৳{req.trip.requestedPrice || 'Open to offers'}</p>
                      </div>
                    </div>

                    {req.status === 'PENDING' ? (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="flex-1 h-10 rounded-lg border border-rose-200 text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => handleOpenModal(req)}
                          className="flex-1 h-10 rounded-lg bg-(--brand-primary) text-white font-bold text-sm hover:opacity-90 transition-opacity"
                        >
                          Make Offer
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
                          <CheckCircle2 className="size-4" /> You offered ৳{req.offeredPrice}
                        </div>
                        <span className="text-[10px] text-blue-500 font-medium">Waiting for Admin</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          /* Finalized Trips */
          finalized.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <Car className="mx-auto size-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No Finalized Trips</h3>
              <p className="text-slate-500 mt-2">When Admin approves your offer, trips will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {finalized.map((trip: any) => (
                <div key={trip.id} className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{trip.pickupLocation} → {trip.destination}</h2>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {trip.pickupDate} {trip.pickupTime}</span>
                        <span className="flex items-center gap-1"><Wallet className="size-3" /> ৳{trip.finalPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-4 rounded-lg bg-slate-50 border border-slate-100 min-w-[200px]">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Passenger Details</p>
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <User className="size-3.5 text-slate-400" />
                        {trip.passenger?.name || trip.fullName}
                      </p>
                      <p className="text-xs font-medium text-slate-600 flex items-center gap-2">
                        <Phone className="size-3.5 text-slate-400" />
                        {trip.passenger?.passenger?.phone || trip.passenger?.phone || trip.whatsAppNumber}
                      </p>
                      {(trip.passenger?.email || trip.email) && (
                        <p className="text-xs font-medium text-slate-600 flex items-center gap-2">
                          <Mail className="size-3.5 text-slate-400" />
                          <span className="truncate">{trip.passenger?.email || trip.email}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Make Offer Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Make an Offer</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="size-5" />
                </button>
              </div>
              
              <form onSubmit={handleAccept} className="p-5 space-y-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                  Passenger requested: <span className="font-bold">৳{selectedRequest.trip.requestedPrice || 'Open'}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Your Price Offer (৳) *</label>
                    <button 
                      type="button"
                      onClick={handleGetEstimate}
                      disabled={estimatePrice.isPending}
                      className="text-xs font-bold text-(--brand-primary) flex items-center gap-1 hover:underline disabled:opacity-50"
                    >
                      {estimatePrice.isPending ? 'Calculating...' : '✨ Get AI Estimate'}
                    </button>
                  </div>
                  <input 
                    required 
                    type="number" 
                    value={offeredPrice} 
                    onChange={(e) => setOfferedPrice(e.target.value)} 
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-lg font-bold text-slate-900 focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/20 outline-none" 
                    placeholder="e.g. 5500" 
                  />
                </div>

                <AnimatePresence>
                  {aiEstimate && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1">AI Suggested Fair Price</p>
                            <p className="text-xl font-black text-indigo-900">৳{aiEstimate.price}</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setOfferedPrice(aiEstimate.price.toString())}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-xs text-indigo-700/80 mt-2 font-medium leading-relaxed">
                          {aiEstimate.reasoning}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={respondRequest.isPending} 
                  className="w-full h-12 mt-2 rounded-xl bg-(--brand-primary) text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {respondRequest.isPending ? 'Sending...' : 'Send Offer to Admin'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
