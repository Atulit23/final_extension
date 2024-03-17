let allResults = localStorage.getItem(window.location.href + "further")
  ? JSON.parse(localStorage.getItem(window.location.href + "further"))
  : { current_url: window.location.href };

setInterval(() => {
  allResults["current_url"] = window.location.href;
}, 100);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "capture") {
    sendResponse({ action: "capture" });
  }
});

function showCustomPopup(content) {
  const popupHtml = `
    <div id="customPopup${Math.random()}">
      <h1></h1>
      <p>${content}</p>
    </div>
  `;

  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = popupHtml;
  document.body.appendChild(popupContainer);

  popupContainer.style.position = "fixed";
  popupContainer.style.zIndex = "999";
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

  popupContainer.style.position = "fixed";
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

function extractTime(text) {
  const match = text.match(/(\d+)\s*hrs\s*(\d+)\s*mins/);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    return { hours, minutes };
  } else {
    console.log("Invalid format");
    return null;
  }
}

function checkForFalseStock() {
  var labels = document.getElementsByTagName("span");
  var ps = document.getElementsByTagName("p");
  var ds = document.getElementsByTagName("div");
  const regex = /only\s*(\d+|few)\s*(left|left\s*in\s*stock)/i;

  var labelsArray = Array.from(labels);
  var psArray = Array.from(ps);
  var dsArray = Array.from(ds);

  var concatenatedArray = [...labelsArray, ...psArray, ...dsArray];

  if (
    document.getElementById("availability") && window.location.href.includes("amazon")
  ) {
    var h = document.getElementById("availability");
    if (h.innerText.toLowerCase().includes("in stock")) {
      document.getElementById("availability").style.border = "3px solid red"
      if (localStorage.getItem(window.location.href)) {
        if (localStorage.getItem(window.location.href) != h.innerText) {
          allResults["stock_data"] = "Amount of stocks changed!";
          showCustomPopupForSponsored("Amount of stocks changed !");
        } else {
          allResults["stock_data"] = "Amount of stocks did not change! No fake scarcity detected!";
        }
      }
      localStorage.setItem(window.location.href, h.innerText);
    }
  }

  if(window.location.href.includes("flipkart")) {
    var classes = document.getElementsByClassName("_2Tpdn3 _18hQoS")
    var arr_classes = Array.from(classes)
    console.log(classes)
    console.log(arr_classes)
    if(classes) {
      arr_classes.map((item) => {
        if(item.innerText.toLowerCase().includes("left")) {
          item.style.border = "4px solid red"
        }
      })
    }
  }

  if(document.getElementById("mir-layout-DELIVERY_BLOCK") && window.location.href.includes("amazon")) {
    var ele = document.getElementById("mir-layout-DELIVERY_BLOCK")

    if(ele.innerText.toLowerCase().includes('order within')) {
      // alert(ele.innerText.toLowerCase())
      document.getElementById("mir-layout-DELIVERY_BLOCK").style.border = "3px solid red"
      if (localStorage.getItem(window.location.href + 'del')) {
        if (localStorage.getItem(window.location.href + 'del') != ele.innerText) {
          allResults["countdown_data"] = "Countdown is working as expected!";
          // showCustomPopupForSponsored("Amount of stocks changed !");
        } else {
          allResults["countdown_data"] = "Countdown resetted on reload!";
        }
      }
      localStorage.setItem(window.location.href + 'del', ele.innerText);
    }

  }

  for(let i = 0; i < concatenatedArray.length; i++) {
    var innerText = concatenatedArray[i].innerText.toLowerCase()

    if(regex.test(innerText)) {
      if(concatenatedArray[i].children.length === 0) {
        concatenatedArray[i].style.border = "3px solid red"
      }
    }
  }

}

