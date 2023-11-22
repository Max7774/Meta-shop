import { Children, PropsWithChildren, cloneElement, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

const Transition = (props: PropsWithChildren<CSSTransitionProps>) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition {...props} nodeRef={nodeRef}>
      <>
        {Children.map(props.children, (child) => {
          // @ts-ignore
          return cloneElement(child, { ref: nodeRef });
        })}
      </>
    </CSSTransition>
  );
};

export default Transition;
