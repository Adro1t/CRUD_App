import { useState } from "react";
import { useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import UpdateForm from "./components/UpdateForm";
import { Link } from "react-router-dom";

function Home() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [min, setMin] = useState(0);
  const selected = entries.find((entry) => entry.id === selectedEntry);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries"));
    if (storedEntries) {
      setEntries(storedEntries);
    }
    setSelectedEntry(null);
  }, []);

  const addEntry = (entry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

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
    <div className="bg-[#DEDDDD] h-auto flex items-center justify-center flex-col">
      <h1 className="text-[#843E71] font-medium text-3xl py-14">
        Personal Information
      </h1>
      <Form addEntry={addEntry} />

      <div className="w-4/5">
        <Table
          data={entries}
          deleteEntry={deleteEntry}
          onUpdate={updateEntry}
          onSelect={setSelectedEntry}
          selectedEntry={selectedEntry}
          min={min}
          setMin={setMin}
        />
      </div>
      <Link
        to="profiles"
        className="bg-[#843E71] text-white rounded-md py-3 px-7 text-lg mx-10 disabled:bg-slate-600 my-20"
      >
        GO TO PROFILES
      </Link>
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

export default Home;
