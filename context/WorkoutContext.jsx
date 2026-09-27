"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("plan");
    const storedSaved = localStorage.getItem("saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  const addToPlan = (workout) => {
    const exists = plan.find((item) => item.id === workout.id);

    if (exists) return false;

    if (plan.length >= 5) return "limit";

    setPlan([...plan, workout]);
    return true;
  };

  const addToSaved = (workout) => {
    const exists = saved.find((item) => item.id === workout.id);

    if (exists) return false;

    setSaved([...saved, workout]);
    return true;
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}
