import CloseIcon from "@mui/icons-material/Close";

export default function Searchbar({ searchOpen, setSearchOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-20 bg-[#ede8d0] flex items-center gap-2 px-6 z-60
        transition-transform duration-300 transform
        ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
    >
      <input
        type="text"
        placeholder="Search coffee..."
        className="flex-1 px-4 py-2 rounded-2xl outline-none border-2 border-orange-950"
        autoFocus
      />

      <button onClick={() => setSearchOpen(false)}>
        <CloseIcon fontSize="large" />
      </button>
    </div>
  );
}
