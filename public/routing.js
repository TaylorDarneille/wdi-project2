$('.delete-link').click(function(e) {
	e.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE',
		success: function(data){
					window.location.href = '/posts?siteId=1&topicId=1';
				}
	});
});

$('#put-form').on('submit', function(e) {
  	e.preventDefault();
	$.ajax({
		method: 'PUT',
		url: $(this).attr('action'),
		data: {
			subject: $('#updated-subject').val(),
			content: $('#updated-content').val()
		},
		success: function(data) {
			window.location.href="/auth/profile";
		}
	});
});