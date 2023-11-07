export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  return (
    <div className="relative">
      <p className=" pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-blue-600 bg-white">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-blue-700 focus:border-2 w-full py-2.5 px-5 mr-0 mt-0 ml-0 text-base block bg-white border-blue-500 rounded-xl"
      />
    </div>
  );
}