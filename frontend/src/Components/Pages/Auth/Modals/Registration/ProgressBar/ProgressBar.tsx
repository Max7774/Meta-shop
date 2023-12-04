import React, { FC } from "react";
import cn from "clsx";
import styles from "./ProgressBar.module.scss";

const ProgressBar: FC<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ step, setStep }) => {
  return (
    <div className="flex justify-around text-white m-3">
      <div
        className={cn(styles["progress-step"], {
          [styles["active-step"]]: step === 1,
        })}
        onClick={() => setStep(1)}
      >
        Основная информация
      </div>
      <div
        className={cn(styles["progress-step"], {
          [styles["active-step"]]: step === 2,
        })}
        onClick={() => setStep(2)}
      >
        Учетные данные
      </div>
    </div>
  );
};

export default ProgressBar;
