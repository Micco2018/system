$('.js_title').on('click', 'li', function() {
	var index = $(this).index();
	$('.js_title li').removeClass('show');
	$(this).addClass('show');
	$('.js_content li').removeClass('showLi');
	$('.js_content li').eq(index).addClass('showLi');
});