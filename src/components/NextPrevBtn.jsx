/* eslint-disable react/prop-types */
const NextPrevBtn = ({ content, action, dis }) => {
  return (
    <button
      onClick={action}
      className="bg-main-color py-1 px-2 w-14 text-sm mx-4 text-white border-second-color transition-all duration-200 hover:border-fourth-color hover:font-semibold disabled:hidden"
      disabled={dis}
    >
      {content}
    </button>
  );
};

export default NextPrevBtn;
