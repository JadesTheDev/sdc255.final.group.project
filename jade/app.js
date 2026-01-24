// SDC255 "C app" terminal demo (browser simulation)
// - Menu (5 options)
// - Option selector routes to calcs/file IO
// - File I/O simulated with localStorage

const output = document.getElementById("output");
const form = document.getElementById("promptForm");
const input = document.getElementById("input");
const repoLink = document.getElementById("repoLink");

// OPTIONAL: set this to your repo URL
repoLink.href = "https://github.com/JadesTheDev/sdc255.final.group.project";

const STATE = {
  mode: "MENU",            // MENU | CALC1_A | CALC1_B | CALC2_A | CALC2_B | WRITE | READ | EXIT
  temp: {},
};

function print(text = "") {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}

function banner() {
  print("SDC255 Final Group Project — Interactive Terminal Demo");
  print("Type 'menu' anytime to show the options.");
  print("Type 'help' for commands.");
  print("");
}

function showMenu() {
  STATE.mode = "MENU";
  STATE.temp = {};
  print("===== MENU =====");
  print("1) Calculation 1 (Add two integers)");
  print("2) Calculation 2 (Multiply two integers)");
  print("3) Write to File (simulated)");
  print("4) Read from File (simulated)");
  print("5) Exit");
  print("Choose an option (1-5):");
}

// "Calculations module"
function firstCalculation(a, b) {
  return a + b;
}
function secondCalculation(a, b) {
  return a * b;
}

// "File I/O module" (simulated)
const FILE_KEY = "sdc255_demo_file";

function writeFileSim(text) {
  localStorage.setItem(FILE_KEY, text);
  return true;
}
function readFileSim() {
  return localStorage.getItem(FILE_KEY);
}

// Option selector routing (like your optionSelector.c mainLoop)
function routeOption(option) {
  switch (option) {
    case 1:
      STATE.mode = "CALC1_A";
      print("Calculation 1 selected.");
      print("Enter first integer:");
      break;
    case 2:
      STATE.mode = "CALC2_A";
      print("Calculation 2 selected.");
      print("Enter first integer:");
      break;
    case 3:
      STATE.mode = "WRITE";
      print("Write to File selected.");
      print("Type the text you want to save:");
      break;
    case 4:
      STATE.mode = "READ";
      const content = readFileSim();
      print("Read from File selected.");
      if (content === null) {
        print("No saved file found yet. Use option 3 to write first.");
      } else {
        print("---- FILE CONTENTS ----");
        print(content);
        print("-----------------------");
      }
      print("");
      showMenu();
      break;
    case 5:
      STATE.mode = "EXIT";
      print("Exiting... (in the real C program, main would return 0)");
      print("Refresh the page to restart.");
      break;
    default:
      print("Invalid option. Choose 1-5.");
      break;
  }
}

function parseIntStrict(s) {
  // Allows leading/trailing spaces, but no junk characters.
  const trimmed = String(s).trim();
  if (!/^[-+]?\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  if (!Number.isSafeInteger(n)) return null;
  return n;
}

function handleLine(lineRaw) {
  const line = String(lineRaw).trim();

  if (!line) return;

  // Global commands
  if (line.toLowerCase() === "clear") {
    output.textContent = "";
    banner();
    showMenu();
    return;
  }
  if (line.toLowerCase() === "help") {
    print("Commands:");
    print("- menu  : show the main menu");
    print("- clear : clear the screen");
    print("- help  : show this help");
    print("");
    return;
  }
  if (line.toLowerCase() === "menu") {
    showMenu();
    return;
  }

  // State machine
  if (STATE.mode === "MENU") {
    const opt = parseIntStrict(line);
    if (opt === null) {
      print("Please enter a number from 1 to 5.");
      return;
    }
    routeOption(opt);
    return;
  }

  if (STATE.mode === "CALC1_A") {
    const a = parseIntStrict(line);
    if (a === null) { print("Enter a valid integer:"); return; }
    STATE.temp.a = a;
    STATE.mode = "CALC1_B";
    print("Enter second integer:");
    return;
  }

  if (STATE.mode === "CALC1_B") {
    const b = parseIntStrict(line);
    if (b === null) { print("Enter a valid integer:"); return; }
    const result = firstCalculation(STATE.temp.a, b);
    print(`Result: ${STATE.temp.a} + ${b} = ${result}`);
    print("");
    showMenu();
    return;
  }

  if (STATE.mode === "CALC2_A") {
    const a = parseIntStrict(line);
    if (a === null) { print("Enter a valid integer:"); return; }
    STATE.temp.a = a;
    STATE.mode = "CALC2_B";
    print("Enter second integer:");
    return;
  }

  if (STATE.mode === "CALC2_B") {
    const b = parseIntStrict(line);
    if (b === null) { print("Enter a valid integer:"); return; }
    const result = secondCalculation(STATE.temp.a, b);
    print(`Result: ${STATE.temp.a} * ${b} = ${result}`);
    print("");
    showMenu();
    return;
  }

  if (STATE.mode === "WRITE") {
    const ok = writeFileSim(line);
    if (ok) {
      print("Saved. (Simulated writeFile())");
    } else {
      print("Failed to save.");
    }
    print("");
    showMenu();
    return;
  }

  if (STATE.mode === "EXIT") {
    print("Program already exited. Refresh to restart.");
    return;
  }

  // Fallback
  print("Unhandled state. Type 'menu' to recover.");
}

// Boot
banner();
showMenu();

// Input handling
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  input.value = "";

  // echo input like a terminal
  print(`> ${value}`);
  handleLine(value);
});
