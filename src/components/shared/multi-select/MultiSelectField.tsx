import { Badge } from "@/components/ui/badge"; // Make sure you have this shadcn component, or use a simple div
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils"; // standard shadcn util
import { useState } from "react";

// --- CONSTANTS (Match your Prisma Enums) ---
export const LANGUAGES = ["ENGLISH", "BANGLA", "HINDI", "ARABIC"];
export const CATEGORIES = ["ADVENTURE", "CULTURAL", "FOOD", "NATURE"];

// --- HELPER COMPONENT: Multi-Select Badges ---
export const MultiSelectField = ({
  label,
  name,
  options,
  defaultValues = [],
}: {
  label: string;
  name: string;
  options: string[];
  defaultValues?: string[];
}) => {
  const [selected, setSelected] = useState<string[]>(defaultValues);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={cn(
                "cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-muted-foreground border-input hover:border-primary hover:text-primary"
              )}
            >
              {option}
            </div>
          );
        })}
      </div>
      
      {/* 🔥 TRICK: This generates a hidden input for EACH selected item.
         FormData will treat 'languages' as an array if multiple inputs exist with the same name.
         Example: languages=ENGLISH, languages=HINDI
      */}
      {selected.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}
    </Field>
  );
};