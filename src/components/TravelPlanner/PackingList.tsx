import { useState } from "react";
import { Package, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PackingItem } from "./types";
import { cn } from "@/lib/utils";

interface PackingListProps {
  items: PackingItem[];
  onAddItem: (item: Omit<PackingItem, "id">) => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
}

const categories = [
  { value: "clothing", label: "👕 Clothing", items: ["T-shirts", "Pants", "Jacket", "Underwear", "Socks"] },
  { value: "toiletries", label: "🧴 Toiletries", items: ["Toothbrush", "Shampoo", "Sunscreen", "Deodorant"] },
  { value: "electronics", label: "📱 Electronics", items: ["Phone charger", "Camera", "Power bank", "Adapter"] },
  { value: "documents", label: "📄 Documents", items: ["Passport", "Visa", "Insurance", "Tickets"] },
  { value: "essentials", label: "🎒 Essentials", items: ["Wallet", "Keys", "Medications", "Water bottle"] },
  { value: "other", label: "📦 Other", items: [] },
];

const PackingList = ({ items, onAddItem, onToggleItem, onRemoveItem }: PackingListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "essentials" });

  const packedCount = items.filter((item) => item.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      onAddItem({
        name: newItem.name,
        category: newItem.category,
        packed: false,
      });
      setNewItem({ name: "", category: "essentials" });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (itemName: string, category: string) => {
    onAddItem({
      name: itemName,
      category,
      packed: false,
    });
  };

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat.value] = items.filter((item) => item.category === cat.value);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  const getCategoryLabel = (category: string) => {
    return categories.find((c) => c.value === category)?.label || "📦 Other";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Packing List
        </h3>
        <span className="text-sm text-muted-foreground">
          {packedCount}/{items.length} packed
        </span>
      </div>

      {items.length > 0 && (
        <div className="h-1.5 rounded-full bg-secondary mb-4 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
        {Object.entries(groupedItems).map(([category, categoryItems]) => {
          if (categoryItems.length === 0) return null;
          return (
            <div key={category}>
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {getCategoryLabel(category)}
              </div>
              <div className="space-y-1">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 group"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={item.packed}
                        onCheckedChange={() => onToggleItem(item.id)}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          item.packed && "line-through text-muted-foreground"
                        )}
                      >
                        {item.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No items yet</p>
            <p className="text-xs">Add items or use quick suggestions</p>
          </div>
        )}
      </div>

      {/* Quick Add Suggestions */}
      {items.length < 10 && (
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Quick add:</div>
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).flatMap((cat) =>
              cat.items.slice(0, 2).map((item) => (
                <Button
                  key={`${cat.value}-${item}`}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(item, cat.value)}
                  className="h-6 text-xs"
                  disabled={items.some((i) => i.name.toLowerCase() === item.toLowerCase())}
                >
                  + {item}
                </Button>
              ))
            )}
          </div>
        </div>
      )}

      {showAddForm ? (
        <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
          <Input
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            autoFocus
          />
          <Select
            value={newItem.category}
            onValueChange={(value) => setNewItem({ ...newItem, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleAddItem} className="flex-1">
              Add Item
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="w-full gap-2 border-dashed"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      )}
    </div>
  );
};

export default PackingList;
