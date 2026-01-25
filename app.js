// app.js - simple repo file viewer + path checker for GitHub Pages

const FILES = [
  "main.c",
  "menu.c",
  "menu.h",
  "optionSelector.c",
  "optionSelector.h",
  "calculations.c",
  "calculations.h",
  "fileIO.c",
  "fileIO.h",
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
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizePath(path) {
  return new URL(path, document.baseURI).toString();
}

async function checkFile(path) {
  const url = normalizePath(path);

  try {
    const head = await fetch(url, { method: "HEAD" });
    if (head.ok) return true;
  } catch {}

  try {
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

async function loadFile(path) {
  const url = normalizePath(path);
  const res = await fetch(url);
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
      elViewer.innerHTML = escapeHtml(
        `This file path did not load.\n\n` +
          `Expected location:\n` +
          `  ${normalizePath(path)}\n\n` +
          `Fix checklist:\n` +
          `- File exists at that exact path\n` +
          `- Capitalization matches exactly (Pages is case-sensitive)\n` +
          `- You pushed/committed the file\n`
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

// ------------------------------
// Test Terminal (JS Harness)
// Mirrors calculations.c behavior for GitHub Pages
// ------------------------------
const elA = document.getElementById("numA");
const elB = document.getElementById("numB");
const elTerm = document.getElementById("terminalOut");

const btnCalc1 = document.getElementById("btnCalc1");
const btnCalc2 = document.getElementById("btnCalc2");
const btnMenuSim = document.getElementById("btnMenuSim");
const btnClearTerminal = document.getElementById("btnClearTerminal");

function termWrite(line = "") {
  if (!elTerm) return;
  elTerm.textContent += (elTerm.textContent ? "\n" : "") + line;
  elTerm.parentElement.scrollTop = elTerm.parentElement.scrollHeight;
}

function termReset(msg = "Terminal ready…") {
  if (!elTerm) return;
  elTerm.textContent = msg;
}

function readNums() {
  const a = Number(elA?.value);
  const b = Number(elB?.value);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return null;
  }
  return { a, b };
}

function firstCalculationJS(a, b) {
  const result = a + b;
  termWrite("[First Calculation]");
  termWrite(`${a} + ${b} = ${result}`);
  termWrite();
}

function secondCalculationJS(a, b) {
  const result = a * b;
  termWrite("[Second Calculation]");
  termWrite(`${a} * ${b} = ${result}`);
  termWrite();
}

if (btnClearTerminal) {
  btnClearTerminal.addEventListener("click", () => termReset());
}

if (btnCalc1) {
  btnCalc1.addEventListener("click", () => {
    const nums = readNums();
    if (!nums) {
      termWrite("❌ Enter valid numbers for A and B first.");
      return;
    }
    firstCalculationJS(nums.a, nums.b);
  });
}

if (btnCalc2) {
  btnCalc2.addEventListener("click", () => {
    const nums = readNums();
    if (!nums) {
      termWrite("❌ Enter valid numbers for A and B first.");
      return;
    }
    secondCalculationJS(nums.a, nums.b);
  });
}

if (btnMenuSim) {
  btnMenuSim.addEventListener("click", () => {
    const nums = readNums();
    if (!nums) {
      termWrite("❌ Enter valid numbers for A and B first.");
      return;
    }

    termWrite("==== Main Menu ====");
    termWrite("1. First Calculation");
    termWrite("2. Second Calculation");
    termWrite("5. Exit");
    termWrite("===================");
    termWrite("Simulating: option 1 then option 2 then exit…");
    termWrite();

    firstCalculationJS(nums.a, nums.b);
    secondCalculationJS(nums.a, nums.b);
    termWrite("Exiting (simulated). ✅");
  });
}
