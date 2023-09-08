$(document).ready(function () {
  $(window).bind('capsOn', function (event) {
    if ($('#modalSigninVerticalPassword:focus').length > 0) {
      $('#capsWarning').show();
    }
  });
  $(window).bind('capsOff capsUnknown', function (event) {
    $('#capsWarning').hide();
  });
  $('#modalSigninVerticalPassword').bind('focusout', function (event) {
    $('#capsWarning').hide();
  });
  $('#modalSigninVerticalPassword').bind('focusin', function (event) {
    if ($(window).capslockstate('state') === true) {
      $('#capsWarning').show();
    }
  });

  $(window).bind('capsChanged', function (event) {
    $('#changetext').html('changed').show().fadeOut();
  });

  $(window).capslockstate();

  new Mmenu(document.querySelector('#menu'), {
    onClick: {
      close: true,
    },
    navbars: [
      {
        position: 'top',
        content: ['prev', 'title'],
      },
    ],
  });

  updateSlider2();
});

$('.alphaonly').bind('keyup', function () {
  var node = $(this);
  node.val(node.val().replace(/[^a-zA-Z ]/g, ''));
});

$('.numberonly').bind('keyup', function () {
  var node = $(this);
  node.val(node.val().replace(/[^0-9]/g, ''));
});

$('.alphanumericonly').bind('keyup', function () {
  var node = $(this);
  node.val(node.val().replace(/[^A-Za-z0-9]+/g, ''));
});

$('.phone').bind('keyup', function () {
  var $this = $(this);
  var input = $this.val();
  var input = input.replace(/[\D\s\._\-]+/g, '');
  var split = 3;
  var chunk = [];
  for (var i = 0, len = input.length; i < len; i += split) {
    split = i >= 4 && i <= 10 ? 4 : 3;
    chunk.push(input.substr(i, split));
  }
  $this.val(function () {
    return chunk.join('-').toUpperCase();
  });
});

$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[role="button"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            }
          }
        );
      }
    }
  });

$('li.image-filter').on('click', function () {
  $('li.image-filter').removeClass('active');
  $('li.image-filter-2').removeClass('active');
  $(this).addClass('active');
  $('img.showImage').hide();
  $('img.showImage-2').hide();
  $($('img.showImage')[parseInt($(this).attr('data-image'))]).show();
  $($('img.showImage-2')[parseInt($(this).attr('data-image'))]).show();
  $($('li.image-filter-2')[[parseInt($(this).attr('data-image'))]]).addClass(
    'active'
  );
});
$('li.image-filter-2').on('click', function () {
  $('li.image-filter').removeClass('active');
  $('li.image-filter-2').removeClass('active');
  $(this).addClass('active');
  $('img.showImage').hide();
  $('img.showImage-2').hide();
  $($('img.showImage')[parseInt($(this).attr('data-image'))]).show();
  $($('img.showImage-2')[parseInt($(this).attr('data-image'))]).show();
  $($('li.image-filter')[[parseInt($(this).attr('data-image'))]]).addClass(
    'active'
  );
});

var clipboard_referal = new ClipboardJS('#p_btn_referal');

clipboard_referal.on('success', function (e) {
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
});

clipboard_referal.on('error', function (e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});

var clipboard_netflix = new ClipboardJS('#referal_netflix_copy_btn');

clipboard_netflix.on('success', function (e) {
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
});

clipboard_netflix.on('error', function (e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});

if ($('.btn.share').length) {
  $('.btn.share').tooltip({
    trigger: 'click',
    placement: 'bottom',
  });
}

function setTooltip(btn, message) {
  $(btn).tooltip('hide').attr('data-original-title', message).tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function () {
    $(btn).tooltip('hide');
  }, 1000);
}

$('#netflixAccessForm').on('submit', function (e) {
  e.preventDefault();
  // console.log('make ur;')
  $.ajax({
    type: 'post',
    url: '/services/nexflix-access-code-submit/',
    data: $('#netflixAccessForm').serialize(),
    success: function (result) {
      if (result['status'] == 'success') {
        document.getElementById('success_code').click();
      } else if (result['status'] == 'error') {
        $('#Netflix_feedback').html(
          `<p style="color:red" class= 'mt-4 mb-0'> ${result['message']}</p>`
        );
      }
    },
    error: function (error) {},
  });
});

