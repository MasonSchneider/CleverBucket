
var selectedIdea = "";
var selectedFeature = "";

$(document).ready(function() {
	if ($(".ideaTab").length > 0) {
		selectedIdea = $(".ideaTab")[0].attributes['id'].value;
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
		}
	}
});

$(".ideaTab").click(function() {
	$("#"+selectedIdea).removeClass("selectedIdea");
	$(this).addClass("selectedIdea");

	$("."+selectedIdea).each(function(index) {
		$(this).addClass("hidden");
	});

	$('#idTitle').text($(this).children()[0].innerHTML);

	selectedIdea = $(this).attr('id');
	$("."+selectedIdea).each(function(index) {
		if (index == 0) {
			$(this).addClass("selectedFeature");
			$("#"+selectedFeature).removeClass("selectedFeature");			
			selectedFeature = $(this).attr('id');
			$('#featTitle').text($("#"+selectedFeature).children()[0].innerHTML);
			$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
			$('#links').empty();
			for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
				$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
			}
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
	}
});

$(".featureTab").click(function() {
	$("#"+selectedFeature).removeClass("selectedFeature");
	$(this).addClass("selectedFeature");
	selectedFeature = $(this).attr('id');

	$('#featTitle').text($(this).children()[0].innerHTML);
	$('#detailArea').val(detailText[selectedIdea+'+'+selectedFeature]);
	$('#links').empty();
	for(var link in detailLinks[selectedIdea+'+'+selectedFeature]) {
		$('#links').append('<li><a href="'+detailLinks[selectedIdea+'+'+selectedFeature][link][1]+'">'+detailLinks[selectedIdea+'+'+selectedFeature][link][0]+'</a></li>');
	}
});