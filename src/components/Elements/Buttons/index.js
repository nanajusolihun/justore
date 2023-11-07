/* eslint-disable react/prop-types */
const ButtonBG = (props) => {
  
  const { 
    children, 
    variant = "bg-blue-600",
    hover = "hover:bg-blue-700",
    ring = "focus:ring-blue-600",
    type = "button",
    onClick = () => {},
    disabled = "true",     
  } = props;

  return (
    <div>
      <button
        className={`${variant} ${ring} ${hover} disabled:opacity-50 py-2.5 px-5 w-full  inline-flex justify-center items-center gap-2 rounded-xl border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`}
        type={type}
        onClick={() => onClick()}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

const ButtonOL = (props) => {
  const { children, variant = "bg-blue-600", type = "button", onClick = () => {} } = props;

  return (
    <div>
      <button
        className={`${variant} w-full py-2.5 px-5 inline-flex justify-center items-center gap-2 rounded-xl border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-700 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800`}
        type={type}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </div>
  );
};

export { ButtonBG, ButtonOL };
