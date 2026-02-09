import { useState } from "react";
import { StickyNote, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TripNotesProps {
  notes: string;
  onSave: (notes: string) => void;
}

const TripNotes = ({ notes, onSave }: TripNotesProps) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (value: string) => {
    setLocalNotes(value);
    setHasChanges(value !== notes);
  };

  const handleSave = () => {
    onSave(localNotes);
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-primary" />
          Trip Notes
        </h3>
        {hasChanges && (
          <Button size="sm" onClick={handleSave} className="gap-1.5">
            <Save className="w-4 h-4" />
            Save
          </Button>
        )}
      </div>

      <Textarea
        placeholder="Add notes about your trip... tips, reminders, must-see places, cultural customs, etc."
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        className="min-h-[120px] resize-none bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50"
      />

      <div className="mt-3 text-xs text-muted-foreground">
        💡 Tip: Note down local customs, emergency contacts, and phrases in the local language
      </div>
    </div>
  );
};

export default TripNotes;
