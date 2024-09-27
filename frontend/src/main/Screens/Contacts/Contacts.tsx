import { Helmet } from "react-helmet-async";
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import styles from "./Contacts.module.scss";
import { Divider } from "@nextui-org/react";
import Heading from "@UI/Heading";

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

      <div className="flex flex-row m-[10px] mt-7 sm:mt-20">
        <FaClock className={styles.icon} />
        <div>
          <h3>Часы работы</h3>
          <p>Пн-Вс:</p>
          <p>Принимаются заказы: 9:00 — 13:00</p>
          <p className="text-warning">Ягоды до 9:00</p>
          <Divider className="my-1" />
          <p>Доставка: 13:00 — 20:00</p>
          <p className="text-warning">Ягоды до 13:00</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
