const SortBy = () => {
  return (
    <div className="sortBy">
      <select>
        <option value="">Sort by</option>
        <option value="">Date, new to old</option>
        <option value="">Date, old to new</option>
        <option value="">Comment count, high to low</option>
        <option value="">Comment count, low to high</option>
        <option value="">Votes count, high to low</option>
        <option value="">Votes count, low to high</option>
      </select>
    </div>
  );
};

export default SortBy;
