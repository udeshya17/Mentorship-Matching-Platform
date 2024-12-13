import React, { useState } from "react";

const FilterForm = ({ onFilterChange, roles, skillsOptions, interestsOptions }) => {
  const [filters, setFilters] = useState({ role: "", skills: [], interests: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: name === "skills" || name === "interests" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters); // Pass selected filters to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role</label>
        <select name="role" onChange={handleChange}>
          <option value="">All</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Skills</label>
        <select name="skills" onChange={handleChange}>
          <option value="">All</option>
          {skillsOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Interests</label>
        <select name="interests" onChange={handleChange}>
          <option value="">All</option>
          {interestsOptions.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
