state = {
	loading: false
}

$('input').keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault()
		if (!state.loading) search()
	}
})

function searchWrapper() {
	if (!state.loading) search()
}

function search() {
	loading()
	$('#result .item').fadeOut('slow', function() {
		$('#result').empty()
	})
	
	var query = document.getElementsByTagName("input")[0].value
	if (query == "") {
		failed()
		state.loading = false
		alert('Come onnn mannn, insert somethinggg')
		return
	}
	var url = "https://kgsearch.googleapis.com/v1/entities:search?limit=20&query=" + query + "&key=AIzaSyDNSMAZvo5ds4PTM7lHKCnO_YZrYF8-3f0"

	$.ajax({
		method: "GET",
		url: url,
		success: function(result) {
			console.log(result)
			var items = result.itemListElement
			if (items.length == 0) {
				noResult()
				return
			}
			items.map((item) => {
				var image = '<img class="image" src="placeholder.png" />'
				if (item.result.image)	
					image = '<img class="image" src="' + item.result.image.contentUrl + '" />'
				
				var head = '<h3>' + item.result.name + '</h3>'
				
				var desc1 = ""
				if (item.result.description)
					desc1 = '<label>' + item.result.description + '</label>'
				
				var desc2 = ""
				var hr = ""
				var link = ""
				if (item.result.detailedDescription) {
					desc2 = '<p>' + item.result.detailedDescription.articleBody + '</p>'
					hr = '<hr>'
					link = '<a href="' + item.result.detailedDescription.url + '">Learn More..</a>'
				}
				$('#result').append(
					'<div class="item" style="display: none;">' + image + head + desc1 + desc2 + hr + link + '</div>'
				)
			})
			$('#result .item').fadeIn('slow')
			loaded()
		},
		error: function(msg) {
			failed()
			console.log(msg)
		}
	})
}

function loading() {
	$('#search-button').html('Loading..')
	state.loading = true
}

function loaded() {
	if (state.loading) {
		$('#search-button').html('Done !')
		setTimeout(function() {
			$('#search-button').html('Search')
			state.loading = false
		}, 1000)
	}
}

function failed() {
	if (state.loading) {
		$('#search-button').html('Failed, try again !')
		setTimeout(function() {
			$('#search-button').html('Search')
			state.loading = false
		}, 1500)
	}
}

function noResult() {
	if (state.loading) {
		$('#search-button').html('No Result !')
		setTimeout(function() {
			$('#search-button').html('Search')
			state.loading = false
		}, 1500)
	}
}