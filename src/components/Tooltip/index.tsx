"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./tooltip.scss";
type TooltipProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  content: ReactNode | string;
  position?: "top" | "right" | "bottom" | "left";
};

const Tooltip = (props: TooltipProps) => {
  const { content, position = "top", targetRef } = props;
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const firstTimeVisit = window.localStorage.getItem("firstTimeVisit");
    setVisible(JSON.parse(firstTimeVisit ?? "true"));
  }, []);

  const handleClose = () => {
    localStorage.setItem("firstTimeVisit", "false");
    setVisible(false);
  };

  useEffect(() => {
    if (targetRef.current && visible) {
      const rect = targetRef.current.getBoundingClientRect();

      const tooltipStyles: { [key: string]: React.CSSProperties } = {
        top: {
          left: rect.left + rect.width / 2,
          top: rect.top - 8,
          transform: "translate(-50%, -100%)",
        },
        right: {
          left: rect.right + 8,
          top: rect.top + rect.height / 2,
          transform: "translate(0, -50%)",
        },
        bottom: {
          right: rect.width / 2,
          top: rect.bottom + 4,
          transform: "translate(-50%, 0)",
        },
        left: {
          left: rect.left - 8,
          top: rect.top + rect.height / 2,
          transform: "translate(-100%, -50%)",
        },
      };

      setStyle({
        ...tooltipStyles[position],
      });
    }
  }, [targetRef, visible, position]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className={`tooltip-wrapper__box tooltip-${position}`} style={style} onClick={handleClose}>
      <div className='tooltip-wrapper__box__close'>
        <div className='tooltip-wraper__box__close-salut'>Hola</div>
        <div className='tooltip-wraper__box__close-icon'>X</div>
      </div>
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;