function checkForSponsored() {
  allResults["more_prods"] = [];
  allResults["sponsored_content"] = [];
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
      if (concatenatedArray[i].children.length == 0) {
        concatenatedArray[i].style.border = "4px solid red";
        if (!concatenatedArray[i].id) {
          concatenatedArray[i].setAttribute(
            "id",
            concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString()
          );
        }

        if (allResults["sponsored_content"]) {
          if (concatenatedArray[i].id) {
            allResults["sponsored_content"].push({
              type: "id",
              id: concatenatedArray[i].className
                ? concatenatedArray[i].className + i.toString()
                : i.toString(),
            });
          } else if (concatenatedArray[i].className) {
            allResults["sponsored_content"].push({
              type: "class",
              class: concatenatedArray[i].className,
            });
          }
        } else {
          allResults["sponsored_content"] = [];
          allResults["sponsored_content"].push({
            type: "id",
            id: concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString(),
          });
        }
        // showCustomPopupForSponsored("Sponsored Content Detected!", doesExist);
        doesExist = true;
      } else if (
        concatenatedArray[i].children.length == 1 &&
        (concatenatedArray[i].children[0].tagName == "B" ||
          concatenatedArray[i].children[0].tagName == "SVG")
      ) {
        concatenatedArray[i].style.border = "4px solid red";
        if (!concatenatedArray[i].id) {
          concatenatedArray[i].setAttribute(
            "id",
            concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString()
          );
        }
        if (concatenatedArray[i].id) {
          allResults["sponsored_content"].push({
            type: "id",
            id: concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString(),
          });
        } else if (concatenatedArray[i].className) {
          allResults["sponsored_content"].push({
            type: "class",
            class: concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString(),
          });
        }
      }
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
      labelText.includes("related to") ||
      labelText.includes("related products") ||
      labelText.includes("also bought") ||
      labelText.includes("you may like")
    ) {
      if (concatenatedArray[i].children.length == 0) {
        if (!concatenatedArray[i].id) {
          concatenatedArray[i].setAttribute(
            "id",
            concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString()
          );
        }
        concatenatedArray[i].style.border = "4px solid red";
        if (concatenatedArray[i].id) {
          allResults["more_prods"].push({
            type: "id",
            id: concatenatedArray[i].className
              ? concatenatedArray[i].className + i.toString()
              : i.toString(),
          });
        } else if (concatenatedArray[i].className) {
          allResults["more_prods"].push({
            type: "class",
            class: concatenatedArray[i].className,
          });
        }
      }
    }
  }
}

function checkForSpecificLabel() {
  var labels = document.getElementsByTagName("label");

  for (var i = 0; i < labels.length; i++) {
    var labelText = labels[i].innerText.toLowerCase();

    if (labelText.includes("email or mobile phone number")) {
      allResults["forced_account"] =
        "Only Create Account if you trust this website!";
      showCustomPopup("Alert! Forced Account Creation Detected on Amazon");
      return;
    }
  }
}

function detectMyntra() {
  var telInput = document.querySelector('div.signInContainer');
  if (telInput) {
    // alert("Alert! Forced Account Creation Detected on Myntra");
    allResults["forced_account"] =
      "Only Create Account if you trust this website!";
    showCustomPopup("Alert! Forced Account Creation Detected on Myntra");
    return;
  }
}

