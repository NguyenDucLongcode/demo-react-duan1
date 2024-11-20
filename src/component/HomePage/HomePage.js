import video_HomePage from "../../acsets/video-Homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homePage-container">
      <div className="homPage-content">
        <div>
          <p>Get to know your customers with forms worth filling out</p>
        </div>
        <div>
          <p>
            Collect all the data you need to
            <strong>understand customers</strong>" with forms designed to be
            refreshingly different."
          </p>
        </div>
        <div>
          {!isAuthenticated ? (
            <button onClick={() => navigate("/login")}>
              Get started-it's free
            </button>
          ) : (
            <button onClick={() => navigate("/users")}>Doing Quiz</button>
          )}
        </div>
      </div>
      <div className="homePage-video">
        <video width="320" height="240" autoPlay muted loop>
          <source src={video_HomePage} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
export default HomePage;
