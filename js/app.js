$('a').on('click', function () {
	console.log($('a.' + $(this).attr('class')).val());
});