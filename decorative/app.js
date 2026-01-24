// app.js - simple repo file viewer + path checker for GitHub Pages

const FILES = [
  // Jade folder
  "jade/main.c",
  "jade/menu.c",
  "jade/menu.h",
  "jade/optionSelector.c",
  "jade/optionSelector.h",

  // Leah folder
  "leah/calculations.c",
  "leah/calculations.h",

  // Noah folder
  "noah/fileIO.c",
  "noah/fileIO.h",
];

const elFileList = document.getElementById("fileList");
const elViewer = document.getElementById("codeViewer");
const elOpenFileName = document.getElementById("openFileName");
const elStatus = document.getElementById("statusText");
const btnReload = document.getElementById("btnReload");
const btnCopy = document.getElementById("btnCopy");

let currentText = "";

btnReload.addEventListener("click", () => init());
btnCopy.addEventListener("click", async () => {
  if (!currentText) return;
  try {
    await navigator.clipboard.writeText(currentText);
    toastStatus("Copied to clipboard ✅");
  } catch {
    toastStatus("Copy failed (browser permissions) ❌");
  }
});

function toastStatus(msg) {
  elStatus.textContent = msg;
  setTimeout(() => (elStatus.textContent = "Ready"), 1400);
}

function escapeHtml(str) {
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function checkFile(path) {
  // We use fetch with HEAD first; if server doesn't allow HEAD, fallback to GET.
  try {
    const head = await fetch(path, { method: "HEAD" });
    if (head.ok) return true;
  } catch {
    // ignore
  }

  try {
    const res = await fetch(path);
    return res.ok;
  } catch {
    return false;
  }
}

async function loadFile(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path} (HTTP ${res.status})`);
  }
  return await res.text();
}

function renderListItem(path, exists) {
  const li = document.createElement("li");
  li.className = "file";
  li.setAttribute("role", "button");
  li.setAttribute("tabindex", "0");

  const name = document.createElement("div");
  name.className = "file__name";
  name.textContent = path;

  const badge = document.createElement("div");
  badge.className = `badge ${exists ? "badge--ok" : "badge--missing"}`;
  badge.textContent = exists ? "OK" : "Missing";

  li.appendChild(name);
  li.appendChild(badge);

  if (exists) {
    li.addEventListener("click", () => open(path));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open(path);
    });
  } else {
    li.addEventListener("click", () => {
      elOpenFileName.textContent = path;
      elViewer.innerHTML =
        escapeHtml(
          `This file path did not load.\n\n` +
          `Fix: Confirm the file exists exactly at:\n` +
          `  /${path}\n\n` +
          `Also check capitalization (GitHub Pages is case-sensitive).`
        );
      currentText = elViewer.textContent;
      toastStatus("Missing path ❌");
    });
  }

  return li;
}

async function open(path) {
  try {
    elStatus.textContent = `Opening ${path}…`;
    const text = await loadFile(path);
    currentText = text;

    elOpenFileName.textContent = path;
    elViewer.innerHTML = escapeHtml(text);
    elStatus.textContent = "Ready";
  } catch (err) {
    elOpenFileName.textContent = path;
    elViewer.innerHTML = escapeHtml(String(err));
    currentText = "";
    toastStatus("Load failed ❌");
  }
}

async function init() {
  elStatus.textContent = "Checking file paths…";
  elFileList.innerHTML = "";
  elOpenFileName.textContent = "Select a file to view";
  elViewer.textContent = "Waiting for file selection…";
  currentText = "";

  // Check all paths and render results
  let okCount = 0;

  for (const path of FILES) {
    const exists = await checkFile(path);
    if (exists) okCount++;
    elFileList.appendChild(renderListItem(path, exists));
  }

  if (okCount === FILES.length) {
    elStatus.textContent = `Ready (all ${okCount}/${FILES.length} found ✅)`;
  } else {
    elStatus.textContent = `Ready (${okCount}/${FILES.length} found — fix missing paths ❌)`;
  }
}

init();
