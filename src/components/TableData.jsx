import PropTypes from "prop-types";

TableData.propTypes = {
  entry: PropTypes.object,
  min: PropTypes.number,
  deleteEntry: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  selectedEntry: PropTypes.number,
};

function TableData({
  entry,
  index,
  min,
  deleteEntry,
  onSelect,
  selectedEntry,
}) {
  const {
    id,
    name,
    email,
    phone,
    dob,
    city,
    district,
    province,
    country,
    profilePicture,
  } = entry;
  return (
    <>
      <tr>
        <td>{min ? min + index + 1 : index + 1}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{dob}</td>
        <td>{city}</td>
        <td>{district}</td>
        <td>{province}</td>
        <td>{country}</td>
        <td>
          <img src={profilePicture} alt={name} className="w-52" />
        </td>
        <td>
          <button onClick={() => deleteEntry(id)} className="mx-2">
            Delete
          </button>
          <button
            className="mx-2"
            onClick={() => {
              selectedEntry === id ? onSelect(null) : onSelect(id);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}

export default TableData;
