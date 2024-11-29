import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Languages = (props) => {
  const { i18n } = useTranslation();

  const handleChangeLanguages = (language) => {
    i18n.changeLanguage(language);
    console.log(i18n.changeLanguage());
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Tiếng việt" : "English"}
        id="languages"
      >
        <NavDropdown.Item
          onClick={() => {
            handleChangeLanguages("en");
          }}
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            handleChangeLanguages("vi");
          }}
        >
          Tiếng Việt
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Languages;
