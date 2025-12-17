import Steps from "../components/ui/Steps";
import UrlShortner from "../components/ui/UrlShortner";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <UrlShortner />
      <Steps />
    </div>
  );
};

export default Home;
