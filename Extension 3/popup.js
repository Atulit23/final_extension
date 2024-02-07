var all_responses = {};

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/png" });
}

function checkReviews() {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    var url = tabs[0].url;
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
            console.log("API response:", data);
            if (data > 0) {
              all_responses["review_result"] = "Deceptive Reviews detected.";
            } else {
              all_responses["review_result"] = "No deceptive Reviews detected.";
            }
          })
          .catch((error) => {
            all_responses["review_result"] = "No Reviews detected..";
          });
      } else {
        let url_ = url.split("/dp/");
        let newUrl = url_[0] + "/product-review/" + url_[1];
        let api_url_ = `https://review-and-ads.vercel.app/review-prediction?url=${newUrl}`;

        fetch(api_url_)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then((data) => {
            console.log("API response:", data);
            if (parseInt(data[0]) > 0) {
              all_responses["review_result"] = "Deceptive Reviews detected.";
            } else {
              all_responses["review_result"] = "No deceptive Reviews detected.";
            }
          })
          .catch((error) => {
            all_responses["review_result"] = "No Reviews detected.";
          });
      }
    }
    // else if (url.includes("flipkart")) {
    //   alert('I am at flipkart')
    //   if (url.includes("product-reviews")) {
    //     let api_url = `https://review-and-ads.vercel.app/review-prediction?url=${url}`;
    //     alert(api_url)

    //     fetch(api_url)
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log("API response:", data);
    //         if (data > 0) {
    //           all_responses["review_result"] = "Deceptive Reviews detected.";
    //         } else {
    //           all_responses["review_result"] = "No deceptive Reviews detected.";
    //         }
    //       })
    //       .catch((error) => {
    //         all_responses["review_result"] = "No Reviews detected.";
    //       });
    //   } else {
    //     let url_ = url.split("/p/");
    //     let newUrl = url_[0] + "/product-reviews/" + url_[1];
    //     let api_url_ = `https://review-and-ads.vercel.app/review-prediction?url=${newUrl}`;
    //     alert(api_url_)
    //     fetch(api_url_)
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         return response.text();
    //       })
    //       .then((data) => {
    //         console.log("API response:", data);
    //         if (parseInt(data[0]) > 0) {
    //           all_responses["review_result"] = "Deceptive Reviews detected.";
    //         } else {
    //           all_responses["review_result"] = "No deceptive Reviews detected.";
    //         }
    //       })
    //       .catch((error) => {
    //         all_responses["review_result"] = "No Reviews detected.";
    //       });
    //   }
    // }
    else {
      all_responses["review_result"] = "";
    }
  });
}

function checkScreen() {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const img = new Image();
      img.src = response.dataUrl;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "full-page-screenshot.png";

        let url = canvas.toDataURL("image/png");
        const blob = dataURItoBlob(url);
        let file = new File([blob], Math.random().toString(), {
          type: "image/png",
        });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "nb6tvi1b");

        fetch("https://api.cloudinary.com/v1_1/ddvajyjou/image/upload", {
          method: "POST",
          body: formData,
        })
          .then(async (response) => {
            const responseData = await response.json();
            console.log(responseData.url);
            let url = `https://review-and-ads.vercel.app/image-prediction?url=${responseData.url}`;
            alert(url);
            fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
              })
              .then((data) => {
                // alert(parseInt(data));
                if (parseInt(data) > 0) {
                  all_responses["image_result"] = "Deceptive UI detected.";
                } else {
                  all_responses["image_result"] =
                    "No deception in UI detected.";
                }
              })
              .catch((error) => {
                document.getElementById("imageResult").innerText = error;
                console.log("Error fetching data:", error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // link.click();
      };
    });
  });
}

function checkScarcity() {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    var url = tabs[0].url;
    const baseUrl = `https://scarcity-beta.vercel.app/?url=${url}`;
    alert(baseUrl);
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        alert(data["data"]);
        all_responses["scarcity_result"] = data["data"];
      })
      .catch((error) => {});
  });
}

async function scanCheckout() {
  const apiKey = "I4we027dKq9Ubl7nDmAalYEcIb3siVVC";

  const requestOptions = {
    method: "GET",
    headers: {
      apikey: apiKey,
    },
  };

  const urlMain = "https://api.apilayer.com/image_to_text/url";

  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    chrome.runtime.sendMessage({ action: "capture" }, (response) => {
      const img = new Image();
      img.src = response.dataUrl;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "full-page-screenshot.png";

        let url = canvas.toDataURL("image/png");
        const blob = dataURItoBlob(url);
        let file = new File([blob], Math.random().toString(), {
          type: "image/png",
        });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "nb6tvi1b");

        fetch("https://api.cloudinary.com/v1_1/ddvajyjou/image/upload", {
          method: "POST",
          body: formData,
        })
          .then(async (response) => {
            const responseData = await response.json();
            // alert(responseData.url);
            try {
              const response = await fetch(
                `${urlMain}?url=${responseData.url}`,
                requestOptions
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const responseData1 = await response.json();

              document.getElementById("loader").style.display = "none";
              if(responseData1.all_text.toLowerCase().includes("additional") || responseData1.all_text.toLowerCase().includes("handling") || responseData1.all_text.toLowerCase().includes("platform") || responseData1.all_text.toLowerCase().includes("handling")) {
                document.getElementById("Checkout").innerText = 'This website contains unexplained charges!';
              } else {
                document.getElementById("Checkout").innerText = 'No explained charges were found!';
              }
            } catch (error) {
              console.error("Error:", error.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // link.click();
      };
    });
  });
}



document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("scanBtn").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    all_responses = {};
    // document.getElementById("Urgency").innerText = "";
    document.getElementById("imageResult").innerText = "";
    document.getElementById("reviewResult").innerText = "";
    document.getElementById("finalResults").innerText = "";
    checkScreen();
    checkReviews();
    // checkScarcity();
    let interval = setInterval(() => {
      if (Object.keys(all_responses).length >= 2) {
        //alert(all_responses["scarcity_result"]);
        document.getElementById("loader").style.display = "none";
        document.getElementById("finalResults").innerText =
          "Results of the scan:";
        // document.getElementById("Urgency").innerText =
        //   all_responses["scarcity_result"];
        document.getElementById("imageResult").innerText =
          all_responses["image_result"];
        document.getElementById("reviewResult").innerText =
          all_responses["review_result"];
        clearInterval(interval);
      }
    }, 100);
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("scanBtn1").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("Checkout").innerText = "";
    scanCheckout();
  });
});


document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("feedback").addEventListener("click", () => {
    document.getElementById("google_form").style.display = 'block'
    document.getElementById("rest").style.display = 'none'
  });
});