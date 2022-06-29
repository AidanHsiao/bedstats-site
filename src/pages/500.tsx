import NavBar from "../components/common/NavBar";
import BackgroundImage from "../components/error/BackgroundImage";
import ErrorData from "../components/error/ErrorData";

export default function ServerError() {
  return (
    <div>
      <NavBar headerVisible={true} />
      <BackgroundImage />
      <ErrorData
        number={500}
        label="Server Error"
        description="An exception has occurred on the server. Please try again later, or submit an issue through GitHub."
      />
    </div>
  );
}
