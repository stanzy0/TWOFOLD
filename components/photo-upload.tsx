"use client";

import { useState, useRef } from "react";
import { Camera, X, Upload } from "lucide-react";
import { GlassCard } from "@/components/backgrounds/GlassCard";

interface PhotoUploadProps {
  onUpload: (url: string) => void;
  currentPhoto?: string;
}

export function PhotoUpload({ onUpload, currentPhoto }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview(null);
    onUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo</label>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            onClick={removePhoto}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <GlassCard
          intensity="light"
          className="p-6 text-center cursor-pointer hover:border-rose-300 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <Camera className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload a photo</p>
            <Upload className="h-4 w-4 text-gray-400" />
          </div>
        </GlassCard>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
