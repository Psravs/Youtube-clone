//imporitng react library , useState hookfrom react 
import React from 'react';
import filters from '../data/filters';
import './FilterBar.css';

function FilterBar({ selectedFilter, setSelectedFilter }) {

  //unievrse 2 
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${filter === selectedFilter ? 'active-filter' : ''}`}
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
