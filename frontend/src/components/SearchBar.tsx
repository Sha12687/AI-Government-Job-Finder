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
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "30px"
      }}
    >
      <input
        type="text"
        placeholder="Search jobs like teacher, railway..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchJobs();
          }
        }}
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "16px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={searchJobs}
        style={{
          padding: "16px 24px",
          fontSize: "16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          minWidth: "120px"
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;