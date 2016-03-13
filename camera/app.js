CameraTool.initCameraOn('camera')

function capture() {
	if (CameraTool.status == 'will_cap') {
		CameraTool.captureTo('photo')
	} else {
		$('#overlay').empty()
		CameraTool.showCamera()
	}
}

$('body').on('mousedown', '#sticker-list li img', function() {
	var newImg = $(this).clone().css({width: "150px", height: "auto"})
	$('#overlay').append(newImg)
	newImg.addClass('draggable').parents().on('mousemove', function(e) {
		$('.draggable').offset({
			top: e.pageY - $('.draggable').outerHeight() / 2,
            left: e.pageX - $('.draggable').outerWidth() / 2
		}).on('mouseup', function() {
			$('.draggable').removeClass('draggable');
		})
		e.preventDefault()
	}).on('mouseup', function() {
        $('.draggable').removeClass('draggable');
    });
})

$('body').on('mousedown', '#overlay img', function() {
	$(this).addClass('draggable').parents().on('mousemove', function(e) {
		$('.draggable').offset({
			top: e.pageY - $('.draggable').outerHeight() / 2,
            left: e.pageX - $('.draggable').outerWidth() / 2
		}).on('mouseup', function() {
			// oldImg.show()
			$('.draggable').removeClass('draggable');
		})
		e.preventDefault()
	}).on('mouseup', function() {
        $('.draggable').removeClass('draggable');
    });
})

$('body').on('click', '#overlay img', function(e) {
	$('.clicked').removeClass('clicked')
	$(this).addClass('clicked')
})

$(document).on('keydown', function(e) {
	var c = $('.clicked')
	var ratio = parseFloat(c.css('width')) / parseFloat(c.css('height'));
	if (!e.shiftKey) {
		switch (e.keyCode) {
			case 8:
				c.removeClass('clicked');
				break;
			case 37:
				c.css('left', (parseFloat(c.css('left')) - 5) + 'px');
				break;
			case 38:
				c.css('top', (parseFloat(c.css('top')) - 5) + 'px');
				break;
			case 39:
				c.css('left', (parseFloat(c.css('left')) + 5) + 'px');
				break;
			case 40:
				c.css('top', (parseFloat(c.css('top')) + 5) + 'px');
				break;
			case 219:
				c.css('height', (parseFloat(c.css('height')) - 5) + 'px');
				c.css('width', (parseFloat(c.css('height')) * ratio) + 'px');
				break;
			case 221:
				c.css('height', (parseFloat(c.css('height')) + 5) + 'px');
				c.css('width', (parseFloat(c.css('height')) * ratio) + 'px');
				break;
			default: 
				console.log(e.keyCode)
		}
	} else {
		switch (e.keyCode) {
			case 37:
				c.css('transform', 'rotate(' + (c.getRotateAngle()[0] - 4) + ')')
				break;
			case 38:
				c.css('height', (parseFloat(c.css('height')) + 5) + 'px');
				c.css('width', (parseFloat(c.css('height')) * ratio) + 'px');
				break;
			case 39:
				c.rotate(c.getRotateAngle()[0] + 4)
				break;
			case 40:
				c.css('height', (parseFloat(c.css('height')) - 5) + 'px');
				c.css('width', (parseFloat(c.css('height')) * ratio) + 'px');
				break;
			default: 
				console.log(e.keyCode)
		}
	}
	e.preventDefault()
})