function detectsnap() {
  var tInput = document.querySelector("input#username");

  if (tInput) {
    allResults["forced_account"] =
      "Only Create Account if you trust this website!";
    showCustomPopup("Alert! Forced Account Creation Detected. Proceed with caution.");
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

function detecthttps() {
  if (window.location.protocol === "https:") {
    allResults["protocol"] = "Secure connection (HTTPS)";
    console.log("Secure connection (HTTPS)");
  } else {
    allResults["protocol"] = "Insecure connection (HTTP)";
    // alert("Insecure connection (HTTP)");
  }
}

// Check cookies
function checkCookies() {
  const cookies = document.cookie;

  if (cookies) {
    console.log(`Cookies are present: ${cookies}`);

    const isThirdPartyCookie = !document.referrer.includes(
      window.location.hostname
    );

    if (isThirdPartyCookie) {
      allResults["cookies"] =
        "Hmm... Third-party cookies detected! Your data safety is at risk.";
      // alert("Third-party cookies detected! Your data safety is at risk.");
    }
  } else {
    allResults["cookies"] =
      "Hmm... Everything looks fine! No third party cookies found.";
    console.log("No cookies found.");
  }
}

// Amazon
function analyzePrivacyPolicy1() {
  const privacyPolicyUrl =
    "https://www.amazon.in/gp/help/customer/display.html?nodeId=200534380&ref_=footer_privacy";

  fetch(privacyPolicyUrl)
    .then((response) => response.text())
    .then((privacyPolicyText) => {
      const phrasesToDetect = [
        "personal information",
        "tracking",
        "may share with third parties",
        "third-party partners",
        "may sell your data",
        "monetize user information",
        "tracking user behavior",
        "analyzing user interactions",
        "automated decision-making processes",
      ];

      const concerningPhrases = phrasesToDetect.filter((phrase) =>
        privacyPolicyText.includes(phrase)
      );

      if (concerningPhrases.length > 0) {
        allResults["amazon_policy"] =
          "They are not completely transparent about their policies!";

        // alert(
        //   "Privacy policy contains deceptive keywords which may lead to data leaks"
        // );
        console.log(
          "Privacy policy of this website contains deceptive keywords which may lead to data leaks",
          concerningPhrases
        );
      } else {
        allResults["amazon_policy"] = "Privacy policy seems acceptable.";
        console.log("Privacy policy seems acceptable.");
      }
    })
    .catch((error) => {
      console.error("Error fetching privacy policy:", error);
    });
}

// Flipkart
function analyzePrivacyPolicy2() {
  const privacyPolicyUrl =
    "https://www.flipkart.com/pages/privacypolicy?otracker=${otracker}_navlinks";

  fetch(privacyPolicyUrl)
    .then((response) => response.text())
    .then((privacyPolicyText) => {
      const phrasesToDetect = [
        "personal information",
        "tracking",
        "may share with third parties",
        "third-party partners",
        "may sell your data",
        "monetize user information",
        "tracking user behavior",
        "analyzing user interactions",
        "automated decision-making processes",
      ];

      const concerningPhrases = phrasesToDetect.filter((phrase) =>
        privacyPolicyText.includes(phrase)
      );

      if (concerningPhrases.length > 0) {
        allResults["flipkart_policy"] =
          "They are not completely transparent about their policies!";

        // alert(
        //   "Privacy policy contains deceptive keywords which may lead to data leaks"
        // );
        console.log(
          "Privacy policy of this website contains deceptive keywords which may lead to data leaks",
          concerningPhrases
        );
      } else {
        allResults["flipkart_policy"] = "Privacy policy seems acceptable.";
        console.log("Privacy policy seems acceptable.");
      }
    })
    .catch((error) => {
      console.error("Error fetching privacy policy:", error);
    });
}

// // Myntra
function analyzePrivacyPolicy3() {
  const privacyPolicyUrl = "https://www.myntra.com/privacypolicy";

  fetch(privacyPolicyUrl)
    .then((response) => response.text())
    .then((privacyPolicyText) => {
      const phrasesToDetect = [
        "personal information",
        "tracking",
        "may share with third parties",
        "third-party partners",
        "may sell your data",
        "monetize user information",
        "tracking user behavior",
        "analyzing user interactions",
        "automated decision-making processes",
      ];

      const concerningPhrases = phrasesToDetect.filter((phrase) =>
        privacyPolicyText.includes(phrase)
      );

      if (concerningPhrases.length > 0) {
        allResults["myntra_policy"] =
          "Privacy policy contains deceptive keywords which may lead to data leaks";
        // alert(
        //   "Privacy policy contains deceptive keywords which may lead to data leaks"
        // );
        console.log(
          "Privacy policy of this website contains deceptive keywords which may lead to data leaks",
          concerningPhrases
        );
      } else {
        allResults["myntra_policy"] = "Privacy policy seems acceptable.";
        console.log("Privacy policy seems acceptable.");
      }
    })
    .catch((error) => {
      console.error("Error fetching privacy policy:", error);
    });
}

// // Random website 1
function analyzePrivacyPolicy4() {
  const privacyPolicyUrl = "https://www.giznext.com/privacy-policy";

  fetch(privacyPolicyUrl)
    .then((response) => response.text())
    .then((privacyPolicyText) => {
      const phrasesToDetect = [
        "personal information",
        "tracking",
        "may share with third parties",
        "third-party partners",
        "may sell your data",
        "monetize user information",
        "tracking user behavior",
        "analyzing user interactions",
        "automated decision-making processes",
      ];

      const concerningPhrases = phrasesToDetect.filter((phrase) =>
        privacyPolicyText.includes(phrase)
      );

      if (concerningPhrases.length > 0) {
        allResults["giznext_policy"] =
          "Privacy policy contains deceptive keywords which may lead to data leaks.";
        // alert(
        //   "Privacy policy contains deceptive keywords which may lead to data leaks"
        // );
        console.log(
          "Privacy policy of this website contains deceptive keywords which may lead to data leaks",
          concerningPhrases
        );
      } else {
        allResults["giznext_policy"] = "Privacy policy seems acceptable.";
        console.log("Privacy policy seems acceptable.");
      }
    })
    .catch((error) => {
      console.error("Error fetching privacy policy:", error);
    });
}

function analyzePrivacyPolicy5() {
  // alert('Hi')
  const privacyPolicyUrl =
    "https://www.bestsmartphoneunder10000.in/privacy-policy/";

  fetch(privacyPolicyUrl)
    .then((response) => response.text())
    .then((privacyPolicyText) => {
      const phrasesToDetect = [
        "personal information",
        "tracking",
        "may share with third parties",
        "third-party partners",
        "may sell your data",
        "monetize user information",
        "tracking user behavior",
        "analyzing user interactions",
        "automated decision-making processes",
      ];

      const concerningPhrases = phrasesToDetect.filter((phrase) =>
        privacyPolicyText.includes(phrase)
      );

      if (concerningPhrases.length > 0) {
        allResults["bestsmartphoneunder10000"] =
          "Privacy policy contains deceptive keywords which may lead to data leak.";
        // alert(
        //   "Privacy policy contains deceptive keywords which may lead to data leaks"
        // );
        console.log(
          "Privacy policy of this website contains deceptive keywords which may lead to data leaks",
          concerningPhrases
        );
      } else {
        allResults["bestsmartphoneunder10000"] =
          "Privacy policy seems acceptable.";
        console.log("Privacy policy seems acceptable.");
      }
    })
    .catch((error) => {
      console.error("Error fetching privacy policy:", error);
    });
}
// helper function for detectUIDeception
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
    console.log(parentElement, "heyyy");
    return parentElement;
  }

  return null;
}

