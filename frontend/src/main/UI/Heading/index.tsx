import cn from "clsx";
import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface IHeading {
  className?: string;
  Icon?: IconType;
  onClickIcon?: () => void;
  onClick?: () => void;
}

const Heading: FC<PropsWithChildren<IHeading>> = ({
  className,
  Icon,
  onClickIcon,
  onClick,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn({
        "flex flex-row items-center": !!Icon,
        "hover:cursor-pointer": !!onClick,
      })}
    >
      <h1 className={cn("mb-5 font-semibold text-4xl", className)}>
        {children}
      </h1>
      {Icon && (
        <div className="p-3 mx-4 rounded-lg text-secondary hover:cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out">
          <Icon onClick={onClickIcon} size={24} />
        </div>
      )}
    </div>
  );
};

export default Heading;
