"use client";

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
showButton?.addEventListener("click", () => {
  dialog?.showModal();
});
closeButton?.addEventListener("click", () => {
  dialog?.close();
});
dialog?.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();

  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});
