
var selectedIdea = "";
var selectedFeature = "";

var start = function() {	
	// Initialize for error avoidance
	selectedIdea = $(".ideaTab")[0].attributes['id'].value;
	if ($("."+selectedIdea).length > 0) {
		selectedFeature = $("."+selectedIdea)[0].attributes['id'].value;
		if ($(window).width() >= 980) {
			$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");
			$("#"+selectedIdea + " .ideaTabItemButtons").removeClass("hidden");
		} else {
			$("#"+selectedFeature + " .featureTabDeleteButton").addClass("hidden");
			$("#"+selectedIdea + " .ideaTabItemButtons").addClass("hidden");
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
  		$("#idTitle").css('padding-right', '60px');
  		$("#featTitle").css('padding-right', '60px');

	} else {
		// Hide button in web
		$("#back-btn-idea").addClass("hidden");
  		$("#back-btn-feature").addClass("hidden");
  		$("#idTitle").css('padding-right', '0px');
  		$("#featTitle").css('padding-right', '0px');

		if ($(".ideaTab").length > 0) {
			$("#"+selectedIdea).addClass("selectedIdea");

			$('#idTitle').text($("#"+selectedIdea).children()[0].innerHTML);

			if ($("."+selectedIdea).length > 0) {
				selectedFeature = $("."+selectedIdea)[0].attributes['id'].value;
				$("#"+selectedFeature).addClass("selectedFeature");
				$('#featTitle').text($("#"+selectedFeature).children()[0].innerHTML);
				$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
				$('#links').empty();
				for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
					$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
				}
				var canvas = document.getElementById('sketchCanvas');
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
	$("."+selectedIdea).each(function(index) {
		if (index == 0 && $(window).width() > 980) {	
			$("#"+selectedFeature+" .featureTabDeleteButton").addClass("hidden");	
			$("#"+selectedFeature).removeClass("selectedFeature");
			$(this).addClass("selectedFeature");
			selectedFeature = $(this).attr('id');
			$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");
			$('#featTitle').text($("#"+selectedFeature).children()[0].innerHTML);
			$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
			$('#links').empty();
			for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
				$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
			}
			var canvas = document.getElementById('sketchCanvas');
			canvas.width = canvas.width;
			var context = canvas.getContext('2d');
			var imageObj = new Image();
			imageObj.onload = function() {
				context.drawImage(this, 0, 0);
			};
			imageObj.src = detailCanvas[selectedIdea+'+'+selectedFeature];
		}
		$(this).removeClass("hidden");
	});
	if ($("."+selectedIdea).length == 0) {
		$("#"+selectedFeature).removeClass("selectedFeature");
		selectedFeature = 'zzzaaaazzzzdfasdfz';
		$('#featTitle').text("No Features");
		$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
		$('#links').empty();
		for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
			$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
		}
		var canvas = document.getElementById('sketchCanvas');
		canvas.width = canvas.width;
	}
	$('.ideaCol').addClass('hidden-xs').addClass('hidden-sm');
	$('.featureCol').removeClass('hidden-xs').removeClass('hidden-sm');
});

$(".featureTab").click(function() {
	$("#"+selectedFeature+" .featureTabDeleteButton").addClass("hidden");
	$("#"+selectedFeature).removeClass("selectedFeature");
	$(this).addClass("selectedFeature");
	selectedFeature = $(this).attr('id');
	$("#"+selectedFeature + " .featureTabDeleteButton").removeClass("hidden");

	$('#featTitle').text($(this).children()[0].innerHTML);
	$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
	$('#links').empty();
	for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
		$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
	}
	var canvas = document.getElementById('sketchCanvas');
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
	$("#"+selectedFeature).removeClass("selectedFeature");
});