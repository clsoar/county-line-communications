
//scrolling go to top button
topBtn = document.getElementById("top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
   topBtn.style.display = "block";
 } else {
   topBtn.style.display = "none";
 }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//accordion for FAQs from https://medium.com/@vikash20186/creating-accordion-with-javascript-a33743655474
function initAccordion(accordionElem){

  //when panel is clicked, handlePanelClick is called.
  function handlePanelClick(event){
      showPanel(event.currentTarget);
  }

  //Hide old panel and show new One
  function showPanel(panel){
    //close old ones open clicked one.
     let expandedPanel = accordionElem.querySelector(".active");
     if (expandedPanel && panel.classList.contains("active")){
       expandedPanel.classList.remove("active");
       panel.classList.remove('active');
    }else if (expandedPanel && !panel.classList.contains("active")){
       panel.classList.add("active");
       expandedPanel.classList.remove("active");
     }else if (!expandedPanel && !panel.classList.contains('active')){
       panel.classList.add("active");
     }
  }
  var allPanelElems = accordionElem.querySelectorAll(".qa-container");
 for (let i = 0, len = allPanelElems.length; i < len; i++){
      allPanelElems[i].addEventListener("click", handlePanelClick);
 }

}
initAccordion(document.querySelector(".faq-container"));
