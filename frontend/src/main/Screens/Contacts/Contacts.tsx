import { Helmet } from "react-helmet-async";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import styles from "./Contacts.module.scss";

const Contacts = () => {
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

      <h1 className={styles.title}>Свяжитесь с нами</h1>

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

        <div className={styles["contact-item"]}>
          <FaMapMarkerAlt className={styles.icon} />
          <div>
            <h3>Адрес</h3>
            <p>г. Москва, ул. Примерная, д. 1</p>
          </div>
        </div>

        <div className={styles["contact-item"]}>
          <FaClock className={styles.icon} />
          <div>
            <h3>Часы работы</h3>
            <p>Пн-Пт: 9:00 — 18:00</p>
            <p>Сб-Вс: 10:00 — 16:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
