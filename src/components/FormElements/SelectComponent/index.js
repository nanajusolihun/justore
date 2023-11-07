export default function SelectComponent({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="relative">
      <p className=" pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-blue-600 bg-white">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-blue-400 focus:outline-none focus:border-2 focus:border-blue-700 w-full py-2.5 px-5 mr-0 mt-0 ml-0 text-base block bg-white border-blue-300 rounded-xl"
      >
        {options && options.length ? (
          options.map((optionItem) => (
            <option
              id={optionItem.id}
              value={optionItem.id}
              key={optionItem.id}
            >
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
}
