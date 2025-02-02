import { createContext, useState, useEffect } from "react";

// Create Context
export const dataContext = createContext();

// Provider Component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null); // Store API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data Function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api"); // Replace with your API endpoint
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setData(result); // Store API response in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <dataContext.Provider value={{ data, setData, fetchData, loading, error }}>
      {children}
    </dataContext.Provider>
  );
};
