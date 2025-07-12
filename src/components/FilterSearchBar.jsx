export default function FilterSearchBar({ filters, setFilters }) {
  const handleStatusChange = (e) => setFilters({ ...filters, status: e.target.value, page: 1 });
  const handleSearchChange = (e) => setFilters({ ...filters, search: e.target.value, page: 1 });

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <select
        className="form-select w-auto"
        value={filters.status}
        onChange={handleStatusChange}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="text"
        placeholder="Search by title..."
        className="form-control w-50"
        value={filters.search}
        onChange={handleSearchChange}
      />
    </div>
  );
}