$(document).ready(function(){
	//Scroll buttons
	$('#HS').click(
		function(){
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#HSchooler").offset().top - 80
			}, 2000);
	});
	$('#Program').click(
		function(){
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#Programmer").offset().top - 80
			}, 2000);
	});
	$('#Swim').click(
		function(){
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#Swimmer").offset().top - 80
			}, 2000);
	});


	$('.navText').hover(
		function(){
			$(this).fadeTo(100, .25);
		},
		function(){
			$(this).fadeTo(100, 1);
		}
	);
	$('.nameSubFade').hover(
		function(){
			$(this).fadeTo(100, 0.5);
		},
		function(){
			$(this).fadeTo(100, 1);
		}
	);
	$('.artImage').hover(
		function(){
			$(this).addClass('highlight');
		},
		function(){
			$(this).removeClass('highlight');
		}
	
	);
	$('.artImage').click(
		function(){
			$(this).removeClass('artImage');
			$(this).addClass('resizedImage');
			$(this).clone().prependTo('.forefront');
			$(this).removeClass('resizedImage');
			$(this).addClass('artImage');
			
			$('.forefront').css('pointer-events', 'auto');
		});
	$('.forefront').click(
		function(){
			$('.forefront').css('pointer-events', 'none');
			$('.resizedImage').hide();
	});
});

