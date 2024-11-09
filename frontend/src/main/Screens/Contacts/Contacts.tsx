import { Helmet } from "react-helmet-async";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import styles from "./Contacts.module.scss";
import Heading from "@UI/Heading";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["contacts-container"]}>
      <Helmet>
        <title>Контакты — Свяжитесь с нами</title>
        <meta
          name="description"
          content="Свяжитесь с нами по телефону, электронной почте или посетите наш офис. Мы всегда рады помочь!"
        />
        <meta
          name="keywords"
          content="контакты, связаться, телефон, электронная почта, адрес, часы работы"
        />
      </Helmet>

      <Heading>Свяжитесь с нами</Heading>

      <div className="flex flex-wrap gap-3">
        <div className={styles["contact-item"]}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h3>Телефон</h3>
            <p>
              <a href="tel:+77072204555">+7 (707) 220-45-55</a>
            </p>
          </div>
        </div>

        <div className={styles["contact-item"]}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h3>Электронная почта</h3>
            <p>
              <a href="mailto:agrozakupkz@gmail.com">agrozakupkz@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
      <Button
        onClick={() => navigate("/claim")}
        className="mt-4 sm:w-1/3 w-full"
        size="lg"
        color="primary"
      >
        Оставить заявку
      </Button>
    </div>
  );
};

export default Contacts;