const detectUIDeception = () => {
  // alert("Detecttion Started");
  const uselessClasses = ["adsbygoogle", "GoogleAdViewElement"];
  const uselessIds = ["google"];
  allResults["ads_with_ids"] = [];
  // allResults["ads_with_classes"] = [];
  let classesWithGoogle = [];
  let idsWithGoogle = [];

  var allElements = document.querySelectorAll("*");

  allElements.forEach(function (element) {
    var classNames = element.classList;
    if (classNames.length > 0) {
      var classListArray = Array.from(classNames);
      var classListString = classListArray.join(" ");
       
      if (classListString.toLowerCase().includes("google") && !classListString.toLowerCase().includes("logo") && !classListString.toLowerCase().includes("googleplus") && !classListString.toLowerCase().includes("icons")) {
        classesWithGoogle.push(classListString);
      }
    }
    var idName = element.id; 
    if (idName.toLowerCase().includes("google") && !idName.toLowerCase().includes("logo") && !idName.toLowerCase().includes("googleplus") && !idName.toLowerCase().includes("icons")) {
      idsWithGoogle.push(idName);
    }
  });

  idsWithGoogle.map((item, index) => {
    if (
      document.getElementById(item).clientHeight &&
      document.getElementById(item).clientHeight > 10
    ) {
      document.getElementById(item).style.border = "3px solid red";
      document.getElementById(item).style.width = "103%";
      document.getElementById(item).style.height = parseInt(document.getElementById(item).style.height.split('px')[0]) + 30
    } else {
      idsWithGoogle.splice(index, 1);
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
          if (!itemsArray[i].id) {
            itemsArray[i].id = item + Math.random().toString();
            idsWithGoogle.push(item + Math.random().toString());
          }
          // itemsArray[i].style.padding = "30px";
          itemsArray[i].style.border = "3px solid red";
          itemsArray[i].style.width = "103%";
          itemsArray[i].style.height = parseInt(itemsArray[i].style.height.split('px')[0]) + 30
        }
      }
    }
  });

  allResults["ads_with_ids"] = idsWithGoogle;
  // allResults["ads_with_classes"] = classesWithGoogle;
};

