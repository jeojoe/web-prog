  $(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'anthem.mp3');
    audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.pause()

    // $.get();

    // audioElement.addEventListener("load", function() {
    //     audioElement.play();
    // }, true);
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);

    $('.start-peace').click(function() {
        audioElement.play();
    });

});

function initPeace() {
  $('.welcome').slideUp(4000)
}

const defaultQuote = `<h2>Hey You !</h2>
				 We want to say that he's so good at world peace so 
				 <span class="big">MOVE YOUR MOUSE ON OUR FACES RIGHT NOW! OR I WILL PEACE YOU with my POINTY nuclear warheeeaad !</span>`
const maoQuote = `<h2>" If i had a chance to work with him i would give him all the stars on my country's flags ! "</h2>
				 -- Mao Tse Tung, Chinese peace maker`
const stalinQuote = `<h2>" I can send anyone in Soviet Union to die except him ! There's so much peace in him. "</h2>
				 -- Joseph Stalin, USSR peace maker`
const leninQuote = `<h2>" Two greatest days on the earth are Red October Revolution Day and Jirat's Birthday ! "</h2>
				 -- Vladimir Lenin, Political Theorist for Peace`
const marxQuote = `<h2>" Everything they said is true! we Garantee it with the length of our beard."</h2>
				 -- Marx & Engel, authors of 'Communist Manifesto' the best book for making PEACE`
$('.mao').hover(function() {
	$('.quote blockquote').html(maoQuote)
	$('.pointy').css('left', '25px')
}, function() {
	$('.quote blockquote').html(defaultQuote)
})

$('.stalin').hover(function() {
	$('.quote blockquote').html(stalinQuote)
	$('.pointy').css('left', '100px')
}, function() {
	$('.quote blockquote').html(defaultQuote)
})

$('.lenin').hover(function() {
	$('.quote blockquote').html(leninQuote)
	$('.pointy').css('left', '180px')
}, function() {
	$('.quote blockquote').html(defaultQuote)
})

$('.marx').hover(function() {
	$('.quote blockquote').html(marxQuote)
	$('.pointy').css('left', '300px')
}, function() {
	$('.quote blockquote').html(defaultQuote)
})

var state = 1
$('.box').animate({opacity: 0})
$('.box.background').animate({opacity: 1})

function rotateClock() {
	if (state === 1) {
		state = 2
		$('.detail').rotate({ endDeg:-90, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.skill').animate({opacity: 1})
	} else if (state === 2) {
		state = 3
		$('.detail').rotate({ endDeg:-155, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.exp').animate({opacity: 1})
	} else if (state === 3) {
		state = 4
		$('.detail').rotate({ endDeg:-287, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.interest').animate({opacity: 1})
	} else if (state === 4) {
		state = 1
		$('.detail').rotate({ endDeg:-360, easing:'ease-out'})
		$('.box').animate({opacity: 0})
		$('.box.background').animate({opacity: 1})
	} 
}

function rotateCouterClock() {
	if (state === 1) {
		state = 4
		$('.detail').rotate({ endDeg:73, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.interest').animate({opacity: 1})
	} else if (state === 4) {
		state = 3
		$('.detail').rotate({ endDeg:205, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.exp').animate({opacity: 1})
	} else if (state === 3) {
		state = 2
		$('.detail').rotate({ endDeg:270, easing:'ease-out', persist:true })
		$('.box').animate({opacity: 0})
		$('.box.skill').animate({opacity: 1})
	} else if (state === 2) {
		state = 1
		$('.detail').rotate({ endDeg:360, easing:'ease-out'})
		$('.box').animate({opacity: 0})
		$('.box.background').animate({opacity: 1})
	} 
}

// credit : http://jsfiddle.net/Anatol/T6kDR/

$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
          .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
            .css(prefixed('transform', 'rotate('+deg+'deg)'))
            .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};