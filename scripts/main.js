// Select navigation and content elements
const navigation = document.getElementById("navigation");
const content = document.getElementById("content");

let pyodide = null; // Variable to hold the Pyodide instance
let currentPythonCode = ""; // Variable to store the current Python code to execute
let runPythonButton = null; // Reference to the Run button

// Function to initialize Pyodide
async function initializePyodide() {
  if (!pyodide) {
    try {
      pyodide = await loadPyodide(); // Load Pyodide asynchronously
      console.log("Loaded successfully");
      runPythonButton.disabled = false; // Enable the button if Pyodide loads successfully
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      runPythonButton.disabled = true; // Disable the button if Pyodide fails to load
    }
  }
}

// Event listener for DOMContentLoaded to ensure all DOM elements are ready
document.addEventListener("DOMContentLoaded", async () => {
  runPythonButton = document.getElementById("run-python"); // Get the button element

  // Set up the button click handler
  runPythonButton.addEventListener("click", async () => {
    if (!pyodide) {
      console.log("Pyodide is not loaded yet. Attempting to load...");
      await initializePyodide(); // Attempt to initialize Pyodide if not already loaded
    }

    if (!pyodide) {
      console.error("Failed to load Pyodide. Cannot run Python code.");
      return;
    }

    try {
      // Load any required Python packages from the current Python code
      await pyodide.loadPackagesFromImports(currentPythonCode);

      // Set up custom input and logging functions
      pyodide.globals.set("js_custom_input", customInput);
      pyodide.globals.set("js_custom_log", customLog);

      // Run the Python code asynchronously
      await pyodide.runPythonAsync(`
def custom_print(*args, sep=' ', end='\\n'):
    result = sep.join(str(arg) for arg in args)
    js_custom_log(result + end)

def custom_input(prompt):
    return js_custom_input(prompt)

__builtins__.print = custom_print
__builtins__.input = custom_input

${currentPythonCode}
      `);
    } catch (error) {
      console.error("Python execution error:", error);
    }
  });

  // Attempt to initialize Pyodide immediately
  await initializePyodide();

  // Initialize navigation dropdown
  const select = document.createElement("select");
  select.id = "dayDropdown";
  select.className = "day-select";

  for (let i = 1; i <= 51; i++) {
    const option = document.createElement("option");
    option.value = `day${i}`;
    option.textContent = `${i}.diena`;
    select.appendChild(option);
  }

  select.addEventListener("change", function (e) {
    const selectedDay = e.target.value.replace("day", "");
    loadContent(parseInt(selectedDay));

    // Update the URL with the selected day
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("day", selectedDay);
    window.history.pushState({}, "", newUrl);
  });

  navigation.appendChild(select);

  // Check if there's a day parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const dayParam = urlParams.get("day");

  // Load the content based on the URL parameter or default to day 1
  loadContent(dayParam ? parseInt(dayParam) : 1);
});

// Function to create copyable code blocks
function createCopyableCodeBlocks() {
  // console.log("Creating copyable code blocks");
  const codeBlocks = document.querySelectorAll("pre code");
  // console.log(`Found ${codeBlocks.length} code blocks`);
  codeBlocks.forEach((block, index) => {
    // console.log(`Processing code block ${index + 1}`);
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copy";
    wrapper.appendChild(copyButton);

    copyButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(block.textContent)
        .then(() => {
          this.textContent = "Copied!";
          setTimeout(() => {
            this.textContent = "Copy";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });
  });
}

// Function to load content based on the day selected
async function loadContent(day) {
  try {
    // Update the dropdown to match the current day
    const dropdown = document.getElementById("dayDropdown");
    dropdown.value = `day${day}`;

    // Fetch and display markdown content
    const mdResponse = await fetch(
      `content/day${day
        .toString()
        .padStart(2, "0")}.md?cacheBust=${new Date().getTime()}`
    );
    if (!mdResponse.ok) throw new Error("Content not found");
    const markdown = await mdResponse.text();
    content.innerHTML = marked(markdown);
    createCopyableCodeBlocks(); // Add this line to create copyable code blocks

    // Fetch Python code to execute with cache-busting parameter
    const pyResponse = await fetch(
      `python_files/day${day
        .toString()
        .padStart(2, "0")}.py?cacheBust=${new Date().getTime()}`
    );
    if (!pyResponse.ok) throw new Error("Python file not found");
    currentPythonCode = await pyResponse.text();
  } catch (error) {
    console.error("Error loading content:", error);
    content.innerHTML = `<h2>Day ${day}</h2><p>Content not available yet. Error: ${error.message}</p>`;
    currentPythonCode = "";
  }
}

// Function to handle custom input in Python
function customInput(prompt) {
  return window.prompt(prompt);
}

// Function to handle custom logging in Python
function customLog(message) {
  console.log(message);
}
