import video_HomePage from "../../acsets/video-Homepage.mp4";
const HomePage = (props) => {
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
          <button>Get started-it's free</button>
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
