'use client'

import {create} from "zustand";

// Define the state type
type StoreState = {
  spinner: boolean;
  setSpinner: (newSpinner: boolean) => void;
};

// Store
export const useSpinnerStore = create<StoreState>((set) => ({
  spinner: false,
  setSpinner: (newSpinner: boolean) => set({ spinner: newSpinner }),
}));

// Shared Component
export const LoadingSpinner = () => {
  const useSpinner = useSpinnerStore()
  
  return (
    <div>
        {useSpinner.spinner &&
            <div className="w-full h-full fixed top-0 left-0 bg-white opacity-50 z-50">
                <div className="flex justify-center items-center mt-[50vh]">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
            </div>
        }
    </div>
  );
};