// helper function for checkTotal
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
        allResults[base + "_total_check"] =
          "Some extra charge has been charged!!";
        // alert("Some extra charge has been charged!!");
      } else {
        allResults[base + "_total_check"] = "No extra charge has been charged!";
        // alert("Everything looks good");
      }
    }
  } else if (window.location.href.includes("flipkart")) {
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
        allResults[base + "_total_check"] =
          "Some extra charge has been charged!!";
        // alert("Some extra charge has been charged!!");
      } else {
        allResults[base + "_total_check"] =
          "Amounts are equal!";
        // alert("Amounts are equal! No one sneaked into ye basket!");
      }
    }
  } else if (window.location.href.includes("ajio")) {
    if (window.location.href.includes("cart")) {
      // alert(base);
      const divs = document.getElementsByTagName("div");
      const secs = document.getElementsByTagName("section");
      let divsArr = Array.from(divs);
      let secsArr = Array.from(secs);

      let completeArr = [...divsArr, ...secsArr];

      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < completeArr.length; i++) {
        var checkOutText = completeArr[i].innerText.toLowerCase();
        if (checkOutText.includes("order total")) {
          arr.push(completeArr[i]);
        }
      }
      arr = arr.reverse();
      console.log(arr);
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

      let completeArr = [...divsArr, ...secsArr];

      let totalELement = null;
      let subtotal = 0;
      let arr = [];

      for (let i = 0; i < completeArr.length; i++) {
        var checkOutText = completeArr[i].innerText.toLowerCase();
        if (checkOutText.includes("order total")) {
          arr.push(completeArr[i]);
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
        allResults[base + "_total_check"] =
          "Some extra charge has been charged!!";
        // alert("Some extra charge has been charged!!");
      } else {
        allResults[base + "_total_check"] =
          "Amounts are equal!";
        // alert("Amounts are equal! No one sneaked into ye basket!");
      }
    }
  }
}

function checkReviews() {
  var url = window.location.href;
  console.log(url);

  if (url.includes("amazon")) {
    if (url.includes("product-review")) {
      let api_url = `https://review-and-ads.vercel.app/review-prediction?url=${url}`;

      fetch(api_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.indices.length > 0) {
            allResults["review_check"] = "Deceptive Reviews detected";
            // alert("Deceptive Reviews detected");
          } else {
            allResults["review_check"] = "No deceptive Reviews detected.";
            // alert("No deceptive Reviews detected.");
          }
          // console.log(document.getElementsByTagName("span"));
          // all_responses["review_result"] = typeof data;
        })
        .catch((error) => {
          // all_responses["review_result"] = error;
        });
    } else if (url.includes("/dp/")) {
      let url_ = url.split("/dp/");
      let newUrl = url_[0] + "/product-review/" + url_[1];
      let api_url_ = `https://review-and-ads.vercel.app/review-prediction?url=${newUrl}`;

      fetch(api_url_)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.indices.length > 0) {
            allResults["review_check"] = "Deceptive Reviews detected";
          } else {
            allResults["review_check"] = "No deceptive Reviews detected.";
          }
        })
        .catch((error) => {
          // all_responses["review_result"] = error;
        });
    }
  }
}

