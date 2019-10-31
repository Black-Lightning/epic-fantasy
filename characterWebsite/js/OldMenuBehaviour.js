/*This is previous javascript function of prior menu behaviour*/
$(document).ready(function() {	

	//Background color, mouseover and mouseout
	var colorOver = '#8422c9';
	var colorOut = '#000';

	//Padding, mouseover
	var padLeft = '20px';
	var padRight = '20px';
	
	//Default Padding
	var defpadLeft = $('#menu li a').css('paddingLeft');
	var defpadRight = $('#menu li a').css('paddingRight');
		
	//Animate the LI on mouse over, mouse out
	$('#menu li').click(function () {	
		//Make LI clickable
		window.location = $(this).find('a').attr('href');
		
	}).mouseover(function (){
		
		//mouse over LI and look for A element for transition
		$(this).find('a')
		.animate( { paddingLeft: padLeft, paddingRight: padRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOver }, { queue:false, duration:200 });

	}).mouseout(function () {
	
		//mouse oout LI and look for A element and discard the mouse over transition
		$(this).find('a')
		.animate( { paddingLeft: defpadLeft, paddingRight: defpadRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOut }, { queue:false, duration:200 });
	});	
	
	/*
	
	//Scroll the menu on mouse move above the #content layer
	$('#content').mousemove(function(e) {

		//content Offset, Top value
		var s_top = parseInt($('#content').offset().top);		
		
		//content Offset, Bottom value
		var s_bottom = parseInt($('#content').height() + s_top);
	
		//Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
		var mheight = parseInt($('#menu li').height() * $('#menu li').length);
	
		//I used this coordinate and offset values for debuggin
		$('#debugging_mouse_axis').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);
		$('#debugging_status').html(Math.round(((s_top - e.pageY)/100) * mheight / 2));
			
		//Calculate the top value
		//This equation is not the perfect, but it 's very close	
		var top_value = Math.round(( (s_top - e.pageY) /100) * mheight / 2);
		
		//Animate the #menu by chaging the top value
		$('#menu').animate({top: top_value}, { queue:false, duration:500});
	});
*/
	
});
	
