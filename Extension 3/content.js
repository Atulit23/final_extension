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
  if (doesExist) {
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
  let doesExist = false;
  var concatenatedArray = [...labelsArray, ...psArray, ...h2Array, ...d2Array];

  for (var i = 0; i < concatenatedArray.length; i++) {
    var labelText = concatenatedArray[i].innerText.toLowerCase();
    if (labelText.includes("sponsored")) {
      // alert("Sponsored Content Detected!")
      showCustomPopupForSponsored("Sponsored Content Detected!", doesExist);
      doesExist = true;
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
      labelText.includes("also like") ||
      labelText.includes("promoted")
    ) {
      // alert("They are trying to get you to buy more products!");
      showCustomPopupForSponsored(
        "They are trying to get you to buy more products!",
        doesExist
      );
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

// helper function for detectRandomMotherFucker
function findMainParent(childId) {
  let childElement = document.getElementById(childId);
  let i = 0;
  if (childElement) {
    let parentElement = childElement.parentNode;

    while (parentElement && parentElement.parentNode) {
      if (i <= 3) {
        parentElement = parentElement;
        i++;
      }
    }
    console.log(parentElement, "nigganinja");
    return parentElement;
  }

  return null;
}

const detectRandomMotherFucker = () => {
  // alert("Detecttion Started");
  const uselessClasses = ["adsbygoogle", "GoogleAdViewElement"];
  const uselessIds = ["google"];

  let classesWithGoogle = [];
  let idsWithGoogle = [];

  var allElements = document.querySelectorAll("*");

  allElements.forEach(function (element) {
    var classNames = element.classList;
    if (classNames.length > 0) {
      var classListArray = Array.from(classNames);
      var classListString = classListArray.join(" ");

      if (classListString.toLowerCase().includes("google")) {
        classesWithGoogle.push(classListString);
      }
    }
    var idName = element.id;
    if (idName.toLowerCase().includes("google")) {
      idsWithGoogle.push(idName);
    }
  });

  idsWithGoogle.map((item) => {
    if (
      document.getElementById(item).clientHeight &&
      document.getElementById(item).clientHeight > 10
    ) {
      document.getElementById(item).style.border = "2px solid red";
    }
  });

  classesWithGoogle.forEach((item) => {
    let items = document.getElementsByClassName(item);
    let itemsArray = Array.from(items);

    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].clientHeight && itemsArray[i].firstElementChild) {
        if (
          itemsArray[i].firstElementChild.getAttribute("data-ad-status") !=
          "unfilled"
        ) {
          console.log(window.screenTop);
          // itemsArray[i].style.padding = "30px";
          itemsArray[i].style.border = "2px solid red";
        }
      }
    }
  });
};

function returnCompleteString(arr) {
  let str = "";

  arr.map((item) => {
    str = str + item;
  });

  return str;
}