function checkForBillingCycle() {
  if(window.location.href.includes("pricing") || window.location.href.includes("membership") || window.location.href.includes("planform")) {
    const regex = /^(\$?[^\/\d]+[0-9]+(\.[0-9]+)?|[^\d\/]+)\s*(\/|\s*\/\s*)\s*([a-zA-Z]+)$/;
    const timeUnits = ['hour', 'hours', 'minute', 'minutes', 'month', 'week', 'year', 'monthly', 'weekly', 'yearly', 'day', 'daily'];
    const pTags = Array.from(document.getElementsByTagName("p"))
    const divTags = Array.from(document.getElementsByTagName("div"))
    const spanTags = Array.from(document.getElementsByTagName("span"))
    let arr = []

    const concatenatedArray = [...pTags, ...divTags, ...spanTags]

    for(let i = 0; i < concatenatedArray.length; i++) {
      var currentText = concatenatedArray[i].innerText.toLowerCase()
      if(regex.test(currentText) || currentText.includes("monthly price") || currentText.includes("yearly price") || currentText.includes("weekly price")) {
        console.log(currentText)
        allResults['subscription_details'] = 'Billing Cycle is defined clearly!'
        arr.push(concatenatedArray[i])
        // if(concatenatedArray[i].children.length == 0) {
          // concatenatedArray[i].parentElement.style.border = '3px solid red'
          concatenatedArray[i].style.border = '3px solid red'
        // }
      } 
    }

    if(arr.length == 0) {
      allResults['subscription_details'] = 'Billing Cycle is kept hidden!'
    }
  }
}

async function analyseCancellation () {
  var terms_url = ""
  var as = Array.from(document.getElementsByTagName("a"))
  var base = window.location.href.split(".")[1].split(".")[0];
  var base_url = "https://trick-solution.onrender.com"

  for(let i = 0; i < as.length; i++) {
    if(as[i].innerText.toLowerCase().includes("terms")) {
      console.log(as[i].href)
      terms_url = as[i].href
    }
  }

  if(window.location.href.includes("pricing") || window.location.href.includes("membership") || window.location.href.includes("planform") || window.location.href.includes("paywall")) {
    // alert(terms_url)
    if(terms_url === "") {
      allResults["terms"] = "The terms of cancellation are not clear."
      allResults["how_to_cancel"] = "They don't explain you how to cancel your subscription!"
    } else {
        // how to cancel
        fetch(`${base_url}/how-to-cancel?url=${terms_url}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); 
        })
        .then(data => {
          allResults["how_to_cancel"] = data.response
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
        // review terms of cancellation
        fetch(`${base_url}/review-terms-of-cancellation?url=${terms_url}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); 
        })
        .then(data => {
          allResults["terms"] = data.response
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });

      console.log(result.data);
        }
  }
}

const amazonUrl = window.location.href

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function fetchData(url) {
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data;
}

