const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const audio = document.getElementById("bg-music");

let currentInput = "";
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      currentInput = "";
      display.textContent = "0";
    } else if (value === "Del") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    } else if (value === "=") {
      try {
        let result = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/"));
        display.textContent = result;
        currentInput = result.toString();
        resetNext = true;

        // ⏳ After 3 seconds, play music + show lyrics
        setTimeout(() => {
          playMusicWithLyrics(result);
        }, 1000);

      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else {
      if (resetNext && !isNaN(value)) {
        currentInput = value;
        resetNext = false;
      } else {
        currentInput += value;
      }
      display.textContent = currentInput;
    }
  });
});

// ---- Music + Lyrics ----
const lyrics = [
  { time: 1, text: "Hindi na makalaya " },
  { time: 5, text: " Dinadalaw moko bawat gabi" },
  { time: 10, text: "Wala mang nakikita" },
  { time: 14, text: "Haplos mo'y ramdam pa rin sa dilim" },
  { time: 19, text: "Hindi na nananaginip" },
  { time: 24, text: "Hindi na ma-makagising" },
  { time: 28, text: "Pasindi na ng ilaw" },
];

function playMusicWithLyrics(lastResult) {
  // restart music
  audio.currentTime = 0;
  audio.play();

  // show lyrics on display in sync
  lyrics.forEach(line => {
    setTimeout(() => {
      display.textContent = line.text;
    }, line.time * 1000);
  });

  // restore calculator result after music ends
  audio.onended = () => {
    display.textContent = lastResult;
  };
}