$('.bg-color-saving').on('click', function (e) {
  $('.bg-color-saving').removeClass('active');
  $(this).addClass('active');
});
$('.bg-color-saving-circle').on('click', function (e) {
  $('.bg-color-saving-circle').removeClass('active');
  $(this).addClass('active');
});
function updateSlider() {
  // console.log("Calculator")
  var z = $('[name="totalcostAmount"]');
  var w = $('#savings_amount');
  var w_m = $('#savings_amount_m');
  var w1 = $('div#mobileView>#savings_amount');
  var results = 0;
  // console.log("z, w, w1", z, w ,w1)
  if ($('#options1').is(':checked')) {
    if ($('#options_accounts1').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 30) * 12;
    } else if ($('#options_accounts2').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 30) * 12;
    } else if ($('#options_accounts3').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 30) * 12;
    } else if ($('#options_accounts4').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 30) * 12;
    }
  }
  if ($('#options2').is(':checked')) {
    if ($('#options_accounts1').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 30) * 12;
    } else if ($('#options_accounts2').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 30) * 12;
    } else if ($('#options_accounts3').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 30) * 12;
    } else if ($('#options_accounts4').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 30) * 12;
    }
  }
  if ($('#options3').is(':checked')) {
    if ($('#options_accounts1').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 35) * 12;
    } else if ($('#options_accounts2').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 35) * 12;
    } else if ($('#options_accounts3').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 35) * 12;
    } else if ($('#options_accounts4').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 35) * 12;
    }
  }
  if ($('#options4').is(':checked')) {
    if ($('#options_accounts1').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 35) * 12;
    } else if ($('#options_accounts2').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 35) * 12;
    } else if ($('#options_accounts3').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 35) * 12;
    } else if ($('#options_accounts4').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 35) * 12;
    }
  }
  if (results < 0) {
    $('#negative_results,  div#mobileView>#negative_results').removeClass(
      'd-none'
    );
    $(
      '#dollar_results, #year_results, #savings_amount, div#mobileView>#dollar_results, div#mobileView>#year_results, div#mobileView>#savings_amount'
    ).addClass('d-none');
  } else {
    if (isNaN(results)) {
      results = 0;
    }
    var R = results;
    w.html(results);
    w_m.html(results);
    String(R).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    w.html(String(R).replace(/(.)(?=(\d{3})+$)/g, '$1,'));
    w1.html(String(R).replace(/(.)(?=(\d{3})+$)/g, '$1,'));
    $('#negative_results, div#mobileView>#negative_results').addClass('d-none');
    $(
      '#dollar_results, #savings_amount, #year_results, div#mobileView>#dollar_results, div#mobileView>#year_results, div#mobileView>#savings_amount'
    ).removeClass('d-none');
  }
}

function updateSlider2() {
  var z = $('[name="totalcostAmount_m"]');
  var w_m = $('#savings_amount_m');
  var w1 = $('div#mobileView>#savings_amount');
  var results = 0;
  if ($('#options1_m').is(':checked')) {
    if ($('#options_accounts1_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 30) * 12;
    } else if ($('#options_accounts2_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 30) * 12;
    } else if ($('#options_accounts3_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 30) * 12;
    } else if ($('#options_accounts4_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 30) * 12;
    }
  }
  if ($('#options2_m').is(':checked')) {
    if ($('#options_accounts1_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 30) * 12;
    } else if ($('#options_accounts2_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 30) * 12;
    } else if ($('#options_accounts3_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 30) * 12;
    } else if ($('#options_accounts4_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 30) * 12;
    }
  }
  if ($('#options3_m').is(':checked')) {
    if ($('#options_accounts1_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 35) * 12;
    } else if ($('#options_accounts2_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 35) * 12;
    } else if ($('#options_accounts3_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 35) * 12;
    } else if ($('#options_accounts4_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 35) * 12;
    }
  }
  if ($('#options4_m').is(':checked')) {
    if ($('#options_accounts1_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 1 * 35) * 12;
    } else if ($('#options_accounts2_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 2 * 35) * 12;
    } else if ($('#options_accounts3_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 3 * 35) * 12;
    } else if ($('#options_accounts4_m').is(':checked')) {
      results = parseFloat(parseFloat(z.val()) - 4 * 35) * 12;
    }
  }
  if (results < 0) {
    $('#negative_results,  div#mobileView>#negative_results').removeClass(
      'd-none'
    );
    $(
      '#dollar_results, #year_results, #savings_amount_m, div#mobileView>#dollar_results, div#mobileView>#year_results, div#mobileView>#savings_amount_m'
    ).addClass('d-none');
  } else {
    if (isNaN(results)) {
      results = 0;
    }
    // console.log("results", results)
    var R = results;
    w_m.html(results);
    String(R).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    w_m.html(String(R).replace(/(.)(?=(\d{3})+$)/g, '$1,'));
    $('#negative_results, div#mobileView>#negative_results').addClass('d-none');
    $(
      '#dollar_results, #savings_amount_m, #year_results, div#mobileView>#dollar_results, div#mobileView>#year_results, div#mobileView>#savings_amount_m'
    ).removeClass('d-none');
  }
}

window.addEventListener(
  'load',
  function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
  },
  false
);
