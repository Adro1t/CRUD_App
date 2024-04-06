import { useEffect, useState } from "react";
import Table from "./Table";
import UpdateForm from "./UpdateForm";

function Profiles() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const selected = entries.find((entry) => entry.id === selectedEntry);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries"));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const updateEntry = (entry, id) => {
    const updatedEntries = entries.map((oldEntry) =>
      id === oldEntry.id ? entry : oldEntry
    );
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="min-h-screen h-auto bg-[#DEDDDD]">
      <h1 className="text-[#843E71] font-medium text-5xl text-center underline uppercase py-20">
        Profiles
      </h1>
      <div className="w-4/5 mx-auto">
        <Table
          data={entries}
          deleteEntry={deleteEntry}
          onUpdate={updateEntry}
          onSelect={setSelectedEntry}
          selectedEntry={selectedEntry}
          min={null}
        />
      </div>
      {selectedEntry !== null && (
        <UpdateForm
          onUpdate={updateEntry}
          data={selected}
          setSelectedEntry={setSelectedEntry}
        />
      )}
    </div>
  );
}

export default Profiles;
