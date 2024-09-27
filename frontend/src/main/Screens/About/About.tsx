import Heading from "@UI/Heading";
import { Helmet } from "react-helmet-async";
import styles from "./AboutUs.module.scss";
import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { VERSION } from "@/const/version";
const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>О нас</title>
        <meta
          name="description"
          content="Заказывайте свежие и качественные продукты прямо от фермеров. Натуральные продукты без посредников."
        />
      </Helmet>
      <section>
        <div className={styles["about-us-container"]}>
          <Heading>Свежие продукты от фермеров — прямо к вашему столу</Heading>

          <div className={styles.section}>
            <div className={styles["image-container"]}>
              <Image src="/images/farmers-market.jpg" alt="Фермерский рынок" />
            </div>
            <div className={styles["text-container"]}>
              <p>
                <strong>Кто мы:</strong>
                <br />
                Мы — команда энтузиастов, которая стремится принести лучшие
                фермерские продукты прямо к вашему порогу. Наша цель — сделать
                здоровое и натуральное питание доступным для каждого.
                <br />
                <br />
                <strong>Наша миссия:</strong>
                <br />
                Мы верим в силу свежих и качественных продуктов. Сотрудничая с
                местными фермерами, мы гарантируем, что каждый продукт в вашем
                заказе был выращен с любовью и заботой об окружающей среде.
              </p>
            </div>
          </div>

          <Heading className="text-center">Почему выбирают нас</Heading>

          <div className={styles.advantages}>
            <div className={styles["advantage-card"]}>
              <Image src="/images/freshness.jpg" alt="Свежесть и качество" />
              <h3>Свежесть и качество</h3>
              <p>
                Продукты доставляются прямо с ферм без долгого хранения на
                складах.
              </p>
            </div>
            <div className={styles["advantage-card"]}>
              <Image
                src="/images/support-local.jpg"
                alt="Поддержка местных производителей"
              />
              <h3>Поддержка местных производителей</h3>
              <p>Ваш выбор помогает развивать местное сельское хозяйство.</p>
            </div>
            <div className={styles["advantage-card"]}>
              <Image
                src="/images/ecology.jpg"
                alt="Экологическая ответственность"
              />
              <h3>Экологическая ответственность</h3>
              <p>Мы поощряем использование органических методов выращивания.</p>
            </div>
            <div className={styles["advantage-card"]}>
              <Image src="/images/convenience.jpg" alt="Удобство" />
              <h3>Удобство</h3>
              <p>Простой заказ онлайн и быстрая доставка на дом.</p>
            </div>
          </div>

          <h2 className={styles.subtitle}>Свяжитесь с нами</h2>

          <p className={styles["contact-text"]}>
            Ваше мнение важно для нас! Если у вас есть вопросы, предложения или
            вы просто хотите поделиться отзывом — свяжитесь с нами любым удобным
            способом.
          </p>
          <Button
            size="lg"
            fullWidth
            color="primary"
            onClick={() => navigate("/contacts")}
          >
            Связаться
          </Button>
        </div>
        <span className="text-center text-default-300 font-bold">
          Версия приложения: {VERSION}
        </span>
      </section>
    </>
  );
};

export default About;
