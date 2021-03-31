import { escapeHandler } from "../mixins/keyboard";


export const navigationCategoryDropdown = () => {
  const button = document.querySelector('#category-show-button')
  button.addEventListener('click', function () {
    focusEvent(this)
  })

  const tabs = document.querySelectorAll('.tab')
  tabs.forEach(tab => {
    tab.addEventListener('mouseover', function () {
      changeActiveTab(this)
    })
  })
}


const focusEvent = (element) => {
  const ref = element.dataset.ref
  const dropdownContent = document.getElementById(ref)

  if (dropdownContent.classList.contains('block')) {
    dropdownContent.classList.remove('block')
    dropdownContent.classList.add('hidden')
  } else {
    dropdownContent.classList.remove('hidden')
    dropdownContent.classList.add('block')
    escapeHandler(() => {
      dropdownContent.classList.remove('block')
      dropdownContent.classList.add('hidden')
    })
  }
}


const changeActiveTab = (element) => {
  const tabId = element.dataset.ref;

  if (element.nodeName !== "LI") {
    element = element.parentNode;
  }

  let ulElement = element.parentNode;
  let liElements = ulElement.querySelectorAll("li");
  let tabContents = document.getElementById("tab-id-1").querySelectorAll(".tab-content > div");

  for(let i = 0 ; i < liElements.length; i++){
    liElements[i].classList.remove("bg-current-100");
    liElements[i].classList.add("bg-white");
    tabContents[i].classList.add("hidden");
    tabContents[i].classList.remove("block");
  }

  element.classList.remove("bg-white");
  element.classList.add("bg-current-100");

  document.getElementById(tabId).classList.remove("hidden");
  document.getElementById(tabId).classList.add("block");
}
