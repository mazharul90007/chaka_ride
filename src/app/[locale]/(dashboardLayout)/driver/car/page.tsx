"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  Plus,
  Loader2,
  Info
} from "lucide-react";
import {
  useGetMyCars,
  useCreateCar,
  useUpdateCar,
  useDeleteCar
} from "@/hooks/useCars";
import { useGetCategories } from "@/hooks/useCarCategory";
import { Car } from "@/types";

// Split Components
import { CarCard } from "./_components/CarCard";
import { CarDetailsModal } from "./_components/CarDetailsModal";
import { CarFormModal } from "./_components/CarFormModal";
import { DeleteConfirmation } from "./_components/DeleteConfirmation";

export default function MyCarsPage() {
  const { data: carsData, isLoading } = useGetMyCars();
  const { data: categoriesData } = useGetCategories();
  const createMutation = useCreateCar();
  const updateMutation = useUpdateCar();
  const deleteMutation = useDeleteCar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedCarForDetails, setSelectedCarForDetails] = useState<Car | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    model: "",
    modelBn: "",
    year: "",
    yearBn: "",
    description: "",
    descriptionBn: "",
    registrationNumber: "",
    engineNumber: "",
    chassisNumber: "",
    color: "",
    colorBn: "",
    categoryId: "",
    photos: [] as string[]
  });

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const cars = carsData?.data || [];
  const categories = categoriesData?.data || [];

  const handleOpenModal = (car?: Car) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        model: car.model || "",
        modelBn: car.modelBn || "",
        year: car.year || "",
        yearBn: car.yearBn || "",
        description: car.description || "",
        descriptionBn: car.descriptionBn || "",
        registrationNumber: car.registrationNumber || "",
        engineNumber: car.engineNumber || "",
        chassisNumber: car.chassisNumber || "",
        color: car.color || "",
        colorBn: car.colorBn || "",
        categoryId: car.categoryId || "",
        photos: car.photos || [],
      });
    } else {
      setEditingCar(null);
      setFormData({
        model: "",
        modelBn: "",
        year: "",
        yearBn: "",
        description: "",
        descriptionBn: "",
        registrationNumber: "",
        engineNumber: "",
        chassisNumber: "",
        color: "",
        colorBn: "",
        categoryId: "",
        photos: [],
      });
    }
    setPhotoFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("data", JSON.stringify(formData));

    if (photoFiles.length > 0) {
      photoFiles.forEach(file => {
        payload.append("photos", file);
      });
    }

    if (editingCar) {
      updateMutation.mutate(
        { id: editingCar.id, data: payload },
        { onSuccess: handleCloseModal }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: handleCloseModal });
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CarIcon className="size-5 md:size-6 text-(--brand-primary)" />
            My Vehicles
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage your cars and their documents.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="h-11 px-6 rounded-xl bg-(--brand-primary) text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-600/20 flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="size-5" />
          Add New Vehicle
        </button>
      </header>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <Info className="size-5 text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800 font-medium">
          Newly added vehicles will be reviewed by our team before they become active for rides.
        </p>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="col-span-full py-20 text-center"><Loader2 className="size-8 animate-spin mx-auto text-slate-300" /></div>
          ) : cars.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <CarIcon className="size-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No vehicles yet</h3>
              <p className="text-slate-500 text-sm mb-6">Add your first car to start accepting ride requests.</p>
              <button
                onClick={() => handleOpenModal()}
                className="text-sm font-bold text-(--brand-primary) hover:underline"
              >
                Click here to add a vehicle
              </button>
            </div>
          ) : (
            cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={() => handleOpenModal(car)}
                onDelete={() => setDeleteId(car.id)}
                onViewDetails={() => setSelectedCarForDetails(car)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Create/Edit Modal */}
      <CarFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingCar={editingCar}
        formData={formData}
        setFormData={setFormData}
        photoFiles={photoFiles}
        setPhotoFiles={setPhotoFiles}
        handleSubmit={handleSubmit}
        categories={categories}
        isPending={isPending}
      />

      {/* Details Modal */}
      <CarDetailsModal
        car={selectedCarForDetails}
        isOpen={!!selectedCarForDetails}
        onClose={() => setSelectedCarForDetails(null)}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
