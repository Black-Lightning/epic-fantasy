// JavaScript Document
// Script for scroll 
 $(window).load(function(){
      
var step = 25;
var scrolling = false;

// Wire up events for the 'scrollUp' link:
$("#scrollUp").bind("click", function(event) {
    event.preventDefault();
    // Animates the scrollTop property by the specified
    // step.
    $("#content").animate({
        scrollTop: "-=" + step + "px"
    });
}).bind("mouseover", function(event) {
	$(".parent").scrolling = false;
    scrolling = true;
    scrollContent("up");
	

}).bind("mouseout", function(event) {
    scrolling = false;
});


$("#scrollDown").bind("click", function(event) {
    event.preventDefault();
    $("#content").animate({
        scrollTop: "+=" + step + "px"
    });
}).bind("mouseover", function(event) {
	$(".parent").scrolling = false;
    scrolling = true;
    scrollContent("down");
}).bind("mouseout", function(event) {
    scrolling = false;
});

function scrollContent(direction) {
    var amount = (direction === "up" ? "-=3px" : "+=3px");
    $("#content").animate({
        scrollTop: amount
    }, 1, function() {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}

    });
  //]]>
  
  //script for sub menu show and hide
  
    $(function(){
      
$(function () {
    $(".imageMenu").hide();
    $(".parent").click(function (e) {
        e.preventDefault();
        if (!$(e.target).closest("ul").is(".imageMenu")) {
            $(".imageMenu", this).toggle();
        }
    });
});

    });

  //]]>
  
  <!--this script says, when click on the character button to load that character into the gallery div-->
function change_pic(p) {
img = new Image();
img.src = p;
img.onload = function() {document.images._pimg.src = img.src};
}

//This is for character menu behaviour

    // tell the embed parent frame the height of the content
    if (window.parent && window.parent.parent){
      window.parent.parent.postMessage(["resultsFrame", {
        height: document.body.getBoundingClientRect().height,
        slug: "s5mgX"
      }], "*")
    }

    // always overwrite window.name, in case users try to set it manually
    window.name = "result"