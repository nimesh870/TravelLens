import { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Plus, Sparkles, Map, List, 
  ChevronLeft, ChevronRight, Download, Wand2, DollarSign,
  Compass, Zap, Coffee, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { destinations } from "@/data/destinations";
import { generateSmartItinerary, getBudgetEstimate, destinationTemplates } from "@/data/tripTemplates";
import { Trip, TripDay, TripPlace, PackingItem, Expense } from "./types";
import TripHeader from "./TripHeader";
import TripMap from "./TripMap";
import DayPlanner from "./DayPlanner";
import BudgetTracker from "./BudgetTracker";
import PackingList from "./PackingList";
import TripNotes from "./TripNotes";
import PlaceSearch from "./PlaceSearch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const dayColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F39C12",
  "#9B59B6",
  "#1ABC9C",
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const getDefaultTrip = (): Trip => ({
  id: generateId(),
  name: "My Nepal Adventure",
  destination: "",
  startDate: "",
  endDate: "",
  days: [],
  budget: {
    total: 0,
    spent: 0,
    currency: "USD",
  },
  packingList: [],
  notes: "",
  collaborators: [],
});

const TravelPlanner = () => {
  const [trip, setTrip] = useState<Trip>(() => {
    const saved = localStorage.getItem("travellens-trip");
    return saved ? JSON.parse(saved) : getDefaultTrip();
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("travellens-expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSetup, setShowSetup] = useState(!trip.startDate);
  const [searchDayId, setSearchDayId] = useState<string | null>(null);
  const [setupStep, setSetupStep] = useState(1);
  const [setupData, setSetupData] = useState({
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    numberOfDays: 5,
    budgetLevel: "mid" as "budget" | "mid" | "luxury",
    travelStyle: "balanced" as "relaxed" | "balanced" | "intensive",
    totalBudget: 500,
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("travellens-trip", JSON.stringify(trip));
  }, [trip]);

  useEffect(() => {
    localStorage.setItem("travellens-expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Calculate spent from expenses
  useEffect(() => {
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    if (totalSpent !== trip.budget.spent) {
      setTrip((prev) => ({
        ...prev,
        budget: { ...prev.budget, spent: totalSpent },
      }));
    }
  }, [expenses]);

  // Update budget estimate when settings change
  useEffect(() => {
    if (setupData.destination && setupData.numberOfDays) {
      const estimate = getBudgetEstimate(
        setupData.destination,
        setupData.numberOfDays,
        setupData.budgetLevel
      );
      setSetupData(prev => ({
        ...prev,
        totalBudget: Math.round((estimate.min + estimate.max) / 2),
      }));
    }
  }, [setupData.destination, setupData.numberOfDays, setupData.budgetLevel]);

  const handleGenerateTrip = () => {
    if (!setupData.destination) {
      toast.error("Please select a destination");
      return;
    }

    setIsGenerating(true);

    // Calculate dates based on number of days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // Start a week from now
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + setupData.numberOfDays - 1);

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Simulate AI processing
    setTimeout(() => {
      const result = generateSmartItinerary(
        setupData.destination,
        setupData.numberOfDays,
        setupData.budgetLevel,
        setupData.travelStyle
      );

      // Create trip days with generated places
      const days: TripDay[] = result.days.map((dayData, index) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + index);
        
        return {
          id: generateId(),
          date: date.toISOString().split("T")[0],
          places: dayData.places.map(place => ({
            id: generateId(),
            name: place.name,
            type: place.type,
            time: place.time,
            duration: place.duration,
            cost: place.cost,
            notes: place.notes,
            coordinates: place.coordinates,
          })),
        };
      });

      // Generate packing list
      const packingList: PackingItem[] = result.packingSuggestions.map(item => ({
        id: generateId(),
        name: item,
        category: "Essentials",
        packed: false,
      }));

      // Get destination name
      const destName = destinations.find(d => d.id === setupData.destination)?.name || setupData.destination;

      setTrip({
        id: generateId(),
        name: `${setupData.numberOfDays}-Day ${destName} Adventure`,
        destination: setupData.destination,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        days,
        budget: {
          total: setupData.totalBudget,
          spent: 0,
          currency: "USD",
        },
        packingList,
        notes: `## Travel Tips\n\n${result.tips.map(tip => `- ${tip}`).join("\n")}\n\n## Estimated Budget Breakdown\n\n- Accommodation: $${result.estimatedBudget.accommodation}\n- Food: $${result.estimatedBudget.food}\n- Activities: $${result.estimatedBudget.activities}\n- Transport: $${result.estimatedBudget.transport}\n\n**Total Estimate: $${result.estimatedBudget.total}**`,
        collaborators: [],
      });

      setIsGenerating(false);
      setShowSetup(false);
      toast.success(`Generated your ${setupData.numberOfDays}-day itinerary!`, {
        description: `Budget: $${result.estimatedBudget.total} | Style: ${setupData.travelStyle}`,
      });
    }, 2000);
  };

  const handleManualCreate = () => {
    if (!setupData.destination || !setupData.startDate || !setupData.endDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const start = new Date(setupData.startDate);
    const end = new Date(setupData.endDate);
    const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const days: TripDay[] = [];
    for (let i = 0; i < dayCount; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      days.push({
        id: generateId(),
        date: date.toISOString().split("T")[0],
        places: [],
      });
    }

    const destName = destinations.find(d => d.id === setupData.destination)?.name || setupData.destination;

    setTrip({
      ...getDefaultTrip(),
      name: `${destName} Trip`,
      destination: setupData.destination,
      startDate: setupData.startDate,
      endDate: setupData.endDate,
      days,
      budget: {
        total: setupData.totalBudget,
        spent: 0,
        currency: "USD",
      },
    });
    setShowSetup(false);
    toast.success("Trip created! Start adding places to visit.");
  };

  const handleRegenerateAI = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const result = generateSmartItinerary(
        trip.destination,
        trip.days.length,
        setupData.budgetLevel,
        setupData.travelStyle
      );

      const updatedDays = trip.days.map((day, index) => ({
        ...day,
        places: result.days[index]?.places.map(place => ({
          id: generateId(),
          name: place.name,
          type: place.type,
          time: place.time,
          duration: place.duration,
          cost: place.cost,
          notes: place.notes,
          coordinates: place.coordinates,
        })) || [],
      }));

      setTrip(prev => ({ ...prev, days: updatedDays }));
      setIsGenerating(false);
      toast.success("Regenerated your itinerary!");
    }, 1500);
  };

  const updateTrip = (updates: Partial<Trip>) => {
    setTrip((prev) => ({ ...prev, ...updates }));
  };

  const addPlaceToDay = (dayId: string) => {
    const newPlace: TripPlace = {
      id: generateId(),
      name: "",
      type: "attraction",
    };
    setTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId ? { ...day, places: [...day.places, newPlace] } : day
      ),
    }));
  };

  const updatePlace = (dayId: string, placeId: string, updates: Partial<TripPlace>) => {
    setTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              places: day.places.map((place) =>
                place.id === placeId ? { ...place, ...updates } : place
              ),
            }
          : day
      ),
    }));
  };

  const removePlace = (dayId: string, placeId: string) => {
    setTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId
          ? { ...day, places: day.places.filter((p) => p.id !== placeId) }
          : day
      ),
    }));
  };

  const reorderPlaces = (dayId: string, startIndex: number, endIndex: number) => {
    setTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) => {
        if (day.id !== dayId) return day;
        const newPlaces = [...day.places];
        const [removed] = newPlaces.splice(startIndex, 1);
        newPlaces.splice(endIndex, 0, removed);
        return { ...day, places: newPlaces };
      }),
    }));
  };

  const addPackingItem = (item: Omit<PackingItem, "id">) => {
    setTrip((prev) => ({
      ...prev,
      packingList: [...prev.packingList, { ...item, id: generateId() }],
    }));
  };

  const togglePackingItem = (id: string) => {
    setTrip((prev) => ({
      ...prev,
      packingList: prev.packingList.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      ),
    }));
  };

  const removePackingItem = (id: string) => {
    setTrip((prev) => ({
      ...prev,
      packingList: prev.packingList.filter((item) => item.id !== id),
    }));
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses((prev) => [...prev, { ...expense, id: generateId() }]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!", {
      description: "Share this link with your travel companions.",
    });
  };

  // Get budget estimate for display
  const budgetEstimate = setupData.destination && setupData.numberOfDays
    ? getBudgetEstimate(setupData.destination, setupData.numberOfDays, setupData.budgetLevel)
    : null;

  if (showSetup) {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Progress indicator */}
        <div className="flex border-b border-border">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "flex-1 py-3 text-center text-sm font-medium transition-colors",
                setupStep === step
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : setupStep > step
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step === 1 && "Destination"}
              {step === 2 && "Duration & Style"}
              {step === 3 && "Budget"}
            </div>
          ))}
        </div>

        <div className="p-6 lg:p-8">
          {/* Step 1: Destination */}
          {setupStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Where do you want to go?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your Nepal destination
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSetupData({ ...setupData, destination: dest.id })}
                    className={cn(
                      "relative overflow-hidden rounded-xl border-2 transition-all p-4 text-left",
                      setupData.destination === dest.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-medium text-foreground">{dest.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{dest.region}</div>
                    {setupData.destination === dest.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setSetupStep(2)}
                  disabled={!setupData.destination}
                  className="gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Duration & Style */}
          {setupStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    How long and how fast?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set your trip duration and pace
                  </p>
                </div>
              </div>

              {/* Number of Days */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">
                  Trip Duration: <span className="text-primary font-bold">{setupData.numberOfDays} days</span>
                </label>
                <Slider
                  value={[setupData.numberOfDays]}
                  onValueChange={(value) => setSetupData({ ...setupData, numberOfDays: value[0] })}
                  min={1}
                  max={14}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Travel Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "relaxed", label: "Relaxed", icon: Coffee, desc: "2-3 activities/day" },
                    { value: "balanced", label: "Balanced", icon: Compass, desc: "3-4 activities/day" },
                    { value: "intensive", label: "Intensive", icon: Zap, desc: "4-5 activities/day" },
                  ].map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setSetupData({ ...setupData, travelStyle: style.value as typeof setupData.travelStyle })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        setupData.travelStyle === style.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <style.icon className={cn(
                        "w-6 h-6",
                        setupData.travelStyle === style.value ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="text-sm font-medium">{style.label}</div>
                      <div className="text-xs text-muted-foreground text-center">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSetupStep(1)} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={() => setSetupStep(3)} className="gap-2">
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {setupStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    What's your budget style?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We'll plan accommodations and activities accordingly
                  </p>
                </div>
              </div>

              {/* Budget Level */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "budget", label: "Budget", desc: "Hostels, local food, shared tours" },
                  { value: "mid", label: "Mid-Range", desc: "3-star hotels, nice restaurants" },
                  { value: "luxury", label: "Luxury", desc: "5-star stays, private guides" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSetupData({ ...setupData, budgetLevel: level.value as typeof setupData.budgetLevel })}
                    className={cn(
                      "flex flex-col gap-2 p-4 rounded-xl border-2 transition-all text-left",
                      setupData.budgetLevel === level.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-sm font-medium">{level.label}</div>
                    <div className="text-xs text-muted-foreground">{level.desc}</div>
                  </button>
                ))}
              </div>

              {/* Budget Estimate */}
              {budgetEstimate && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="text-sm text-muted-foreground mb-2">Estimated Total Budget</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">${budgetEstimate.min}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-3xl font-bold text-primary">${budgetEstimate.max}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{budgetEstimate.perDay}</div>
                </div>
              )}

              {/* Custom Budget Input */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Your Total Budget (USD)
                </label>
                <Input
                  type="number"
                  value={setupData.totalBudget}
                  onChange={(e) => setSetupData({ ...setupData, totalBudget: parseInt(e.target.value) || 0 })}
                  className="bg-secondary border-border"
                  placeholder="Enter your budget"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" onClick={() => setSetupStep(2)} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleGenerateTrip}
                  disabled={isGenerating}
                  className="flex-1 gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Planning your trip...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Generate My {setupData.numberOfDays}-Day Itinerary
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setSetupStep(1);
                    setSetupData(prev => ({ ...prev, startDate: "", endDate: "" }));
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Or plan manually with custom dates
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TripHeader trip={trip} onUpdate={updateTrip} onShare={handleShare} />

      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="w-full justify-start bg-secondary/50 p-1 rounded-xl">
          <TabsTrigger value="itinerary" className="gap-2">
            <List className="w-4 h-4" />
            Itinerary
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <Map className="w-4 h-4" />
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="mt-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Days Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Your Itinerary</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateAI}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? "Regenerating..." : "Regenerate"}
                </Button>
              </div>

              {trip.days.map((day, index) => (
                <div key={day.id} className="space-y-2">
                  <DayPlanner
                    day={day}
                    dayNumber={index + 1}
                    color={dayColors[index % dayColors.length]}
                    onAddPlace={() => addPlaceToDay(day.id)}
                    onSearchPlace={() => setSearchDayId(searchDayId === day.id ? null : day.id)}
                    onUpdatePlace={(placeId, updates) => updatePlace(day.id, placeId, updates)}
                    onRemovePlace={(placeId) => removePlace(day.id, placeId)}
                    onReorderPlaces={(start, end) => reorderPlaces(day.id, start, end)}
                  />
                  {searchDayId === day.id && (
                    <PlaceSearch
                      destinationId={trip.destination}
                      budgetLevel={setupData.budgetLevel}
                      onAddPlace={(place) => {
                        const newPlace: TripPlace = {
                          id: generateId(),
                          name: place.name,
                          type: place.type,
                          duration: place.duration,
                          cost: place.cost,
                          notes: place.notes,
                          coordinates: place.coordinates,
                        };
                        setTrip((prev) => ({
                          ...prev,
                          days: prev.days.map((d) =>
                            d.id === day.id ? { ...d, places: [...d.places, newPlace] } : d
                          ),
                        }));
                        toast.success(`Added "${place.name}" to Day ${index + 1}`);
                      }}
                      onClose={() => setSearchDayId(null)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <BudgetTracker
                budget={trip.budget.total}
                spent={trip.budget.spent}
                currency={trip.budget.currency}
                expenses={expenses}
                onAddExpense={addExpense}
                onRemoveExpense={removeExpense}
                onUpdateBudget={(budget) =>
                  setTrip((prev) => ({
                    ...prev,
                    budget: { ...prev.budget, total: budget },
                  }))
                }
              />
              <PackingList
                items={trip.packingList}
                onAddItem={addPackingItem}
                onToggleItem={togglePackingItem}
                onRemoveItem={removePackingItem}
              />
              <TripNotes
                notes={trip.notes}
                onSave={(notes) => updateTrip({ notes })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <TripMap days={trip.days} />
          <div className="mt-4 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                {trip.days.map((day, index) => (
                  <div
                    key={day.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                    style={{ backgroundColor: `${dayColors[index % dayColors.length]}20` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: dayColors[index % dayColors.length] }}
                    />
                    <span>Day {index + 1}</span>
                    <span className="text-muted-foreground">
                      ({day.places.length} places)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => {
            setShowSetup(true);
            setSetupStep(1);
          }}
          className="text-muted-foreground"
        >
          Start New Trip
        </Button>
      </div>
    </div>
  );
};

export default TravelPlanner;
