function Filter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Workshop">Workshop</option>
        <option value="Competition">Competition</option>
        <option value="Seminar">Seminar</option>
        <option value="Social">Social</option>
      </select>
    </div>
  );
}

export default Filter;