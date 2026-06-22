"use client";

import { useState, useCallback } from "react";
import { Search, Star, DollarSign, Clock, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/backgrounds/GlassCard";

export interface Restaurant {
  place_id: string;
  name: string;
  rating?: number;
  price_level?: number;
  formatted_address: string;
  opening_hours?: { open_now?: boolean };
  photos?: { photo_reference: string };
  types?: string[];
  geometry: { location: { lat: number; lng: number } };
}

export interface SelectedRestaurant {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  price_level?: number;
  photoUrl?: string;
  types?: string[];
  lat: number;
  lng: number;
}

interface RestaurantPickerProps {
  onSave: (restaurants: SelectedRestaurant[]) => void;
  initialSelected?: SelectedRestaurant[];
}

const MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

export function RestaurantPicker({ onSave, initialSelected = [] }: RestaurantPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<SelectedRestaurant[]>(initialSelected);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPlaces = useCallback(async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to search places");
      } else if (data.results && Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  const toggleSelect = (place: Restaurant) => {
    const exists = selected.find((r) => r.place_id === place.place_id);
    if (exists) {
      setSelected((prev) => prev.filter((r) => r.place_id !== place.place_id));
    } else {
      const newSelected: SelectedRestaurant = {
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        rating: place.rating,
        price_level: place.price_level,
        types: place.types,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        photoUrl: place.photos && MAP_KEY
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0]!.photo_reference}&key=${MAP_KEY}`
          : undefined,
      };
      setSelected((prev) => [...prev, newSelected]);
    }
  };

  const removeSelected = (placeId: string) => {
    setSelected((prev) => prev.filter((r) => r.place_id !== placeId));
  };

  const handleSave = () => {
    onSave(selected);
  };

  const mapQuery = selected.length > 0 ? selected.map((r) => r.name).join("|") : query;
  const cuisineTypes = (types?: string[]) => types?.filter((t) => !["restaurant", "food", "point_of_interest", "establishment", "meal_takeaway", "meal_delivery"].includes(t)) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchPlaces(e as unknown as FormEvent);
            }
          }}
          placeholder="Search restaurants or eateries..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={(e) => searchPlaces(e as unknown as FormEvent)}
          disabled={loading}
          className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {!MAP_KEY && selected.length === 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-4 py-3 rounded-lg text-sm">
          Map view requires NEXT_PUBLIC_GOOGLE_MAPS_KEY in your environment variables.
        </div>
      )}

      {MAP_KEY && mapQuery && (
        <GlassCard intensity="medium" className="p-2 overflow-hidden">
          <iframe
            title="Map"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/search?key=${MAP_KEY}&q=${encodeURIComponent(mapQuery + " restaurant")}`}
            allowFullScreen
          />
        </GlassCard>
      )}

      {selected.length > 0 && (
        <GlassCard intensity="medium" className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Selected Restaurants</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {selected.map((r) => (
                <motion.div
                  key={r.place_id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {r.photoUrl ? (
                      <img src={r.photoUrl} alt={r.name} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">🍽️</div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.formatted_address}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelected(r.place_id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg font-semibold transition-colors"
          >
            Save Restaurants to Plan
          </button>
        </GlassCard>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {results.map((place) => {
            const isSelected = selected.some((r) => r.place_id === place.place_id);
            return (
              <GlassCard
                key={place.place_id}
                intensity="medium"
                className={`p-4 cursor-pointer transition-all ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                onClick={() => toggleSelect(place)}
              >
                <div className="flex items-start gap-4">
                  {place.photos && MAP_KEY ? (
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0]!.photo_reference}&key=${MAP_KEY}`}
                      alt={place.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">🍽️</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">{place.name}</h4>
                      {isSelected && <Check className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {place.rating !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {place.rating}
                        </span>
                      )}
                      {place.price_level !== undefined && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {place.price_level}
                        </span>
                      )}
                      {place.opening_hours?.open_now !== undefined && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {place.opening_hours.open_now ? "Open now" : "Closed"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{place.formatted_address}</p>
                    {cuisineTypes.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {cuisineTypes.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
