import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { setFilter } from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <div>
      <label>
        Find contacts by name
        <input type="text" value={filter} onChange={handleChange} />
      </label>
    </div>
  );
}
