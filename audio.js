var audio;

//hide pause btn
$('#pausebtn').hide();

//initialize audio
initAudio($('#playlist li:first-child'));

//initialize functions
function initAudio(element) {
  var song = element.attr('song');
  var title = element.text();
  var cover = element.attr('cover');
  var artist = element.attr('artist');

  //create an audio object
  audio = new Audio(song);

  if (!audio.currentTime) {
    $('#duration').text('0.00');
  }

  $('#audioplayer .title').text(title);
  $('#audioplayer .artist').text(artist);

  //Insert Cover

  $('.cover').attr('src', 'img/' + cover);
  $('#playlist li').removeClass('active');
  element.addClass('active');
}

//play button
$('#playbtn').click(function () {
  audio.play().then(function () {
    $('#playbtn').hide();
    $('#pausebtn').show();
    $('#duration').fadeIn(400);
    showDuration();
  });
});

$('#pausebtn').click(function () {
  audio.pause();
  $('#pausebtn').hide();
  $('#playbtn').show();
});

$('#stopbtn').click(function () {
  audio.pause();
  audio.currentTime = 0;
  $('#pausebtn').hide();
  $('#playbtn').show();
  $('#duration').fadeOut(400);
});

$('#nextbtn').click(function () {
  audio.pause();
  $('#playbtn').hide();
  $('#pausebtn').show();
  var next = $('#playlist li.active').next();
  if (next.length == 0) {
    next = $('#playlist li:first-child');
  }

  initAudio(next);
  audio.play();
  showDuration();
});

$('#prevbtn').click(function () {
  audio.pause();
  $('#playbtn').hide();
  $('#pausebtn').show();
  var prev = $('#playlist li.active').prev();
  if (prev.length == 0) {
    prev = $('#playlist li:last-child');
  } else initAudio(prev);
  audio.play();
  showDuration();
});

//volume
$('#volume').change(function () {
  audio.volume = parseFloat(this.value / 10);
});

//time duration
function showDuration() {
  $(audio).bind('timeupdate', function () {
    //get minutes
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime / 60) % 60);

    if (s < 10) {
      s = '0' + s;
    }

    $('#duration').html(m + ':' + s);

    var value = 0;
    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }

    $('#progress').css('width', value + '%');
  });
}