function checkTotal() {
  let base = window.location.href.split(".")[1].split(".")[0];
  if (window.location.href.includes("amazon")) {
    if (window.location.href.includes("cart")) {
      const divs = document.getElementsByTagName("div");
      let divsArr = Array.from(divs);
      let totalELement = null;
      let subtotal = 0;

      for (let i = 0; i < divsArr.length; i++) {
        var checkOutText = divsArr[i].innerText.toLowerCase();
        if (checkOutText.includes("subtotal")) {
          totalELement = divsArr[i];
        }
      }
      console.log(totalELement);
      const children = totalELement.children;
      const childrenArr = Array.from(children);

      for (let j = 0; j < childrenArr.length; j++) {
        let currentText = childrenArr[j].innerText;
        currentText.trim();
        if (currentText.includes(",")) {
          let currentArr = currentText.split(",");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }

        console.log(parseInt(currentText));
        if (parseInt(currentText) != NaN) {
          subtotal = parseInt(currentText);
        }
      }
      localStorage.setItem(base + "cart", subtotal);
    }
    if (window.location.href.includes("payselect")) {
      console.log(base);
      let totalAmount =
        document.getElementsByClassName("grand-total-price")[0].innerText;
      if (totalAmount.includes("₹")) {
        totalAmount = totalAmount.split("₹")[1];
        totalAmount.trim();
        if (totalAmount.includes(",")) {
          let currentArr = totalAmount.split(",");
          totalAmount = "";
          totalAmount = returnCompleteString(currentArr);
        }
      }

      console.log(totalAmount);
      // alert(parseInt(totalAmount))
      // alert(parseInt(parseInt(localStorage.getItem(base + "cart"))))
      if (
        parseInt(totalAmount) - parseInt(localStorage.getItem(base + "cart")) >
        0
      ) {
        alert('Some extra charge has been charged!!')
      } else {
        alert('Everything looks good')
      }
    }
  } 
  else if (window.location.href.includes("flipkart")) {
    if (window.location.href.includes("cart")) {
      // alert(base);
      const divs = document.getElementsByTagName("div");
      let divsArr = Array.from(divs);
      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < divsArr.length; i++) {
        var checkOutText = divsArr[i].innerText.toLowerCase();
        if (checkOutText.includes("total amount")) {
          // console.log(divsArr[i])
          arr.push(divsArr[i]);
          // totalELement = divsArr[i];
        }
      }
      arr = arr.reverse();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length >= 2) {
          totalELement = arr[i];
          break;
        }
      }
      console.log(totalELement);

      const children = totalELement.children;
      const childrenArr = Array.from(children);

      for (let j = 0; j < childrenArr.length; j++) {
        let currentText = childrenArr[j].innerText;
        console.log(currentText);
        currentText.trim();
        if (currentText.includes(",")) {
          let currentArr = currentText.split(",");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }
        if (currentText.includes("₹")) {
          let currentArr = currentText.split("₹");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }

        console.log(parseInt(currentText));
        if (parseInt(currentText) != NaN) {
          subtotal = parseInt(currentText);
        }
      }
      localStorage.setItem(base + "cart", subtotal);
    }

    if (window.location.href.includes("checkout")) {
      const divs = document.getElementsByTagName("div");
      let divsArr = Array.from(divs);
      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < divsArr.length; i++) {
        var checkOutText = divsArr[i].innerText.toLowerCase();
        if (checkOutText.includes("total payable")) {
          // console.log(divsArr[i])
          arr.push(divsArr[i]);
          // totalELement = divsArr[i];
        }
      }
      arr = arr.reverse();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length >= 2) {
          totalELement = arr[i];
          break;
        }
      }
      console.log(totalELement);

      const children = totalELement.children;
      const childrenArr = Array.from(children);

      for (let j = 0; j < childrenArr.length; j++) {
        let currentText = childrenArr[j].innerText;
        console.log(currentText);
        currentText.trim();
        if (currentText.includes(",")) {
          let currentArr = currentText.split(",");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }
        if (currentText.includes("₹")) {
          let currentArr = currentText.split("₹");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }

        console.log(parseInt(currentText));
        if (parseInt(currentText) != NaN) {
          subtotal = parseInt(currentText);
        }
      }

      if (
        parseInt(subtotal) - parseInt(localStorage.getItem(base + "cart")) >
        0
      ) {
        alert('Some extra charge has been charged!!')
      } else {
        alert("Amounts are equal! No one sneaked into ye basket!")
      }
    }
  }
  else if (window.location.href.includes("ajio")) {
    if (window.location.href.includes("cart")) {
      // alert(base);
      const divs = document.getElementsByTagName("div");
      const secs = document.getElementsByTagName("section");
      let divsArr = Array.from(divs);
      let secsArr = Array.from(secs);

      let completeArr = [...divsArr, ...secsArr]

      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < completeArr.length; i++) {
        var checkOutText = completeArr[i].innerText.toLowerCase();
        if (checkOutText.includes("order total")) {
          // console.log(completeArr[i])
          arr.push(completeArr[i]);
          // totalELement = divsArr[i];
        }
      }
      arr = arr.reverse();
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length >= 2) {
          totalELement = arr[i];
          break;
        }
      }
      console.log(totalELement);

      const children = totalELement.children;
      const childrenArr = Array.from(children);

      for (let j = 0; j < childrenArr.length; j++) {
        let currentText = childrenArr[j].innerText;
        console.log(currentText);
        currentText.trim();
        if (currentText.includes(",")) {
          let currentArr = currentText.split(",");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }
        if (currentText.includes("₹")) {
          let currentArr = currentText.split("₹");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }

        console.log(parseInt(currentText));
        if (parseInt(currentText) != NaN) {
          subtotal = parseInt(currentText);
        }
      }
      localStorage.setItem(base + "cart", subtotal);
    }

    if (window.location.href.includes("shipping")) {
      const divs = document.getElementsByTagName("div");
      const secs = document.getElementsByTagName("section");
      let divsArr = Array.from(divs);
      let secsArr = Array.from(secs);

      let completeArr = [...divsArr, ...secsArr]

      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < completeArr.length; i++) {
        var checkOutText = completeArr[i].innerText.toLowerCase();
        if (checkOutText.includes("order total")) {
          // console.log(completeArr[i])
          arr.push(completeArr[i]);
          // totalELement = divsArr[i];
        }
      }
      arr = arr.reverse();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length >= 2) {
          totalELement = arr[i];
          break;
        }
      }
      console.log(totalELement);

      const children = totalELement.children;
      const childrenArr = Array.from(children);

      for (let j = 0; j < childrenArr.length; j++) {
        let currentText = childrenArr[j].innerText;
        console.log(currentText);
        currentText.trim();
        if (currentText.includes(",")) {
          let currentArr = currentText.split(",");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }
        if (currentText.includes("₹")) {
          let currentArr = currentText.split("₹");
          currentText = "";
          currentText = returnCompleteString(currentArr);
        }

        console.log(parseInt(currentText));
        if (parseInt(currentText) != NaN) {
          subtotal = parseInt(currentText);
        }
      }
      if (
        parseInt(subtotal) - parseInt(localStorage.getItem(base + "cart")) >
        0
      ) {
        alert('Some extra charge has been charged!!')
      } else {
        alert("Amounts are equal! No one sneaked into ye basket!")
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

window.onload = () => {
  let count = 0;
  let init = setInterval(() => {
    detectRandomMotherFucker();
    // count += 1;
    // if (count >= 30) {
    //   clearInterval(init);
    //   alert("Lol");
    // }
  }, 1000);

  let init_ = setInterval(() => {
    checkTotal();
  }, 500);
};