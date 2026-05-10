"use client";

import { useState } from "react";
import {
  Car as CarIcon,
  Search,
  Filter,
} from "lucide-react";
import {
  useGetAllCars,
  useUpdateCar,
  useDeleteCar
} from "@/hooks/useCars";
import { useGetCategories } from "@/hooks/useCarCategory";
import { Car } from "@/types";

// Split Components
import { AdminCarTable } from "./_components/AdminCarTable";
import { AdminCarFormModal } from "./_components/AdminCarFormModal";
import { DeleteConfirmation } from "./_components/DeleteConfirmation";

export default function AdminCarsPage() {
  const { data: carsData, isLoading } = useGetAllCars();
  const { data: categoriesData } = useGetCategories();
  const updateMutation = useUpdateCar();
  const deleteMutation = useDeleteCar();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    status: "PENDING" as "PENDING" | "APPROVED" | "REJECTED",
    photos: [] as string[]
  });

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const cars = carsData?.data || [];
  const categories = categoriesData?.data || [];

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.driver?.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || car.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (car: Car) => {
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
      status: car.status || "PENDING",
      photos: car.photos || [],
    });
    setPhotoFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    const payload = new FormData();
    payload.append("data", JSON.stringify(formData));

    if (photoFiles.length > 0) {
      photoFiles.forEach(file => {
        payload.append("photos", file);
      });
    }

    updateMutation.mutate(
      { id: editingCar.id, data: payload },
      { onSuccess: handleCloseModal }
    );
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CarIcon className="size-5 md:size-6 text-(--brand-primary)" />
            Manage All Cars
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Review, approve, and manage driver vehicles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search model, plate, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full sm:w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-slate-400 ml-2" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-(--brand-primary)"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Table */}
      <AdminCarTable 
        cars={filteredCars}
        isLoading={isLoading}
        onEdit={handleOpenModal}
        onDelete={setDeleteId}
      />

      {/* Edit Modal */}
      <AdminCarFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingCar={editingCar}
        formData={formData}
        setFormData={setFormData}
        photoFiles={photoFiles}
        setPhotoFiles={setPhotoFiles}
        handleSubmit={handleSubmit}
        categories={categories}
        isPending={updateMutation.isPending}
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
