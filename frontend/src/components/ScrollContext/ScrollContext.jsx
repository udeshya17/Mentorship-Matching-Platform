import React, { createContext, useState, useContext } from "react";

// Create a context
const ScrollContext = createContext();

// Context provider component
export const ScrollProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(sectionId);
    }
  };

  return (
    <ScrollContext.Provider value={{ currentSection, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use scroll context
export const useScroll = () => useContext(ScrollContext);
