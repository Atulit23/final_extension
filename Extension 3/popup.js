document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("feedback").addEventListener("click", () => {
    document.getElementById("google_form").style.display = "block";
    document.getElementById("rst").style.display = "none";
  });
});

let current = 0
let current1 = 0

let spon_current_0 = 0
let spon_current_1 = 0

let more_0 = 0
let more_1 = 0

window.onload = () => {

  // setInterval(() => {
    let obj = {};
    let previousKeys = [];
    let shouldDelete = false;

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      handleMessage(request);
    });

    function handleMessage(request) {
      if (request.message === "updateResults") {
        const newKeys = Object.keys(request.allResults);

        if (!arraysAreEqual(previousKeys, newKeys)) {
          obj = request.allResults;
          shouldDelete = request.shouldDelete;
          createDivElements();
          previousKeys = newKeys;
        }
      }
    }

    function createDivElements() {
      var parentElement = document.getElementById("parent");

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTabUrl = tabs[0].url;
        if (obj["current_url"] == tabs[0].url) {
          Object.keys(obj)?.map((item, index) => {
            console.log(obj);
            if (!document.getElementById(item + index.toString())) {
              var newDiv = document.createElement("div");
              newDiv.id = item + index.toString();
              newDiv.className = "someRandomThings"
              newDiv.style.color = "white";
              newDiv.style.fontSize = "1rem";
              newDiv.style.margin = "1rem";

              parentElement.appendChild(newDiv);

              if (item == "stock_data") {
                newDiv.innerHTML = "Stock Data" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "giznext_policy") {
                newDiv.innerHTML = "Transparency Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "ai_image") {
                newDiv.innerHTML = "AI Images" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "phishing") {
                newDiv.innerHTML = "URL Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "subscription_details") {
                newDiv.innerHTML = "Billing Cycle Details" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "amazon_policy") {
                newDiv.innerHTML = "Transparency Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "terms") {
                newDiv.innerHTML = "About Terms of Cancellation" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "how_to_cancel") {
                newDiv.innerHTML = "About how to cancel" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "sponsored_content") {
                newDiv.innerHTML = `<img src="images/prev.png" id="sponsored_prev" />` + " " +  "Sponsored Content" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="sponsored_next" />`;
                let next = document.getElementById("sponsored_next");
                let previous = document.getElementById("sponsored_prev");
                

                next.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    // console.log(obj_arr)
                    // console.log(obj_arr[current])
                    // alert(JSON.stringify(obj_arr[current]))
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement",
                          elementId: obj_arr[spon_current_0].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (spon_current_0 < Object.values(obj)[index].length) {
                    spon_current_0 += 1;
                  }
                };

                previous.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement",
                          elementId: obj_arr[spon_current_0].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (spon_current_0 > 0) {
                    spon_current_0 -= 1;
                  }
                };
              } else if (item == "more_prods") {
                newDiv.innerHTML = `<img src="images/prev.png" id="sponsored_prev1" />` + " " +  "Force Buy" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="sponsored_next1" />`;
                let next = document.getElementById("sponsored_next1");
                let previous = document.getElementById("sponsored_prev1");

                next.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    // alert(obj_arr[current].class)
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    // alert(JSON.stringify(obj_arr))
                    // alert(JSON.stringify(obj_arr[current]))
                    // alert(JSON.stringify(obj_arr[current].id))
                    // alert(current)
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement_",
                          elementId_: obj_arr[more_0].id,
                        };

                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (more_0 < Object.values(obj)[index].length) {
                    more_0 += 1;
                  }
                };

                previous.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    // alert(obj_arr[current].class)
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement_",
                          elementId_: obj_arr[more_0].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (more_0 > 0) {
                    more_0 -= 1;
                  }
                };
              
              } else if (item == "protocol") {
                newDiv.innerHTML = "Protocol: " + `<br>${Object.values(obj)[index]}</br>`
              } else if (item == "cookies") {
                newDiv.innerHTML = "Cookies: " + `<br>${Object.values(obj)[index]}</br>`
              } else if (item == "ads_with_ids") {
                if(!document.getElementById("ads_next") &&
                !document.getElementById("ads_previous")) {

                  newDiv.innerHTML = `<img src="images/prev.png" id="ads_previous" />` + " " +  "UI Deception" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="ads_next" />`;
                }
                  if (
                    !document.getElementById("ads_next") &&
                    !document.getElementById("ads_previous")
                  ) {
                    // let next = document.createElement("div");
                    // let previous = document.createElement("div");
  
                    // next.id = "ads_next";
                    // next.textContent = "Next";
                    // previous.id = "ads_previous";
                    // previous.textContent = "Previous";
                    // let current = 0;
  
                    // next.onclick = () => {
                    //   //alert('FUCKKKKKKKKKK')
                    //   chrome.tabs.query(
                    //     { active: true, currentWindow: true },
                    //     function (tabs) {
                    //       var message = {
                    //         action: "scrollTheFuckingAds",
                    //         elementId_: Object.values(obj)[index][current],
                    //       };
                    //       chrome.tabs.sendMessage(tabs[0].id, message);
                    //     }
                    //   );
                    //   if(current < Object.values(obj)[index].length) {
                    //     current += 1
                    //   }
                    // };
  
                    // previous.onclick = () => {
                    //   chrome.tabs.query(
                    //     { active: true, currentWindow: true },
                    //     function (tabs) {
                    //       var message = {
                    //         action: "scrollTheFuckingAds",
                    //         elementId_: Object.values(obj)[index][current],
                    //       };
                    //       chrome.tabs.sendMessage(tabs[0].id, message);
                    //     }
                    //   );
                    //   if(current > 0) {
                    //     current -= 1
                    //   }
                    // };
                    // document.getElementById("parent").appendChild(next);
                    // document.getElementById("parent").appendChild(previous);
                  } else {
                    let next = document.getElementById("ads_next");
                    let previous = document.getElementById("ads_previous");
                    next.onclick = () => {
                      chrome.tabs.query(
                        { active: true, currentWindow: true },
                        function (tabs) {
                          var message = {
                            action: "scrollTheFuckingAds",
                            elementId_: Object.values(obj)[index][current1],
                          };
                          chrome.tabs.sendMessage(tabs[0].id, message);
                        }
                      );
                      if(current1 < Object.values(obj)[index].length) {
                        current1 += 1
                      }
                    };
                    previous.onclick = () => {
                      chrome.tabs.query(
                        { active: true, currentWindow: true },
                        function (tabs) {
                          var message = {
                            action: "scrollTheFuckingAds",
                            elementId_: Object.values(obj)[index][current1],
                          };
                          chrome.tabs.sendMessage(tabs[0].id, message);
                        }
                      );
                      if(current1 > 0) {
                        current1 -= 1
                      }
                    };
                  }
              } 
              else if (item == "review_check") {
                newDiv.innerHTML = "Reviews Check: " + `<br><p id="redirection">${Object.values(obj)[index]}</p></br>`
                newDiv.style.flexDirection = "column"
                document.getElementById("redirection").onclick = () => {
                  // alert(obj["current_url"])
                  // chrome.tabs.create({url: obj["current_url"]})
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    const currentTab = tabs[0];
                  
                    const currentUrl = currentTab.url;

                    let url_ = currentUrl.split("/dp/");
                    let newUrl = url_[0] + "/product-review/" + url_[1];

                    chrome.tabs.create({url: newUrl})
                  });
                }
              } 
              else if (item == "mislead") {
                newDiv.innerHTML = "Misleading Information Check: " + `<br>${Object.values(obj)[index]}</br>`
              } 
              else {
                let base = window.location.href.split(".")[1].split(".")[0];
                if (item.includes("_total_check")) {
                  newDiv.innerHTML = "Amount Check: " + `<br>${Object.values(obj)[index]}</br>`
                }
              }
            } 
            else {
              if (item == "stock_data") {
                document.getElementById(item + index.toString()).innerHTML = "Stock Data" + `<br>${Object.values(obj)[index]}</br>`;
              } 
              else if (item == "phishing") {
                newDiv.innerHTML = "URL Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "ai_image") {
                newDiv.innerHTML = "AI Images" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "subscription_details") {
                newDiv.innerHTML = "Billing Cycle Details" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "terms") {
                newDiv.innerHTML = "About Terms of Cancellation" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "how_to_cancel") {
                newDiv.innerHTML = "About how to cancel" + `<br>${Object.values(obj)[index]}</br>`
              } 
              // else if (item == "countdown_data") {
              //   document.getElementById(item + index.toString()).innerHTML = "Regarding Countdown" + `<br>${Object.values(obj)[index]}</br>`;
              // } 
              else if (item == "sponsored_content") {
                // document.getElementById(item + index.toString()).textContent = "Sponsored Content" + " (" + Object.values(obj)[index].length.toString() + ")";
                // if (
                //   !document.getElementById("sponsored_next") &&
                //   !document.getElementById("sponsored_prev")
                // ) {
                //   let next = document.createElement("div");
                //   let previous = document.createElement("div");
                //   next.id = "sponsored_next";
                //   next.textContent = "Next";
                //   previous.id = "sponsored_prev";
                //   previous.textContent = "Previous";
                //   let current = 0;

                //   next.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement",
                //             elementId: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current < Object.values(obj)[index].length) {
                //       current += 1;
                //     }
                //   };
                //   previous.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement",
                //             elementId: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current > 0) {
                //       current -= 1;
                //     }
                //   };
                //   document.getElementById("parent").appendChild(next);
                //   document.getElementById("parent").appendChild(previous);
                // } else {
                //   let next = document.getElementById("sponsored_next");
                //   let previous = document.createElement("sponsored_prev");
                //   let current = 0;
                //   next.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement",
                //             elementId: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current < Object.values(obj)[index].length) {
                //       current += 1;
                //     }
                //   };
                //   previous.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement",
                //             elementId: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current > 0) {
                //       current -= 1;
                //     }
                //   };
                // }
                newDiv.innerHTML = `<img src="images/prev.png" id="sponsored_prev" />` + " " +  "Sponsored Content" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="sponsored_next" />`;
                
                // document.getElementById(item + index.toString()).innerHTML =  `<img src="images/prev.png" id="ads_previous" />` + " " +  "UI Deception" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="ads_next" />`
                // next.id = "sponsored_next";
                // next.textContent = "Next";
                // previous.id = "sponsored_prev";
                // previous.textContent = "Previous";
                let next = document.getElementById("sponsored_next");
                let previous = document.getElementById("sponsored_prev");
                
                // let current = 0;

                next.onclick = () => {
                  // alert('Pepsi Cola')
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    // alert(obj_arr[current].class)
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    // console.log(obj_arr)
                    // console.log(obj_arr[current])
                    // alert(JSON.stringify(obj_arr[current]))
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement",
                          elementId: obj_arr[spon_current_1].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (spon_current_1 < Object.values(obj)[index].length) {
                    spon_current_1 += 1;
                  }
                };

                previous.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[spon_current_1].class,
                          index: classValues[obj_arr[spon_current_1].class]
                            ? classValues[obj_arr[spon_current_1].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement",
                          elementId: obj_arr[spon_current_1].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (spon_current_1 > 0) {
                    spon_current_1 -= 1;
                  }
                };
                // console.log(Object.values(obj)[index]);
              } else if (item == "more_prods") {
                // document.getElementById(item + index.toString()).textContent =
                  
                //   "Force Buy" +
                //   " (" +
                //   Object.values(obj)[index].length.toString() +
                //   ")";
                // if (
                //   !document.getElementById("sponsored_next1") &&
                //   !document.getElementById("sponsored_prev1")
                // ) {
                //   let next = document.createElement("div");
                //   let previous = document.createElement("div");

                //   next.id = "sponsored_next1";
                //   next.textContent = "Next";
                //   previous.id = "sponsored_prev1";
                //   previous.textContent = "Previous";
                //   let current = 0;

                //   next.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       // alert(JSON.stringify(obj_arr))
                //       // alert(JSON.stringify(obj_arr[current]))
                //       // alert(JSON.stringify(obj_arr[current].id))
                //       // alert(current)
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement_",
                //             elementId_: obj_arr[current].id,
                //           };

                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current < Object.values(obj)[index].length) {
                //       current += 1;
                //     }
                //   };

                //   previous.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement_",
                //             elementId_: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current > 0) {
                //       current -= 1;
                //     }
                //   };
                //   document.getElementById("parent").appendChild(next);
                //   document.getElementById("parent").appendChild(previous);
                // } else {
                //   let next = document.getElementById("sponsored_next1");
                //   let previous = document.getElementById("sponsored_prev1");

                //   let current = 0;

                //   next.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       // alert(JSON.stringify(obj_arr))
                //       // alert(JSON.stringify(obj_arr[current]))
                //       // alert(JSON.stringify(obj_arr[current].id))
                //       // alert(current)
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement_",
                //             elementId_: obj_arr[current].id,
                //           };

                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current < Object.values(obj)[index].length) {
                //       current += 1;
                //     }
                //   };

                //   previous.onclick = () => {
                //     let obj_arr = Object.values(obj)[index];
                //     let classValues = {};
                //     if (obj_arr[current].type == "class") {
                //       if (classValues[obj_arr[current].class]) {
                //         classValues[obj_arr[current].class] =
                //           classValues[obj_arr[current].class] + 1;
                //       } else {
                //         classValues[obj_arr[current].class] = 1;
                //       }
                //       console.log(classValues);
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollFromClass",
                //             className: obj_arr[current].class,
                //             index: classValues[obj_arr[current].class]
                //               ? classValues[obj_arr[current].class]
                //               : 0,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     } else {
                //       chrome.tabs.query(
                //         { active: true, currentWindow: true },
                //         function (tabs) {
                //           var message = {
                //             action: "scrollToElement_",
                //             elementId_: obj_arr[current].id,
                //           };
                //           chrome.tabs.sendMessage(tabs[0].id, message);
                //         }
                //       );
                //     }
                //     if (current > 0) {
                //       current -= 1;
                //     }
                //   };
                // }

                newDiv.innerHTML = `<img src="images/prev.png" id="sponsored_prev1" />` + " " +  "Force Buy" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="sponsored_next1" />`;
                let next = document.getElementById("sponsored_next1");
                let previous = document.getElementById("sponsored_prev1");
                // next.id = "sponsored_next1";
                // next.textContent = "Next";
                // previous.id = "sponsored_prev1";
                // previous.textContent = "Previous";
                // let current = 0;

                next.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    // alert(obj_arr[current].class)
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    // alert(JSON.stringify(obj_arr))
                    // alert(JSON.stringify(obj_arr[current]))
                    // alert(JSON.stringify(obj_arr[current].id))
                    // alert(current)
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement_",
                          elementId_: obj_arr[more_1].id,
                        };

                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (more_1 < Object.values(obj)[index].length) {
                    more_1 += 1;
                  }
                };

                previous.onclick = () => {
                  let obj_arr = Object.values(obj)[index];
                  let classValues = {};
                  if (obj_arr[current].type == "class") {
                    // alert(obj_arr[current].class)
                    if (classValues[obj_arr[current].class]) {
                      classValues[obj_arr[current].class] =
                        classValues[obj_arr[current].class] + 1;
                    } else {
                      classValues[obj_arr[current].class] = 1;
                    }
                    console.log(classValues);
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollFromClass",
                          className: obj_arr[current].class,
                          index: classValues[obj_arr[current].class]
                            ? classValues[obj_arr[current].class]
                            : 0,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  } else {
                    chrome.tabs.query(
                      { active: true, currentWindow: true },
                      function (tabs) {
                        var message = {
                          action: "scrollToElement_",
                          elementId_: obj_arr[more_1].id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, message);
                      }
                    );
                  }
                  if (more_1 > 0) {
                    more_1 -= 1;
                  }
                };

              } else if (item == "protocol") {
                document.getElementById(item + index.toString()).innerHTML = "Protocol: " + `<br>${Object.values(obj)[index]}</br>`
              } else if (item == "cookies") {
                document.getElementById(item + index.toString()).innerHTML = "Cookies: " + `<br>${Object.values(obj)[index]}</br>`
              } else if (item == "ads_with_ids") {
                // document.getElementById(item + index.toString()).innerHTML =  `<img src="images/prev.png" id="ads_previous" />` + " " +  "UI Deception" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="ads_next" />`;
                if(!document.getElementById("ads_next") &&
                !document.getElementById("ads_previous")) {
                  newDiv.innerHTML = `<img src="images/prev.png" id="ads_previous" />` + " " +  "UI Deception" + " (" + Object.values(obj)[index].length.toString() + ")" + " " + `<img src="images/next.png" id="ads_next" />`;
                }
                  // console.log(Object.values(obj)[index])
                    let next = document.getElementById("ads_next");
                    let previous = document.getElementById("ads_previous");
                    next.onclick = () => {
                    //alert('FUCKKKKKKKKKK')
                      chrome.tabs.query(
                        { active: true, currentWindow: true },
                        function (tabs) {
                          var message = {
                            action: "scrollTheFuckingAds",
                            elementId_: Object.values(obj)[index][current],
                          };
                          chrome.tabs.sendMessage(tabs[0].id, message);
                        }
                      );
                      if(current < Object.values(obj)[index].length) {
                        current += 1
                      }
                    console.log(current)

                    };
                    previous.onclick = () => {
                      chrome.tabs.query(
                        { active: true, currentWindow: true },
                        function (tabs) {
                          var message = {
                            action: "scrollTheFuckingAds",
                            elementId_: Object.values(obj)[index][current],
                          };
                          chrome.tabs.sendMessage(tabs[0].id, message);
                        }
                      );
                      if(current > 0) {
                        current -= 1
                      }
                    };

              } else if (item == "review_check") {
                // document.getElementById(item + index.toString()).innerHTML = "Reviews Check: " + `<br>${Object.values(obj)[index]}</br>`
                // document.getElementById(item + index.toString()).innerHTML = "Reviews Check: " + `<br><p id="redirection">${Object.values(obj)[index]}</p></br>`
                // document.getElementById("redirection").onclick = () => {
                //   alert(obj["current_url"])
                //   chrome.tabs.create({url: obj["current_url"]})
                // }
                document.getElementById(item + index.toString()).innerHTML = "Reviews Check: " + `<br><p id="redirection">${Object.values(obj)[index]}</p></br>`
                document.getElementById(item + index.toString()).style.flexDirection = "column"
                document.getElementById("redirection").onclick = () => {
                  // alert(obj["current_url"])
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    const currentTab = tabs[0];
                  
                    const currentUrl = currentTab.url;

                    let url_ = currentUrl.split("/dp/");
                    let newUrl = url_[0] + "/product-review/" + url_[1];

                    chrome.tabs.create({url: newUrl})
                  });
                }
              }
              else if (item == "mislead") {
                newDiv.innerHTML = "Misleading Information Check: " + `<br>${Object.values(obj)[index]}</br>`
              }  
              else if (item == "amazon_policy") {
                newDiv.innerHTML = "Transparency Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else if (item == "giznext_policy") {
                newDiv.innerHTML = "Transparency Check" + `<br>${Object.values(obj)[index]}</br>`
              } 
              else {
                let base = window.location.href.split(".")[1].split(".")[0];
                if (item.includes("_total_check")) {
                  document.getElementById(item + index.toString()).innerHTML = "Amount Check: " + `<br>${Object.values(obj)[index]}</br>`
                }
              }
              document.getElementById(item + index.toString()).style.color =
                "white";
              document.getElementById(item + index.toString()).style.fontSize =
                "1rem";
              document.getElementById(item + index.toString()).style.margin =
                "1rem";
            }
          });
        }
      });
    }

    function arraysAreEqual(array1, array2) {
      // return (
      //   array1.length === array2.length &&
      //   array1.every((value, index) => value === array2[index])
      // );
      return false;
    }
  // }, 500);
};