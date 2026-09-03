import { EVENT_CATEGORIES } from './eventValidation'

export function SearchFilter({ search, category, onSearchChange, onCategoryChange }) {
  return (
    <div className="controls">
      <input className="search-input" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search events" aria-label="Search events" />
      <select className="filter-select" value={category} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter events by category">
        <option value="All">All categories</option>
        {EVENT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  )
}
