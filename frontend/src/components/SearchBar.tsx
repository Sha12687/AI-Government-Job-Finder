type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  searchJobs: () => void;
};

function SearchBar({
  keyword,
  setKeyword,
  searchJobs
}: Props) {

  return (

    <div
      style={{
     display : "inline-flex",
        gap: "10px",
        marginBottom: "30px"
      }}
    >

  <div className="col-6">
      <input
        type="text"
        placeholder="Search jobs like teacher, railway, police..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
    style={{
    width: "500px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "16px"
  }}
      />
   
</div>
      <button
        onClick={searchJobs}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;