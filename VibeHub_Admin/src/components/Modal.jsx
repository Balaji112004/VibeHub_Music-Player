import React from "react";

function Modal({ children, close }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[400px]">
        <button
          className="float-right text-red-500"
          onClick={close}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
