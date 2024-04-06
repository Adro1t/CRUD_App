import PropTypes from "prop-types";
import TableData from "./TableData";

Table.propTypes = {
  deleteEntry: PropTypes.func,
  onSelect: PropTypes.func,
  setMin: PropTypes.func,
  data: PropTypes.array.isRequired,
  selectedEntry: PropTypes.number,
  min: PropTypes.number,
};

export default function Table({
  data,
  deleteEntry,
  min,
  setMin,
  onSelect,
  selectedEntry,
}) {
  if (min !== null) {
    const max = min + 5;

    const filteredData = data.slice(min, max);
    return (
      <div className=" bg-white rounded-md w-full h-auto">
        <table className="text-[#843E71] ">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th>Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, i) => (
              <TableData
                entry={entry}
                index={i}
                key={entry.id}
                min={min}
                deleteEntry={deleteEntry}
                onSelect={onSelect}
                selectedEntry={selectedEntry}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center w-full mb-10">
          <button
            className="bg-[#843E71] text-white rounded-md py-3 px-7 text-lg mx-10 disabled:bg-slate-600"
            onClick={() => setMin(min - 5)}
            disabled={min === 0}
          >
            Previous
          </button>
          <button
            className="bg-[#843E71] text-white rounded-md py-3 px-7 text-lg disabled:bg-slate-600"
            onClick={() => setMin(min + 5)}
            disabled={max >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" bg-white rounded-md w-full h-auto">
        <table className="text-[#843E71] ">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th>Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <TableData
                entry={entry}
                index={i}
                key={entry.id}
                deleteEntry={deleteEntry}
                onSelect={onSelect}
                selectedEntry={selectedEntry}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
