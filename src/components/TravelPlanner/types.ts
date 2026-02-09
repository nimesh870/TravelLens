export interface TripPlace {
  id: string;
  name: string;
  type: "attraction" | "restaurant" | "hotel" | "transport";
  time?: string;
  notes?: string;
  cost?: number;
  duration?: string;
  coordinates?: [number, number];
}

export interface TripDay {
  id: string;
  date: string;
  places: TripPlace[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
  budget: {
    total: number;
    spent: number;
    currency: string;
  };
  packingList: PackingItem[];
  notes: string;
  collaborators: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  packed: boolean;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}
