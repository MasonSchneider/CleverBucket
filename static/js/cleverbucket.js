
var selectedIdea = "";
var selectedFeature = "";

var start = function() {	
	// Initialize for error avoidance
	selectedIdea = $(".ideaTab")[0].attributes['id'].value;
	$(".ideaKey").val(selectedIdea);
	$("#createdDate").text(ideaDates[selectedIdea]);

	if ($(window).width() >= 980) {
		$("#"+selectedIdea + " .ideaTabItemButtons").removeClass("hidden");
	}
	else {		
		$("#"+selectedIdea + " .ideaTabItemButtons").addClass("hidden");
	}

	if ($("."+selectedIdea).length > 0) {
		selectedFeature = $("."+selectedIdea)[0].attributes['id'].value;
		$(".featKey").val(selectedFeature);
		$("#lastEdit").text(featureDates[selectedIdea+"+"+selectedFeature]);
		if ($(window).width() >= 980) {
			$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");
			$("#"+selectedFeature + " .featureTabSaveButton").removeClass("hidden");
		} else {
			$("#"+selectedFeature + " .featureTabDeleteButton").addClass("hidden");
			$("#"+selectedFeature + " .featureTabSaveButton").addClass("hidden");
		}
	}
	// Set height of idea scroll area
	var taken = $('.profileArea').height();
	taken += $('.createAndSearch').height();
	$('.ideaScrollArea').height($(window).height()-taken - 35);

	// Prevent auto select on mobile
	if ($(window).width() < 980) {

  		$("#"+selectedIdea).removeClass("selectedIdea");
  		$("#"+selectedFeature).removeClass("selectedFeature");

  		// Back button for mobile
  		$("#back-btn-idea").removeClass("hidden");
  		$("#back-btn-feature").removeClass("hidden");
  		$("#save-button-mobile").removeClass("hidden");
  		$("#idTitle").css('padding-right', '60px');
  		$("#featTitle").css('padding-right', '60px');

	} else {
		// Hide button in web
		$("#back-btn-idea").addClass("hidden");
  		$("#back-btn-feature").addClass("hidden");
  		$("#save-button-mobile").addClass("hidden");
  		$("#idTitle").css('padding-right', '0px');
  		$("#featTitle").css('padding-right', '0px');

		if ($(".ideaTab").length > 0) {
			$("#"+selectedIdea).addClass("selectedIdea");

			$('#idTitle').text($("#"+selectedIdea).children()[0].innerHTML);

			if ($("."+selectedIdea).length > 0) {
				selectedFeature = $("."+selectedIdea)[0].attributes['id'].value;
				$(".featKey").val(selectedFeature);
			$("#lastEdit").text(featureDates[selectedIdea+"+"+selectedFeature]);
				$("#"+selectedFeature).addClass("selectedFeature");
				$('#featTitle').text($("#"+selectedFeature).children()[0].innerHTML);
				$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
				$('#links').empty();
				for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
					$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
				}
				var canvas = document.getElementById('sketchCanvas');	
				$("#sketchCanvasClear").trigger('click');
				canvas.width = canvas.width;
				var context = canvas.getContext('2d');
				var imageObj = new Image();
				imageObj.onload = function() {
					context.drawImage(this, 0, 0);
				};
				imageObj.src = detailCanvas[selectedIdea+'+'+selectedFeature];
			}
		}
	}
}

$( window ).resize(function() {
	start();
});

$(document).ready(function() {start();});

$(".ideaTab").click(function() {
	$("#"+selectedIdea+" .ideaTabItemButtons").addClass("hidden");
	$("#"+selectedIdea).removeClass("selectedIdea");
	$(this).addClass("selectedIdea");
	$(".selectedIdea" + " .ideaTabItemButtons").removeClass("hidden");
	

	$("."+selectedIdea).each(function(index) {
		$(this).addClass("hidden");
	});

	$('#idTitle').text($(this).children()[0].innerHTML);

	selectedIdea = $(this).attr('id');
	$(".ideaKey").val(selectedIdea);
	$("#createdDate").text(ideaDates[selectedIdea]);
	$("."+selectedIdea).each(function(index) {
		if (index == 0 && $(window).width() > 980) {
			if (selectedFeature != "") {
				$("#"+selectedFeature+" .featureTabDeleteButton").addClass("hidden");
				$("#"+selectedFeature + " .featureTabSaveButton").addClass("hidden");
			}
			$("#"+selectedFeature).removeClass("selectedFeature");
			$(this).addClass("selectedFeature");
			selectedFeature = $(this).attr('id');
			$(".featKey").val(selectedFeature);
			$("#lastEdit").text(featureDates[selectedIdea+"+"+selectedFeature]);
			$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");			
			$("#"+selectedFeature + " .featureTabSaveButton").removeClass("hidden");
			$('#featTitle').text($("#"+selectedFeature).children()[0].innerHTML);
			$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
			$('#links').empty();
			for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
				$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
			}
			
			var canvas = document.getElementById('sketchCanvas');
			$("#sketchCanvasClear").trigger('click');
			canvas.width = canvas.width;
			var context = canvas.getContext('2d');
			var imageObj = new Image();
			
			imageObj.src = detailCanvas[selectedIdea+'+'+selectedFeature];
			
			imageObj.onload = function() {
				context.drawImage(this, 0, 0);
			};
			
		}
		$(this).removeClass("hidden");
	});
	if ($("."+selectedIdea).length == 0) {
		$("#"+selectedFeature).removeClass("selectedFeature");
		selectedFeature = 'zzzaaaazzzzdfasdfz';
		$('#featTitle').text("No Features");
		$("#lastEdit").text("");
		$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
		$('#links').empty();
		for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
			$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
		}
		var canvas = document.getElementById('sketchCanvas');
		$("#sketchCanvasClear").trigger('click');
		canvas.width = canvas.width;
	}
	$('.ideaCol').addClass('hidden-xs').addClass('hidden-sm');
	$('.featureCol').removeClass('hidden-xs').removeClass('hidden-sm');
});

