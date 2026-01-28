import { showToast } from "./toaster";

const app = document.getElementById("app");
const input = app.querySelector("#youtube-url");
const button = app.querySelector("#convert-button");

const BACKEND_URL = "/download_audio?url=";

let controller = null;
let isLoading = false;

function setLoading() {
  button.innerHTML = "";
  const img = document.createElement("img");
  img.src = "assets/loader.svg";
  img.className = "w-6 h-6 animate-spin";
  img.style.animationDuration = "1.3s";
  button.appendChild(img);

  const span = document.createElement("span");
  span.textContent = "Cancel";
  span.className = "ml-2";
  button.appendChild(span);
}

function resetButton() {
  button.textContent = "convert";

  isLoading = false;
}

button.addEventListener("click", async (e) => {
  e.preventDefault();

  // CANCEL
  if (isLoading && controller) {
    controller.abort();
    showToast("Download cancelled", "info");
    resetButton();
    controller = null;
    return;
  }

  const url = input.value || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  if (
    !url.startsWith("https://www.youtube.com/") ||
    !url.startsWith("www.youtube.com/")
  ) {
    showToast("Invalid YouTube URL format", "error");
    return;
  }

  controller = new AbortController();
  isLoading = true;

  setLoading();

  try {
    const response = await fetch(BACKEND_URL + url, {
      signal: controller.signal,
    });

    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "audio.webm";
    document.body.appendChild(a);
    a.click();
    a.remove();

    showToast("Download completed successfully", "success");
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
      showToast("Download failed", "error");
    }
  } finally {
    controller = null;
    resetButton();
  }
});
