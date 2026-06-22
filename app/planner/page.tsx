"use client";

import { useState, useEffect, FormEvent } from "react";
import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/backgrounds/AuroraBackground";
import { GlassCard } from "@/components/backgrounds/GlassCard";
import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Clock, Plus, X, Sparkles, Utensils } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { RestaurantPicker, SelectedRestaurant } from "@/components/restaurant-picker";

interface DatePlan {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  completed?: boolean;
  restaurants?: SelectedRestaurant[];
}

const suggestions = [
  "Sunset picnic at the park",
  "Cook a fancy dinner together",
  "Movie night under the stars",
  "Visit a local museum",
  "Take a dance class",
  "Go hiking and pack lunch",
  "Wine tasting at home",
  "Visit a botanical garden",
  "Game night with snacks",
  "Stargazing on a blanket",
];

export default function PlannerPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState<DatePlan[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState<SelectedRestaurant[]>([]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    const saved = localStorage.getItem("date_plans");
    if (saved) setPlans(JSON.parse(saved));
  }, [isLoading, isLoggedIn]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPlan: DatePlan = {
      id: generateId(),
      title,
      description,
      date,
      time,
      location,
      completed: false,
      restaurants: selectedRestaurants,
    };
    const updated = [newPlan, ...plans];
    setPlans(updated);
    localStorage.setItem("date_plans", JSON.stringify(updated));
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setSelectedRestaurants([]);
    setShowForm(false);
  };

  const toggleComplete = (id: string) => {
    const updated = plans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p));
    setPlans(updated);
    localStorage.setItem("date_plans", JSON.stringify(updated));
  };

  const deletePlan = (id: string) => {
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    localStorage.setItem("date_plans", JSON.stringify(updated));
  };

  const addSuggestion = (suggestion: string) => {
    setTitle(suggestion);
    setShowForm(true);
  };

  return (
    <AuroraBackground intensity={0.8} speed={1.2} className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Date Night Planner
                </h1>
                <p className="mt-2 text-muted-foreground">Plan perfect moments together</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Date
              </button>
            </div>
          </motion.div>

          {showForm && (
            <GlassCard intensity="medium" className="p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Idea</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What do you want to do?"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where?"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Any special details..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-purple-500" />
                    Find Restaurants
                  </h3>
                  <RestaurantPicker
                    onSave={setSelectedRestaurants}
                    initialSelected={selectedRestaurants}
                  />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg font-semibold transition-colors">
                    Save Date Plan
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </GlassCard>
          )}

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Need inspiration?
            </h2>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => addSuggestion(s)}
                  className="px-3 py-1.5 rounded-full border border-purple-200 text-sm text-purple-700 hover:bg-purple-50 dark:border-purple-500/30 dark:text-purple-300 dark:hover:bg-purple-950/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No date plans yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start by planning your next perfect date!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {plans.map((plan, i) => (
                <GlassCard
                  key={plan.id}
                  intensity="medium"
                  glow={i % 2 === 0 ? "purple" : "rose"}
                  className={`p-6 transition-all ${plan.completed ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold text-foreground mb-1 ${plan.completed ? "line-through text-muted-foreground" : ""}`}>
                        {plan.title}
                      </h3>
                      {plan.description && <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>}
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {plan.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(plan.date).toLocaleDateString()}
                          </span>
                        )}
                        {plan.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {plan.time}
                          </span>
                        )}
                        {plan.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {plan.location}
                          </span>
                        )}
                        {plan.restaurants && plan.restaurants.length > 0 && (
                          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            🍽️ {plan.restaurants.map((r) => r.name).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleComplete(plan.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          plan.completed
                            ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                            : "bg-gray-50 text-gray-400 hover:text-green-600 dark:bg-gray-800"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 dark:bg-gray-800 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuroraBackground>
  );
}