async function getAmazonData() {
  if(amazonUrl.includes("amazon") && (amazonUrl.includes("/dp/") || window.location.href.includes("/gp/"))) {
    // alert(amazonUrl)
    // const response = await fetchData(amazonUrl);
    // const amazonTitle = document.getElementById('productTitle').innerText.trim();
    // const amazonDesc = document.getElementById('feature-bullets').innerText.trim();

    // const flipkartUrl = await getFlipkartUrl(amazonTitle);

    // if (!flipkartUrl) {
    //   return { amazonTitle, amazonDesc, flipkartDesc: '', result: 'Error: Flipkart URL not found' };
    // }

    // const flipkartDesc = await getFlipkartDesc(flipkartUrl);

    // const descriptionToCompare = `First description: ${amazonDesc} Second Description: ${flipkartDesc} As you can see I have provided you with two descriptions. Compare these two descriptions to see if for the same field some different information has been provided. Answer in yes or no.`;

    // // const result = await predictDescription(descriptionToCompare);
    // const result = 'yes';

    // const finalResult = {
    //   Amazon: amazonDesc,
    //   Flipkart: flipkartDesc,
    //   result: result.includes('yes') ? 'Mismatch Detected between the descriptions at Amazon & Flipkart.' : 'No Mismatch Detected between the descriptions at Amazon & Flipkart.',
    // };

    // console.log(amazonUrl);
    // console.log(descriptionToCompare);
    // console.log(finalResult);
    let amazonTitle = "";
  let amazonDesc = "";

  // Fetching data from Amazon
  fetch(amazonUrl)
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extracting data from the Amazon page
    amazonTitle = doc.getElementById('productTitle').innerText.trim();
    amazonDesc = doc.getElementById('feature-bullets').innerText.trim();

    console.log(amazonTitle);
    console.log(amazonDesc);

    // Constructing the Flipkart search URL
    const flipkartSearchUrl = `http://localhost:3000/fetchData?url=${`https://www.flipkart.com/search?q=${amazonTitle.split(' ').slice(0, 6).join('+')}`}`;

    console.log(`https://www.flipkart.com/search?q=${amazonTitle.split(' ').slice(0, 6).join('+')}`)
    console.log(flipkartSearchUrl)

    // Fetching data from the Flipkart search page
    fetch(flipkartSearchUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      console.log(html)
      const doc = parser.parseFromString(html, 'text/html');

      // Extracting Flipkart URL

      let flipkartUrl = '';
      const elements = doc.querySelectorAll('._2rpwqI, ._1fQZEK');
      for (const element of elements) {
        const textContent = element.getAttribute('href');
        if (amazonTitle.toLowerCase().includes(textContent)) {
          flipkartUrl = textContent.startsWith('http') ? textContent : `https://www.flipkart.com${textContent}`;
          break;
        }
      }

      // if (!flipkartUrl) {
      //   throw new Error('Flipkart URL not found');
      // }

      // Fetching data from the Flipkart page

      fetch(flipkartUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extracting Flipkart description

        let flipkartDesc = '';
        const finalElements = doc.querySelectorAll('._2418kt');
        finalElements.forEach(element => {
          flipkartDesc = element.innerText;
        });

        // Constructing the description to compare

        const descriptionToCompare = `First description: ${amazonDesc} Second Description: ${flipkartDesc} As you can see I have provided you with two descriptions. Compare these two descriptions to see if for the same field some different information has been provided. Answer in yes or no.`;

        console.log(descriptionToCompare);
      })
    })
  })
  
}
}



// async function predictDescription(descriptionToCompare) {
//   const clientUrl = "https://atulit23-google-flan-t5.hf.space/predict";
//   const result = await fetch(clientUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ descriptionToCompare }),
//   });

//   return result.json();
// }

async function checkForMisleadingInfo () {
  // alert(window.location.href)
  // allResults["mislead"] = 'No misleading information was found!'
  if(window.location.href.includes("amazon") && window.location.href.includes("/dp/")) {
    fetch(`http://127.0.0.1:5000/compare_descriptions?amazon_url=${window.location.href}`)
    .then(response => {
      return response.json()
    })
    .then((text) => {
      console.log(text)
      allResults["mislead"] = text.result
    })
  }
}

async function checkForPhishing () {
  await fetch(`https://additional-features-y6jv.onrender.com/phishing?url=${window.location.href}`)
  .then(resposne => resposne.json())
  .then(result => {
    if(result.result === "Safe") {
      allResults["phishing"] = "URL of this website is legitimate. Website is safe."
    } else {
      allResults["phishing"] = "The URL of this website seems to be phishing. Website is not safe. Exercise caution."
    }
  })
  .catch(err => {
    console.log(err)
  })
}

