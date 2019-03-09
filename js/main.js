$(document).mousemove(function(e){
	$('#cursor_circle').css({left: e.pageX,top: e.pageY});
	$('#cursor').css({left: e.pageX,top: e.pageY});
});

$(document).ready(function(){
	showAll();

	var current;
	function SaveCurrentProducts(data){
		current=data;
	}

	function showAll(){
		$.ajax({
			url: 'data/products.json',
			method: 'POST',
			datatype: 'json',
			success: function(data){
				SaveCurrentProducts(data);
				dataHtml = '';
				for(x of data){
					dataHtml += `
					<div class="product single">
						<h4>${x.name}</h4>
						<img src='${x.img.src}' alt='${x.img.alt}' />
						<p class='price'>Price: ${x.price}$</p>
						<p class='rate'>${x.grade} <span class='fav' data-id='${x.id}'>❤</span></p>
						<p class='neto'>Neto: ${x.neto}kg</p>
						<p class='desc'>${x.desc}</p>
					</div>
					`;
				}

				var favoritesLS = getFavs();

				setTimeout(function(){
					if(favoritesLS){
						addFavoritedClass(favoritesLS);
					}
				},100);

				document.querySelector('#products').innerHTML = dataHtml;
				$('.product:first').addClass('activeProduct');
				$(".fav").click(addToFav);
			},
			error: function(xhr, status, error){
				console.log(error);
			}
		});
	}
	
	function showDataGrid(data){
		dataHtml = '';
		for(x of data){
			dataHtml += `
			<div class="product grid">
				<h4>${x.name}</h4>
				<img src='${x.img.src}' alt='${x.img.alt}' />
				<p class='price'>Price: ${x.price}$</p>
				<p class='rate'>${x.grade} <span class='fav' data-id='${x.id}'>❤</span></p>
				<p class='neto'>Neto: ${x.neto}kg</p>
				<p class='desc'>${x.desc}</p>
			</div>
			`;
		}

		var favoritesLS = getFavs();

		setTimeout(function(){
			if(favoritesLS){
				addFavoritedClass(favoritesLS);
			}
		},100);

		document.querySelector('#products').innerHTML = dataHtml;
		$(".fav").click(addToFav);
	};


	function showFav(data){
		dataHtml = '';
		for(x of data){
			dataHtml += `
			<div class="product single">
				<h4>${x.name}</h4>
				<img src='${x.img.src}' alt='${x.img.alt}' />
				<p class='price'>Price: ${x.price}$</p>
				<p class='rate'>${x.grade} <span class='fav' data-id='${x.id}'>❤</span></p>
				<p class='neto'>Neto: ${x.neto}kg</p>
				<p class='desc'>${x.desc}</p>
			</div>
			`;
		}
		document.querySelector('#products').innerHTML = dataHtml;
		$('.product:first').addClass('activeProduct');
		$(".fav").click(addToFav);
		grid=false;
	};
	
	function addClickProduct(){
		setTimeout(function(){
			$('.product').click(function(){
				if($(this).hasClass('grid')){
					$('.product').removeClass('activeProduct');
					$(this).addClass('activeProduct');
					$('#changeState').click();
				}
				else return;
			});
		}, 100);
	}



	/******* Filter ********/
	$('#filter').keyup(function(){
		
		var data = current;
		var filterVal = $('#filter').val();
		data= data.filter(function(el) {
			if (el.name.toUpperCase().indexOf(filterVal.trim().toUpperCase()) != -1) {
				return el;
			};
		});
		showDataGrid(data);
		$('.product:first').addClass('activeProduct');
		addClickProduct();
		SaveCurrentProducts(data);

		if($('#filter').val()==""){
			showAll();
			$('.cube').css({width: '1vw', height: '1vw'});
			$('#filter').css({display: 'none'});
			$('#sort').css({display: 'none'});
			grid=false;
		}
		
	})

	/**************** SORT ******************/

	$('#sort').click(function(){
		
		var data = current;
		data = data.sort(function(a,b){
			return a.price-b.price;
		});
		showDataGrid(data);
		$('.product:first').addClass('activeProduct');
		addClickProduct();
		SaveCurrentProducts(data);
	})

	/***************** FAVOURITES ********************/
	var favClicked = false;
	$('#favs').click(function(){
		if(!favClicked){
			var favoritesLS = getFavs();
				
			$.ajax({
				url: 'data/products.json',
				method: 'POST',
				datatype: 'json',
				success: function(data){
					data = data.filter(f => {
							for(let fav of favoritesLS)
							{
								if(f.id == fav.id){
									return true;
								}
							}
							return false;
						});
					showFav(data);
					$('.product:first').addClass('activeProduct');
					addClickProduct();

					setTimeout(function(){
						if(favoritesLS){
							addFavoritedClass(favoritesLS);
						}
					},100);
					SaveCurrentProducts(data);
				},
				error: function(xhr, status, error){
					console.log(error);
				}
			})

			$('.dot:eq(2)').click();
			$('.cube').css({width: '1vw', height: '1vw'});
			$('#filter').css({display: 'none'});
			$('#sort').css({display: 'none'});

			favClicked=true;
		}
		else{
			showAll();
			favClicked = false;
			$('.cube').css({width: '1vw', height: '1vw'});
			$('#filter').css({display: 'none'});
			$('#sort').css({display: 'none'});
		}
	});

	/******* EFFECTS ********/
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
		var num = $(this).attr('data-number');
		document.querySelector('#pageNo').innerHTML=num;
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
			$('#filter').css({display: 'block'});
			$('#sort').css({display: 'block'});
			grid=true;
		}else{
			$('.cube').css({width: '1vw', height: '1vw'});
			$('#products').removeClass();
			$('.product').removeClass('grid').addClass('single');
			$('#filter').css({display: 'none'});
			$('#sort').css({display: 'none'});
			grid=false;
		}
	});

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

	addClickProduct();

	// Forma
	var name= $('#fullName');
	var nameRe = /^[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,}){1,}$/;
	var email= $('#email');
	var emailRe= /^[\w\d\.\_\-]+\@[\w\d\.\-]+\.\w{2,}$/;
	var subject = $('#subject');
	var msg = $('#message');

	$('#submit').click(function(){
		var flag = true;
		var formData = [];

		if(!nameRe.test(name.val())){
			name.css("borderBottomColor", "crimson");
			$(".formImg:eq(0)").css("borderBottomColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(0)").css("color","crimson");
			flag=false;
		}
		else{
			name.css("borderBottomColor", "#fff");
			$(".formImg:eq(0)").css("borderBottomColor", "#fff").html("<i class='fas fa-user'></i>");
			$("form i:eq(0)").css("color","#FFCBFF");
			formData.push(name.val().trim());
		}

		if(!emailRe.test(email.val())){
			email.css("borderBottomColor", "crimson");
			$(".formImg:eq(1)").css("borderBottomColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(1)").css("color","crimson");
			flag=false;
		}
		else{
			email.css("borderBottomColor", "#fff");
			$(".formImg:eq(1)").css("borderBottomColor", "#fff").html("<i class='fas fa-at'></i>");
			$("form i:eq(1)").css("color","#FFCBFF");
			formData.push(email.val().trim());
		}

		if(subject.val().trim() != ''){
			formData.push(subject.val().trim())
		}
		else{
			subject.val('');
		}

		if(msg.val().trim()==""){
			msg.val("");
			msg.css("borderColor", "crimson");
			subject.css("borderColor", "crimson")
			$(".formImg:eq(2)").css("borderColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(2)").css("color","crimson");
			flag=false;
		}
		else{
			msg.css("borderColor", "#fff");
			subject.css("borderColor", "#fff")
			$(".formImg:eq(2)").css("borderColor", "#fff").html("<i class='fas fa-pen'></i>");
			$("form i:eq(2)").css("color","#FFCBFF");
			formData.push(msg.val().trim());
		}

		if(flag){
			name.val("");
			email.val("");
			subject.val("");
			msg.val("");
			$('#submit i').removeClass('fa-paper-plane').addClass('fa-check');
			setTimeout(function(){
				$('#submit i').removeClass('fa-check').addClass('fa-paper-plane');
			},1500);
		}
	});

	$('#fullName').blur(function(){
		if(!nameRe.test(name.val())){
			name.css("borderBottomColor", "crimson");
			$(".formImg:eq(0)").css("borderBottomColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(0)").css("color","crimson");
		}
		else{
			name.css("borderBottomColor", "#fff");
			$(".formImg:eq(0)").css("borderBottomColor", "#fff").html("<i class='fas fa-user'></i>");
			$("form i:eq(0)").css("color","#FFCBFF");
		}
	});

	$('#email').blur(function(){
		if(!emailRe.test(email.val())){
			email.css("borderBottomColor", "crimson");
			$(".formImg:eq(1)").css("borderBottomColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(1)").css("color","crimson");
		}
		else{
			email.css("borderBottomColor", "#fff");
			$(".formImg:eq(1)").css("borderBottomColor", "#fff").html("<i class='fas fa-at'></i>");
			$("form i:eq(1)").css("color","#FFCBFF");
		}
	});

	$('#subject').blur(function(){
		if($(this).val().trim() == ''){
			$(this).val('');
		}
		else{
			$(this).val($(this).val().trim());
		}
	});

	$('#message').blur(function(){
		if($(this).val().trim()==""){
			$(this).val("");
			$(this).css("borderColor", "crimson");
			$('#subject').css("borderColor", "crimson")
			$(".formImg:eq(2)").css("borderColor", "crimson").html("<i class='fas fa-times'></i>");
			$("form i:eq(2)").css("color","crimson");
		}
		else{
			$(this).val($(this).val().trim());
			$(this).css("borderColor", "#fff");
			$('#subject').css("borderColor", "#fff")
			$(".formImg:eq(2)").css("borderColor", "#fff").html("<i class='fas fa-pen'></i>");
			$("form i:eq(2)").css("color","#FFCBFF");
		}
	});

		/****************** LOCAL STORAGE *************************/

	function getFavs() {
		return JSON.parse(localStorage.getItem("favorites"));
	};

	function addToFav(){
		let id = $(this).data("id");

		var favorites = getFavs();

		if(favorites) {
			if(isInLS()) {
				removeFromLS(id);
				$(this).removeClass('favorited');
			} else {
				addToLS();
				$(this).addClass('favorited');
			}
		} else {
			addFirst();
		}

		function isInLS() {
			return favorites.filter(x => x.id == id).length;
		}

		function addToLS() {
			let favorites = getFavs();
			favorites.push({
				id : id
			});
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}

		function addFirst() {
			let favorites = [];
			favorites[0] = {
				id : id
			};
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	}

	function removeFromLS(id) {
		let favs = Favorited();
		let filtered = favs.filter(p => p.id != id);
	
		localStorage.setItem("favorites", JSON.stringify(filtered));
	}

	function Favorited() {
		return JSON.parse(localStorage.getItem("favorites"));
	}

	function addFavoritedClass(favoritesLS){
		var srca = $('.fav');
		for(var j=0; j< srca.length; j++)
			for(var i=0; i<favoritesLS.length;i++){
				if($(srca[j]).data('id') == favoritesLS[i].id)
					$(srca[j]).addClass('favorited');
			}
	}
});

// 00webhost hiding ///

$(document).ready(function(){
	$("body div:last").css("display","none");
});