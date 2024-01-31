import React, { Fragment, ReactNode } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface ICustomModalProps {
  className?: string;
  titleClassName?: string;
  show?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
}

export default function CustomModal({
  className,
  titleClassName,
  show = false,
  onClose = () => {},
  title = "",
  children,
}: ICustomModalProps) {
  return (
    // <Transition show={show} as="div">
    <Transition show={show} as="div">
      <Dialog as="div" className="relative z-20" onClose={onClose} tabIndex={0}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-darkBlackBackground bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`rounded-2xl p-6 align-middle shadow-xl transition-all bg-white ${className} `}
              >
                <Dialog.Title
                  className={`text-lg font-bryantProMedium leading-6 text-neutral900 relative ${titleClassName}`}
                >
                  <div className="mr-7">{title}</div>
                  <IoClose
                    className="text-2xl absolute top-0 right-0 hover:text-darkBlueText cursor-pointer"
                    onClick={onClose}
                  />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
