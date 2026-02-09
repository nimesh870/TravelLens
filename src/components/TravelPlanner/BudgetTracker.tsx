import { useState } from "react";
import { DollarSign, TrendingUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Expense } from "./types";

interface BudgetTrackerProps {
  budget: number;
  spent: number;
  currency: string;
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, "id">) => void;
  onRemoveExpense: (id: string) => void;
  onUpdateBudget: (budget: number) => void;
}

const expenseCategories = [
  { value: "accommodation", label: "🏨 Accommodation" },
  { value: "food", label: "🍜 Food & Drinks" },
  { value: "transport", label: "🚕 Transport" },
  { value: "activities", label: "🎯 Activities" },
  { value: "shopping", label: "🛍️ Shopping" },
  { value: "other", label: "📦 Other" },
];

const BudgetTracker = ({
  budget,
  spent,
  currency,
  expenses,
  onAddExpense,
  onRemoveExpense,
  onUpdateBudget,
}: BudgetTrackerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "food",
  });

  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const remaining = budget - spent;

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      onAddExpense({
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString(),
      });
      setNewExpense({ description: "", amount: "", category: "food" });
      setShowAddForm(false);
    }
  };

  const getCategoryEmoji = (category: string) => {
    return expenseCategories.find((c) => c.value === category)?.label.split(" ")[0] || "📦";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Budget Tracker
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{currency}</span>
          <Input
            type="number"
            value={budget || ""}
            onChange={(e) => onUpdateBudget(parseFloat(e.target.value) || 0)}
            placeholder="Set budget"
            className="w-28 h-8 text-sm"
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className="font-semibold text-foreground">
            {currency} {spent.toLocaleString()}
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Remaining</span>
          <span className={remaining < 0 ? "text-destructive font-semibold" : "text-primary font-semibold"}>
            {currency} {remaining.toLocaleString()}
          </span>
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 group"
            >
              <div className="flex items-center gap-2">
                <span>{getCategoryEmoji(expense.category)}</span>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {expense.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {currency} {expense.amount}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveExpense(expense.id)}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm ? (
        <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
          <Input
            placeholder="What did you spend on?"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="flex-1"
            />
            <Select
              value={newExpense.category}
              onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddExpense} className="flex-1">
              Add Expense
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
          Add Expense
        </Button>
      )}
    </div>
  );
};

export default BudgetTracker;
