/* eslint-disable react/prop-types */
const NextPrevBtn = ({ content, action, dis }) => {
  return (
    <button
      onClick={action}
      className="disabled:hidden bg-main-color py-1 px-2 w-14 text-sm text-white border-second-color hover:border-fourth-color hover:font-semibold"
      disabled={dis}
    >
      {content}
    </button>
  );
};

export default NextPrevBtn;
