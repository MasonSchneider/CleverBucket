
var selectedIdea = "";
var selectedFeature = "";

$(document).ready(function() {
	if ($(".ideaTab").length > 0) {
		selectedIdea = $(".ideaTab")[0].attributes['id'].value;
		$("#"+selectedIdea).addClass("selectedIdea");
		if ($("."+selectedIdea).length > 0) {
			selectedFeature = $("."+selectedIdea)[0].attributes['id'].value;
			$("#"+selectedFeature).addClass("selectedFeature");
		}
	}
});

$(".ideaTab").click(function() {
	$("#"+selectedIdea).removeClass("selectedIdea");
	$(this).addClass("selectedIdea");

	$("."+selectedIdea).each(function(index) {
		$(this).addClass("hidden");
	});

	selectedIdea = $(this).attr('id');
	$("."+selectedIdea).each(function(index) {
		if (index == 0) {
			$(this).addClass("selectedFeature");
			$("#"+selectedFeature).removeClass("selectedFeature");			
			selectedFeature = $(this).attr('id');
		}
		$(this).removeClass("hidden");
	});
	if ($("."+selectedIdea).length == 0) {
		$("#"+selectedFeature).removeClass("selectedFeature");
		selectedFeature = 'zzzaaaazzzzdfasdfz';
	}
});

$(".featureTab").click(function() {
	$("#"+selectedFeature).removeClass("selectedFeature");
	$(this).addClass("selectedFeature");
	selectedFeature = $(this).attr('id');
});