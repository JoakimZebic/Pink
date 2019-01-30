$(document).mousemove(function(e){
	$('#cursor_circle').css({left: e.pageX,top: e.pageY});
	$('#cursor').css({left: e.pageX,top: e.pageY});
});

/******* AJAX REQUEST ********/


/******* EFFECTS ********/
$(document).ready(function(){	
	$('#Navigation').animate({clipPath: 'polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%)'},1000);

	$("#social i").hover(
		function(){
			$('#cursor_circle').css({width: "+=20", height: "+=20px", opacity: "1", zIndex: "-1", backgroundColor: "#FF8DDC"});
			$('#cursor').hide();
			$(this).css("font-size","4vh");
		}, 

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink"});
			$('#cursor').show();
			$(this).css("font-size","3vh");
		});

	$("#hash").hover(
		function(){
			$('#cursor_circle').css({width: "+=80", height: "+=80px", opacity: "1", zIndex: "-1", backgroundColor: "#252525"});
			$('#cursor').hide();
		}, 

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink"});
			$('#cursor').show();
		});

	$("#nextFrame").hover(
		function(){
			$('#cursor_circle').css({width: "8vh", height: "8vh", opacity: "1", zIndex: "-1", backgroundColor: "#fff", borderRadius: "0"});
			$('#cursor').hide();
			$(this).css("borderColor", "rgba(255,141,220,1)")
		},

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink", borderRadius: "50%"});
			$('#cursor').show();
			$(this).css("borderColor", "rgba(255,141,220,0.5)")
		});

	$("#prevFrame").hover(
		function(){
			$('#cursor_circle').css({width: "8vh", height: "8vh", opacity: "1", zIndex: "-1", backgroundColor: "#ff8ddc", borderRadius: "0"});
			$('#cursor').hide();
			$(this).css("borderColor", "rgba(255,255,255,1)")
		},

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink", borderRadius: "50%"});
			$('#cursor').show();
			$(this).css("borderColor", "rgba(255,255,255,0.5)")
		});

	$("#search-box").hover(
		function(){
			$('#cursor_circle').css({width: "+=20px", height: "+=20px", zIndex: "-1", backgroundColor: "#fff"});
			$('#cursor').hide();
		},

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", zIndex: "998", backgroundColor: "deeppink"});
			$('#cursor').show();
		});

	$("#icon").hover(
		function(){
			$('#cursor_circle').css({width: "+=15px", height: "+=15px", opacity: "1", zIndex: "4", backgroundColor: "#252525"});
			$('#cursor').hide();
		},

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink"});
			$('#cursor').show();
		});

	var NavOut=false;
	$('#icon').click(function(){
		if(!NavOut){
			$('#Navigation ul').addClass('showMenu');
			$(this).addClass('iconActive');
			$('#Navigation').addClass('navout');
			NavOut=true;
		}
		else{
			$('#Navigation ul').removeClass('showMenu');
			$('#Navigation ul').addClass('hideMenu');
			$(this).removeClass('iconActive');
			$('#Navigation').removeClass('navout');
			setTimeout(function(){
				$('#Navigation ul').removeClass('hideMenu');
			},1100);
			NavOut=false;
		}
	})

	$(".dot").hover(
		function(){
			$('#cursor_circle').css({width: "-=25px", height: "-=25px", opacity: "1", zIndex: "-1", backgroundColor: "#fff"});
			$('#cursor').css("backgroundColor","#ff8ddc");
		},

		function(){
			$('#cursor_circle').css({width: "50px", height: "50px", opacity: "0.3", zIndex: "998", backgroundColor: "deeppink"});
			$('#cursor').css("backgroundColor","#252525");
		});

	var dots= $(".dot");
	for(var i=0; i<dots.length; i++)dots[i].addEventListener("click", DOT);

	function DOT(){
		for(var i=0; i<dots.length; i++)if($(dots[i]).hasClass("active"))$(dots[i]).removeClass("active");
		$(this).addClass("active");
	}

	$("#Logo").hover(
		function(){
			$('#cursor_circle').css({ zIndex: '1' });
			$('#cursor').hide();
		},

		function(){
			$('#cursor_circle').css({ zIndex: '998' });
			$('#cursor').show();
		}
	);

	$('.flipp').hover(
		function(){
			$('#cursor_circle').css({ width: '15vh', height: '15vh', backgroundColor: 'transparent', borderRadius: '0', border: '4px solid #fff'});
			$(this).css({zIndex: "2"});
		},
		
		function(){
			$('#cursor_circle').css({ width: '50px', height: '50px', backgroundColor: 'deeppink', borderRadius: '50%', border: 'none' });
			$(this).css({zIndex: "1"});
		}
	);

	var flipps = $('.flippInside');
	console.log(flipps)
	$('#Cafe img').click(function(){
		if($(this).parent().parent().hasClass('imgactive')){
			$(this).parent().parent().removeClass('imgactive');
		}
		else{
			for(x of flipps)$(x).removeClass('imgactive');
			$(this).parent().parent().addClass('imgactive');
		}
	});
	
	$alldots = $('.dot');
	$('.dot').click(function(){
		$name = $(this).attr('name');
		if($name == 'Coffee'){ 			//Strelice za proizvode
			$('#prevFrame').addClass('frameInPrev');
			$('#nextFrame').addClass('frameInNext');
		}
		else{
			$('#prevFrame').removeClass();
			$('#nextFrame').removeClass();
		}

		$divname = '#'+ $name;
			var activePos;
			var clickedPos;
			for( var i = 0; i<$alldots.length; i++){
				if($($alldots[i]).attr('name') == $name)clickedPos=i;
				if($($alldots[i]).attr('name') == $('.activeDiv').attr('id'))activePos=i;
			}
			if(activePos>clickedPos){
				$('.activeDiv').removeClass().addClass('screenOutBot');
				$($divname).removeClass().addClass('screenInTop').addClass('activeDiv');
			}
			else if(activePos<clickedPos){
				$('.activeDiv').removeClass().addClass('screenOutTop');
				$($divname).removeClass().addClass('screenInBot').addClass('activeDiv');
			}
	});

	$('#Navigation ul li').click(function(){
		$('#icon').click();
		if($(this).attr('name') == 'Coffee'){ 			//Strelice za proizvode
			$('#prevFrame').addClass('frameInPrev');
			$('#nextFrame').addClass('frameInNext');
		}
		else{
			$('#prevFrame').removeClass();
			$('#nextFrame').removeClass();
		}

		$divName ='#' + $(this).attr('name');
		$('.activeDiv').removeClass().addClass('screenOutBot');
		$($divName).removeClass().addClass('screenInTop').addClass('activeDiv');
		for( var i = 0; i<$alldots.length; i++){
			if($($alldots[i]).attr('name') == $(this).attr('name'))$($alldots[i]).click();
		}
	});

	$('#nextFrame').click(function(){
		var current = $('#Coffee .activeProduct');
  		var next = current.next().length ? current.next() : current.parent().children(':first');
  
  		current.removeClass('activeProduct');
  		next.addClass('activeProduct');
	});

	$('#prevFrame').click(function(){
		var current = $('#Coffee .activeProduct');
  		var prev = current.prev().length ? current.prev() : current.parent().children(':last');
  
  		current.removeClass('activeProduct');
  		prev.addClass('activeProduct');
	});

	var grid= false;
	$('#changeState').click(function(){
		if(!grid){
			$('.cube').css({width: '8px', height: '8px'});
			$('#products').addClass('grid');
			$('.product').removeClass('single').addClass('grid');
			grid=true;
		}else{
			$('.cube').css({width: '1vw', height: '1vw'});
			$('#products').removeClass();
			$('.product').removeClass('grid').addClass('single');
			grid=false;
		}
	});
	console.log($('.cube').css('width'));
	$('#changeState').hover(
		function(){
			if($('.cube').css('width')!='8px'){
				$('.cube').addClass('hoverGrid');
			}
			else{
				$('.cube').addClass('hoverSingle');
			}
		}
		,function(){
			$('.cube').removeClass('hoverSingle').removeClass('hoverGrid');
		});

	$('.product').click(function(){
		$('.product').removeClass('activeProduct');
		$(this).addClass('activeProduct');
		$('#changeState').click();
	});
});