$(".featureTab").click(function() {
	
	$("#"+selectedFeature+" .featureTabDeleteButton").addClass("hidden");	
	$("#"+selectedFeature + " .featureTabSaveButton").addClass("hidden");
	$("#"+selectedFeature).removeClass("selectedFeature");
	$(this).addClass("selectedFeature");
	selectedFeature = $(this).attr('id');
	$("#lastEdit").text(featureDates[selectedIdea+"+"+selectedFeature]);
	$(".featKey").val(selectedFeature);
	$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");
	$("#"+selectedFeature + " .featureTabSaveButton").removeClass("hidden");

	$('#featTitle').text($(this).children()[0].innerHTML);
	$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
	$('#links').empty();
	for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
		$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
	}
	var canvas = document.getElementById('sketchCanvas');
	$("#sketchCanvasClear").trigger('click');
	canvas.width = canvas.width;
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.onload = function() {
		context.drawImage(this, 0, 0);
	};
	imageObj.src = detailCanvas[selectedIdea+'+'+selectedFeature];
	$('.featureCol').addClass('hidden-xs').addClass('hidden-sm');
	$('.detailCol').removeClass('hidden-xs').removeClass('hidden-sm');
});

$("#back-btn-idea").click(function() {
	$('.ideaCol').removeClass('hidden-xs').removeClass('hidden-sm');
	$('.featureCol').addClass('hidden-xs').addClass('hidden-sm');
	$("#"+selectedIdea+" .ideaTabItemButtons").addClass("hidden");
	$("#"+selectedIdea).removeClass("selectedIdea");
});

$("#back-btn-feature").click(function() {
	$('.featureCol').removeClass('hidden-xs').removeClass('hidden-sm');
	$('.detailCol').addClass('hidden-xs').addClass('hidden-sm');
	$("#"+selectedFeature+" .featureTabDeleteButton").addClass("hidden");	
	$("#"+selectedFeature + " .featureTabSaveButton").addClass("hidden");
	$("#"+selectedFeature).removeClass("selectedFeature");
});

$("#linkForm").submit(function(event) {
	var title = $("#link-title-input").val();
	var url = $("#link-url-input").val();
	if(url.substring(0,7) != "http://" && url.substring(0,8) != "https://"){
		url = "";
	}
	if (url.length > 0 && title.length > 0) {
		detailLinks[selectedIdea+'+'+selectedFeature].push([title, url]);
		$('#links').append('<li><a href="'+url+'">'+title+'</a></li>');
	}
	$("#new-link-modal").modal("hide");
	return false;
});

$(".save-feature").click(function() {
	var info = $("#detailArea").val();
	var linkText = [];
	var linkUrls = [];
	$("#links").children("li").each(function(index) {
		var text = $(this).find('a').text();
		var url = $(this).find('a').attr('href')
		linkText.push(text);
		linkUrls.push(url);
	});
	var canvas = document.getElementById('sketchCanvas');
	var image = canvas.toDataURL();

	$.post("/updateFeature", { "key": selectedFeature, "info": info, "texts": linkText, "urls": linkUrls, "img": image });

	detailText[selectedIdea+'+'+selectedFeature] = info;
	detailCanvas[selectedIdea+'+'+selectedFeature] = image;
	featureDates[selectedIdea+"+"+selectedFeature] = "Recently";
	$("#lastEdit").text(featureDates[selectedIdea+"+"+selectedFeature]);
	
});

var $rows = $('.ideaTabItem');
$("#srch-term").keyup(function(){
		var searchT = $.trim(this.value).toUpperCase();
		if(searchT === ""){
		$rows.parent().show();
		}else{
			$rows.parent().hide();
			$rows.filter(function() {
				console.log($(this).text());
			return -1 != $(this).text().toUpperCase().indexOf(searchT); }).parent().show();
		}
});


