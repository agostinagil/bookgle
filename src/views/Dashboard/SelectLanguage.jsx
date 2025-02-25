/* eslint-disable react/prop-types */
import languages from "../../../languages.json";

const SelectLanguage = ({ setLanguage }) => {
  const handleSelect = (e) => setLanguage(e.target.value);

  return (
    <div className="flex justify-center">
      <select
        defaultValue=""
        className="p-2 rounded text-second-color ring-1 ring-main-color border-none focus:outline-none"
        onChange={handleSelect}
      >
        <option value="" disabled selected>
          Select language
        </option>
        {languages.map(({ code, name, flag }) => (
          <option key={code} value={code}>
            {name} {flag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
