chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "capture") {
    sendResponse({ action: "capture" });
  }
});

function showCustomPopup(content) {
  // alert('HaHa')
  const popupHtml = `
    <div id="customPopup${Math.random()}">
      <h1></h1>
      <p>${content}</p>
    </div>
  `;

  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = popupHtml;
  document.body.appendChild(popupContainer);

  popupContainer.style.position = "absolute";
  popupContainer.style.bottom = "90%";
  popupContainer.style.left = "77%";
  // popupContainer.style.transform = "translateX(-50%)";
  popupContainer.style.display = "flex";
  // popupContainer.style.width = "100%";
  popupContainer.style.backgroundColor = "black";
  popupContainer.style.color = "white";
  popupContainer.style.justifyContent = "center";
  popupContainer.style.alignItems = "center";
  popupContainer.style.height = "65px";
  popupContainer.style.width = "22%";
  popupContainer.style.borderRadius = "0px";
  popupContainer.style.padding = "0.5rem";

  setTimeout(() => {
    popupContainer.style.display = "none";
  }, 3500);
}

function showCustomPopupForSponsored(content, doesExist) {
  // alert('HaHa')
  const popupHtml = `
    <div id="customPopup${Math.random()}">
      <h1></h1>
      <p>${content}</p>
    </div>
  `;

  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = popupHtml;
  document.body.appendChild(popupContainer);

  popupContainer.style.position = "absolute";
  popupContainer.style.zIndex = "999";
  if(doesExist) {
    popupContainer.style.bottom = "80%";
  } else {
    popupContainer.style.bottom = "90%";
  }
  popupContainer.style.left = "77%";
  // popupContainer.style.transform = "translateX(-50%)";
  popupContainer.style.display = "flex";
  // popupContainer.style.width = "100%";
  popupContainer.style.backgroundColor = "black";  
  popupContainer.style.color = "white";
  popupContainer.style.justifyContent = "center";
  popupContainer.style.alignItems = "center";
  popupContainer.style.height = "65px";
  popupContainer.style.width = "22%";
  popupContainer.style.borderRadius = "0px";
  popupContainer.style.padding = "0.5rem";

  setTimeout(() => {
    popupContainer.style.display = "none";
  }, 3500);
}

function checkForFalseStock() {
  var labels = document.getElementsByTagName("span");
  var ps = document.getElementsByTagName("p");

  var labelsArray = Array.from(labels);
  var psArray = Array.from(ps);

  var concatenatedArray = [...labelsArray, ...psArray];
  if (
    document.getElementById("availability") &&
    window.location.href.includes("amazon")
  ) {
    var h = document.getElementById("availability");
    if (h.innerText.includes("left in stock")) {
      if (localStorage.getItem(window.location.href)) {
        if (localStorage.getItem(window.location.href) != h.innerText) {
          showCustomPopupForSponsored("Amount of stocks changed on reload!");
        }
      }
      localStorage.setItem(window.location.href, h.innerText);
    }
  }
}

function checkForSponsored() {
  var labels = document.getElementsByTagName("span");
  var ps = document.getElementsByTagName("p");
  var ds = document.getElementsByTagName("div");
  var h2 = document.getElementsByTagName("h2");

  var labelsArray = Array.from(labels);
  var psArray = Array.from(ps);
  var h2Array = Array.from(h2);
  var d2Array = Array.from(ds);
  let doesExist = false
  var concatenatedArray = [...labelsArray, ...psArray, ...h2Array, ...d2Array];

  for (var i = 0; i < concatenatedArray.length; i++) {
    var labelText = concatenatedArray[i].innerText.toLowerCase();
    if (labelText.includes("sponsored")) {
      // alert("Sponsored Content Detected!")
      showCustomPopupForSponsored("Sponsored Content Detected!", doesExist);
      doesExist = true
      break;
    }
  }

  for (var i = 0; i < concatenatedArray.length; i++) {
    var labelText = concatenatedArray[i].innerText.toLowerCase();
    if (
      labelText.includes("interested in") ||
      labelText.includes("bought together") ||
      labelText.includes("item also viewed") ||
      labelText.includes("buy it with") ||
      labelText.includes("also liked") ||
      labelText.includes("also like")
    ) {
      // alert("They are trying to get you to buy more products!");
      showCustomPopupForSponsored("They are trying to get you to buy more products!", doesExist);
      break;
    }
  }
}

function checkForSpecificLabel() {
  var labels = document.getElementsByTagName("label");

  for (var i = 0; i < labels.length; i++) {
    var labelText = labels[i].innerText.toLowerCase();

    if (labelText.includes("email or mobile phone number")) {
      showCustomPopup("Alert! Forced Account Creation Detected on Amazon");
      return;
    }
  }
}

function detectMyntra() {
  var telInput = document.querySelector('input[type="tel"]');
  if (telInput) {
    showCustomPopup("Alert! Forced Account Creation Detected on Myntra");
    return;
  }
}

function detectsnap() {
  var tInput = document.querySelector("input#username");

  if (tInput) {
    showCustomPopup("Alert! Forced Account Creation Detected on Snapdeal");
  }
}

function detectBreach() {
  var labels = document.getElementsByTagName("span");
  var ps = document.getElementsByTagName("p");
  var ds = document.getElementsByTagName("div");
  var h2 = document.getElementsByTagName("h2");

  var labelsArray = Array.from(labels);
  var psArray = Array.from(ps);
  var h2Array = Array.from(h2);
  var d2Array = Array.from(ds);

  var concatenatedArray = [...labelsArray, ...psArray, ...h2Array, ...d2Array];
  let breachedWords = [
    "No Privacy Policy",
    "Unencrypted Data",
    "No Consent",
    "Unauthorized Sharing",
    "Data Localization Violation",
    "Poor Protection Measures",
    "Lack of Transparency",
    "Data Breaches",
    "Ignoring Information Requests",
    "Violating Regulations",
    "antisocial",
    "nationalism",
  ];
  for (var i = 0; i < concatenatedArray.length; i++) {
    var labelText = concatenatedArray[i].innerText.toLowerCase();
    for (var j = 0; j < breachedWords.length; j++) {
      if (labelText.includes(breachedWords[j].toLowerCase())) {
        showCustomPopupForSponsored("Potential Data Breach Detected!");
      }
    }
  }
}

window.addEventListener("load", detectsnap);
window.addEventListener("load", detectMyntra);
window.addEventListener("load", checkForSpecificLabel);
window.addEventListener("load", checkForFalseStock);
window.addEventListener("load", checkForSponsored);
window.addEventListener("load", detectBreach);