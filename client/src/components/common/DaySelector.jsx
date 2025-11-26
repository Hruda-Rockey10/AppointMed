import React from "react";

const DaySelector = ({ selectedDays, onChange }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">
        Available Days
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              selectedDays.includes(day)
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
      {selectedDays.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          Selected: {selectedDays.join(", ")}
        </p>
      )}
    </div>
  );
};

export default DaySelector;
