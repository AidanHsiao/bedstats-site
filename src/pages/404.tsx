import NavBar from "../components/common/NavBar";
import BackgroundImage from "../components/error/BackgroundImage";
import ErrorData from "../components/error/ErrorData";

export default function NotFound() {
  console.log(process.env);

  return (
    <div>
      <NavBar headerVisible={true} />
      <BackgroundImage />
      <ErrorData
        number={404}
        label="Page not found"
        description="The page you were looking for wasn't found. Either check for a misspelling in the URL, or navigate back to a valid page using the Navigation Bar."
      />
    </div>
  );
}
