import video_HomePage from "../../acsets/video-Homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t } = useTranslation();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homePage-container">
      <div className="homPage-content">
        <div>{t("HomePage.title1")}</div>
        <div>{t("HomePage.title2")}</div>
        <div>
          {!isAuthenticated ? (
            <button onClick={() => navigate("/login")}>
              {t("HomePage.title3")}
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
