"use client";

import CategoriesCard from "./categories-card";
import FrequencyCard from "./frequency-card";
import Summary from "./summary";

function SelectForm() {
  return (
    <form className="grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
      <div>
        <CategoriesCard />
      </div>
      <div className="flex h-full! flex-col justify-between gap-8">
        <FrequencyCard />
        <Summary />
      </div>
    </form>
  );
}

export default SelectForm;
