import React from "react";
import { Modal as BaseModal } from "@mui/base/Modal";
import { IoClose } from "react-icons/io5";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/system";

interface IModal {
  className?: string;
  titleClassName?: string;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export function Modal({
  className,
  titleClassName,
  isOpen = false,
  onClose = () => {},
  title = "",
  children,
}: IModal) {
  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
      className="fixed z-1300 inset-0 flex items-center justify-center"
    >
      <Fade in={isOpen}>
        <div
          className={`rounded-2xl p-6 align-middle shadow-xl transition-all bg-white ${className} `}
        >
          <div
            className={`text-lg font-bryantProMedium leading-6 text-neutralDark relative ${titleClassName}`}
          >
            <div className="mr-7">{title}</div>

            <IoClose
              className="text-2xl absolute top-0 right-0 hover:text-darkBlueText cursor-pointer"
              onClick={onClose}
            />
          </div>

          {children}
        </div>
      </Fade>
    </BaseModal>
  );
}
