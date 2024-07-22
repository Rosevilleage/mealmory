"use client";

import { useState } from "react";
import MealplanForm from "@/components/main/MealplanForm";

export default function MealAddPage() {
  const [selectedType, setSelectedType] = useState(0);
  return (
    <main>
      <MealplanForm
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </main>
  );
}