async function checkAIGenImages () {
  const images = Array.from(document.getElementsByTagName("img")).slice(0, 12)
  let includesFake = []
  
  for (let i = 0; i < images.length; i++) {
    await fetch(`https://additional-features-y6jv.onrender.com/ai-image?url=${images[i].src}`)
    .then(resposne => resposne.json())
    .then(result => {
      console.log(result)
      if(result.Fake > result.Real) {
        includesFake.push(true)
      } else {
        includesFake.push(false)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  if(includesFake.includes(true)) {
    allResults["ai_image"] = "AI Generated images were detected!"
  } else {
    allResults["ai_image"] = "AI Generated images were not detected!"
  }
}

async function storeData () {
  setTimeout(async () => {
    await fetch('https://url-mongo.vercel.app/add-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allResults), 
    })
  }, 15000)
}

window.addEventListener("load", checkReviews);
window.addEventListener("load", analyseCancellation);
window.addEventListener("load", checkForMisleadingInfo);
window.addEventListener("load" , analyzePrivacyPolicy1);
window.addEventListener("load" , analyzePrivacyPolicy2);
window.addEventListener("load" , analyzePrivacyPolicy3);
window.addEventListener("load" , analyzePrivacyPolicy4);
window.addEventListener("load" , analyzePrivacyPolicy5);
window.addEventListener("load" , checkForPhishing);
window.addEventListener("load" , storeData);
window.addEventListener("load" , checkAIGenImages);

function sendMessageToBackground(message) {
  chrome.runtime.sendMessage(message);
}

function checkForMisleading () {
  const apiUrl = 'http://127.0.0.1:5000/api/scrape';
  const urlToScrape =  window.location.href;

  if(urlToScrape.includes("?")) {
    urlToScrape = urlToScrape.split("?")
    urlToScrape = urlToScrape[0]
  }

  const payload = {
    url: urlToScrape
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error Came')
        throw new Error(`Error: ${response.statusText}`);
      }
    })
    .then(result => {
      console.log("Product Title:", result.result);
      // console.log("Product Description:", result.description);
      alert(result.result)
      if(result.result === false) {
        allResults['mislead'] = 'Other websites are showing different description for this product!'
      }
    })
    .catch(error => {
      alert(error)
      console.error(error);
    });
}

window.onload = () => {
  let init = setInterval(() => {
    detectUIDeception();
    detectsnap();
    detectMyntra();
    checkForSpecificLabel();
    checkForFalseStock();
    checkForSponsored();
    detectBreach();
    checkCookies();
    // checkReviews();
    detecthttps();
    checkForBillingCycle();
    // analyzePrivacyPolicy5()
  }, 1000);
  
  let init_ = setInterval(() => {
    checkTotal();
  }, 1000);

  let count = 0;
  let init__ = setInterval(() => {
    console.log(allResults);
    // showCustomPopup("Scanning Finished! Open our extension to see the results!")
    localStorage.setItem(
      window.location.href + "further",
      JSON.stringify(allResults)
    );
    sendMessageToBackground({
      message: "updateResults",
      allResults: JSON.parse(
        localStorage.getItem(window.location.href + "further")
      ),
    });
  }, 1200);
};

setInterval(() => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "scrollToElement") {
      var elementId = request.elementId;
      var elementToScroll = document.getElementById(elementId);
      // alert(elementId)
      console.log(elementToScroll);
      console.log(elementId);
      if (elementToScroll) {
        document.getElementById(elementId).style.scrollMarginTop = '60px'
        elementToScroll.scrollIntoView({ behavior: "smooth" });
      }
    } else if (request.action === "scrollFromClass") {
      let className = request.className;
      let index = request.index;

      let element = document.getElementsByClassName(className)[index];
      console.log(document.getElementsByClassName(className));
      console.log(index);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}, 100);

setInterval(() => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "scrollToElement_") {
      var elementId = request.elementId_;
      var elementToScroll = document.getElementById(elementId);
      // alert(elementId)
      if (elementToScroll) {
        document.getElementById(elementId).style.scrollMarginTop = '60px'
        elementToScroll.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}, 100);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrollTheFuckingAds") {
    var elementId = request.elementId_;
    var elementToScroll = document.getElementById(elementId);
    // alert(elementId)
    if (elementToScroll) {
      document.getElementById(elementId).style.scrollMarginTop = '60px'
      elementToScroll.scrollIntoView({ behavior: "smooth" });
    }
  }
})

// window.onload = () => {

// }
