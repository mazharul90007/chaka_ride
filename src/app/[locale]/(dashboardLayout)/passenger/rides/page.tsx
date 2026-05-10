"use client";

import { usePassengerTrips } from "@/hooks/useTrip";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  Wallet,
  User,
  Phone,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function PassengerRidesPage() {
  const { data: tripsData, isLoading } = usePassengerTrips();

  const trips = tripsData?.data || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Car className="size-5 md:size-6 text-(--brand-primary)" />
            My Rides
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            View your upcoming and past trips.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Loading your rides...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Car className="mx-auto size-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No Rides Yet</h3>
            <p className="text-slate-500 mt-2">When you book a trip by phone, it will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {trips.map((trip: any, i: number) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center font-bold ${trip.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500' : 'bg-(--brand-primary)/10 text-(--brand-primary)'}`}>
                      {trip.status === 'COMPLETED' ? <CheckCircle2 className="size-6" /> : <Clock className="size-6" />}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{trip.pickupLocation} → {trip.destination}</h2>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {trip.pickupDate} {trip.pickupTime}</span>
                        <span className="flex items-center gap-1 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-[10px]">{trip.tripType.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Final Fare</p>
                    <p className="text-2xl font-bold text-slate-900 flex items-center gap-1 md:justify-end">
                      ৳{trip.finalPrice}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 md:p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Driver Details</h3>
                  
                  {trip.finalDriver ? (
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          <User className="size-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{trip.finalDriver.user.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1 text-(--brand-primary)"><Phone className="size-3" /> {trip.finalDriver.user.phone}</span>
                            {trip.finalDriver.vehicleModel && (
                              <span className="flex items-center gap-1"><Car className="size-3" /> {trip.finalDriver.vehicleModel} ({trip.finalDriver.vehicleNumber})</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Driver details will be available once confirmed.</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
