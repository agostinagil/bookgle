/* eslint-disable react/prop-types */
import BackTo from "./BackTo";

const Error = ({ page }) => {
  return (
    <div className="h-screen pt-20">
      <div className="pt-5">
        <BackTo text={`Back to ${page}`} />
      </div>
      <div className=" w-screen h-[86.8vh] flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-error-color text-center">
          Ups!
        </h2>
        <h3 className="text-2xl font-semibold text-error-color text-center">
          Something went wrong 😵‍💫
        </h3>
      </div>
    </div>
  );
};

export default Error;
