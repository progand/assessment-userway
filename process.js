// data attribute to mark elements
const dataAttr = `data-userway`;

/* 
Possible future impovements: 
 - queve api requests
 - prioritize images by distance to viewport
 - observe image SRC attribute change
*/
export default function process(options) {
  const containerEl = (options && options.containerEl) || document.body;
  const tagName = String((options && options.tagName) || "IMG").toUpperCase();
  const attrName = (options && options.attrName) || "alt";

  processExisting();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const elements = mutation.addedNodes;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].nodeName.toUpperCase() === tagName) {
          processElement(elements[i]);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  function processExisting() {
    const elements = findImages(containerEl, tagName);
    for (let i = 0; i < elements.length; i++) {
      processElement(elements[i]);
    }
  }

  // function finds all img element within provided container
  function findImages() {
    if (!containerEl || !containerEl.querySelectorAll) return [];
    return containerEl.querySelectorAll(tagName + ":not([" + dataAttr + "])");
  }

  // process single element
  function processElement(el) {
    // old XMLHttpRequest is used for maximal browser compability, however I'd prefer `fetch` if possible
    const xhr = new XMLHttpRequest();
    // didn't found random words API in provided PDF document so I google for some available APIs
    xhr.open(
      "GET",
      "https://random-word.ryanrk.com/api/en/word/random/3",
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const words = JSON.parse(xhr.responseText);
          changeAttr(el, words.join(" "));
        } catch (error) {
          planToProcessLater(el);
        }
      } else {
        planToProcessLater(el);
      }
    };
    xhr.onerror = function () {
      planToProcessLater(el);
    };
    xhr.send();
    el.setAttribute(dataAttr, "processing");
  }

  // function changes an attribute and marks element with data attribute
  function changeAttr(el, value) {
    if (el) {
      el[attrName] = value;
      el.setAttribute(dataAttr, "done");
    }
  }

  function planToProcessLater(el) {
    el.removeAttribute(dataAttr);
    // simply plan to process existing images after some timeout
    setTimeout(processExisting, 2000);
  }
}
