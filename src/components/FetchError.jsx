/* eslint-disable react/prop-types */
import BackTo from "./BackTo";

const Error = ({ page, error, url }) => {
  return (
    <div className="h-screen pt-20">
      <div className="pt-5">
        <BackTo text={`Back to ${page}`} url={url} />
      </div>

      <div className=" w-screen h-[86.8vh] flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold text-error-color text-center mb-2">
          Ups!
        </h2>
        <h3 className="text-3xl font-semibold text-error-color text-center">
          Something went wrong 😵‍💫
        </h3>
        <p className="text-sm text-center mt-4 px-2">{error.msg}</p>
        <p className="text-xs text-center mt-4 px-2">
          <b className="pr-1">Error:</b>
          {error.e}
        </p>
      </div>
    </div>
  );
};

export default Error;
