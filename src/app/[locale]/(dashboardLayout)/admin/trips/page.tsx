"use client";

import { useState, useEffect } from "react";
import { useAdminTrips, useCreateTrip, useApproveDriverBid, useRejectDriverBid } from "@/hooks/useTrip";
import { useGetCategories } from "@/hooks/useCarCategory";
import CreateTripModal from "@/components/admin/CreateTripModal";
import DriverProfileModal from "@/components/admin/DriverProfileModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Search,
  User,
  Eye,
  XCircle,
  Phone,
  Wallet,
  Calendar,
  AlertCircle,
  Mail,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

export default function AdminTripsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedDriverForProfile, setSelectedDriverForProfile] = useState<any>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when status changes
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const { data: tripsData, isLoading: isTripsLoading } = useAdminTrips({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter,
  });
  const approveBid = useApproveDriverBid();
  const rejectBid = useRejectDriverBid();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const trips = tripsData?.data?.data || [];
  const meta = tripsData?.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

  const handleApproveDriver = async (tripId: string, requestId: string) => {
    try {
      await approveBid.mutateAsync({ tripId, requestId });
      toast.success("Driver approved successfully!");
    } catch (error) {
      toast.error("Failed to approve driver");
    }
  };

  const handleRejectBid = async (tripId: string, requestId: string) => {
    try {
      await rejectBid.mutateAsync({ tripId, requestId });
      toast.success("Bid rejected. Driver can now bid again.");
    } catch (error) {
      toast.error("Failed to reject bid");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Car className="size-5 md:size-6 text-(--brand-primary)" />
            Trip Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Create new trips and manage driver bids.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full sm:w-48 md:w-60 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-10 px-4 rounded-lg bg-(--brand-primary) text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2"
          >
            <Plus size={16} /> 
            <span className="hidden sm:inline">Create Trip</span>
          </button>
        </div>
      </header>

      {/* Trips List */}
      <div className="space-y-6">
        {isTripsLoading ? (
          <div className="text-center py-10 text-slate-500">Loading trips...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Car className="mx-auto size-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No Trips Found</h3>
            <p className="text-slate-500 mt-2">No trips match your current filters.</p>
          </div>
        ) : (
          trips.map((trip: any) => (
            <motion.div 
              key={trip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-xl flex items-center justify-center font-bold ${trip.status === 'ASSIGNED' ? 'bg-emerald-50 text-emerald-600' : trip.status === 'COMPLETED' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                    <Car className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{trip.pickupLocation} to {trip.destination}</h2>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${trip.status === 'ASSIGNED' ? 'bg-emerald-100 text-emerald-700' : trip.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 mt-1 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="size-3" /> {trip.pickupDate} {trip.pickupTime}</span>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1"><User className="size-3" /> {trip.fullName} ({trip.whatsAppNumber})</span>
                        {(trip.passenger?.email || trip.email) && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Mail className="size-3" /> {trip.passenger?.email || trip.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Requested Fare</p>
                  <p className="text-lg font-bold text-slate-900">৳{trip.requestedPrice || 'N/A'}</p>
                </div>
              </div>

              {/* Driver Bids Section */}
              <div className="bg-slate-50 p-5 md:p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="size-4 text-slate-400" />
                  Driver Requests & Bids
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trip.driverRequests?.map((req: any) => (
                    <div key={req.id} className={`p-4 rounded-xl border ${req.status === 'APPROVED' ? 'bg-emerald-50 border-emerald-200' : req.status === 'ACCEPTED' ? 'bg-white border-blue-200 shadow-sm' : 'bg-white border-slate-200'} transition-all`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                            {req.driver.user.image ? <img src={req.driver.user.image} alt="" className="size-full object-cover" /> : <User className="size-4 text-slate-500" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-900 line-clamp-1">{req.driver.user.name}</p>
                              <button 
                                onClick={() => setSelectedDriverForProfile(req.driver)}
                                className="size-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                title="View Driver Profile"
                              >
                                <Eye className="size-3" />
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-500">{req.driver.user.phone || req.driver.phone}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${req.status === 'APPROVED' ? 'text-emerald-700 bg-emerald-100' : req.status === 'ACCEPTED' ? 'text-blue-700 bg-blue-100' : req.status === 'REJECTED' ? 'text-rose-700 bg-rose-100' : 'text-slate-500 bg-slate-100'}`}>
                          {req.status}
                        </span>
                      </div>
                      
                      {req.status === 'ACCEPTED' && trip.status === 'PENDING' && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-slate-500">Offered Price</p>
                            <p className="text-sm font-bold text-blue-700">৳{req.offeredPrice}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRejectBid(trip.id, req.id)}
                              disabled={rejectBid.isPending}
                              className="h-8 px-3 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-bold hover:bg-rose-600 hover:text-white transition-all disabled:opacity-50"
                            >
                              Reject
                            </button>
                            <button 
                              onClick={() => handleApproveDriver(trip.id, req.id)}
                              disabled={approveBid.isPending}
                              className="h-8 px-3 rounded-lg bg-blue-600 text-[10px] font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {req.status === 'APPROVED' && (
                        <div className="mt-3 pt-3 border-t border-emerald-200/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                            <CheckCircle2 className="size-4" /> Finalized at ৳{req.offeredPrice}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {!isTripsLoading && trips.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{(page - 1) * limit + 1}</span> to <span className="font-bold text-slate-900">{Math.min(page * limit, meta.total)}</span> of <span className="font-bold text-slate-900">{meta.total}</span> trips
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 px-3 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1 text-sm font-medium"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: meta.totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`size-9 rounded-md text-sm font-medium transition-colors ${
                    page === i + 1 
                      ? 'bg-(--brand-primary) text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages || meta.totalPages === 0}
              className="h-9 px-3 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1 text-sm font-medium"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      <CreateTripModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <DriverProfileModal 
        isOpen={!!selectedDriverForProfile} 
        onClose={() => setSelectedDriverForProfile(null)} 
        driver={selectedDriverForProfile} 
      />
    </div>
  );
}
