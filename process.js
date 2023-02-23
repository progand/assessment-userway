// data attribute to mark elements
const dataAttr = `data-userway`;

export default function process(options) {
  const containerEl = (options && options.containerEl) || document.body;
  const tagName = String((options && options.tagName) || "IMG").toUpperCase();
  const attrName = (options && options.attrName) || "alt";

  const existingElements = findImages(containerEl, tagName);
  processMultiple(existingElements);

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

  function processMultiple(elements) {
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
        } catch (error) {}
      } else {
        planToProcessLater(el);
      }
    };
    xhr.onerror = function () {
      planToProcessLater(el);
    };
    xhr.send();
  }

  // function changes an attribute and marks element with data attribute
  function changeAttr(el, value, attributeOption) {
    if (el) {
      el[attrName] = value;
      el[dataAttr] = "done";
    }
  }

  function planToProcessLater(el) {
    // do nothing
  }
}
