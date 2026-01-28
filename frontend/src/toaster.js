function showToast(message, type = "success") {
  const toast = document.createElement("div");

  const baseClasses =
    "fixed top-5 right-[-320px] z-50 min-w-[280px] px-4 py-3 rounded-md text-neutral-200 border border-neutral-600 transition-all duration-500 flex items-center justify-between gap-3 bg-neutral-900";

  const typeClasses =
    type === "success" ? "border-green-500" : "border-red-500";

  toast.className = `${baseClasses} ${typeClasses}`;

  // message
  const text = document.createElement("span");
  text.textContent = message;

  // close button (X)
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "✕";
  closeBtn.className =
    "text-neutral-400 hover:text-white transition text-sm font-bold  cursor-pointer";

  toast.appendChild(text);
  toast.appendChild(closeBtn);

  document.body.appendChild(toast);

  // slide in
  setTimeout(() => {
    toast.classList.remove("right-[-320px]");
    toast.classList.add("right-5");
  }, 10);

  // auto close
  const autoClose = setTimeout(() => closeToast(), 3000);

  function closeToast() {
    clearTimeout(autoClose);
    toast.classList.remove("right-5");
    toast.classList.add("right-[-320px]");
    setTimeout(() => toast.remove(), 500);
  }

  closeBtn.addEventListener("click", closeToast);
}

export { showToast };
