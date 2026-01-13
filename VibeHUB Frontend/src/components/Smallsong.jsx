import React from "react";

function Smallsong({ count, id, poster, title, isLiked, onLike, onSelect }) {
  return (
    <div
      className="flex justify-between items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer mx-5 ml-4"
      onClick={onSelect}
    >
      {/* LEFT: count + image + title */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 w-6 text-center">{count}</span>

        <img src={poster} alt="" className="h-16 w-16 rounded-md" />
        <h2 className="text-white text-lg font-medium ml-2">{title}</h2>
      </div>

      {/* LIKE BUTTON */}
      <button
        className="pr-4"
        onClick={(e) => {
          e.stopPropagation();
          onLike(id);
        }}
      >
        {isLiked ? (
          <i className="bx bxs-heart text-green-500 text-2xl"></i>
        ) : (
          <i className="bx bx-heart text-green-500 text-2xl"></i>
        )}
      </button>
    </div>
  );
}

export default Smallsong;
