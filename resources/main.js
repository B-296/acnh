var fishCookie = getCookie("fish");
var bugCookie = getCookie("bug");
var fossilCookie = getCookie("fossil");
var artCookie = getCookie("art");
var darkModeCookie = getCookie("darkMode");
var hemiCookie = getCookie("hemi");

if( hemiCookie == null ) {
  setCookie('hemi', 'north', 31);
}

if (fishCookie == null){
  var i = 0;
  var fishCookieVal = '';

  for (i = 0; i < 80; i++) {
    fishCookieVal = fishCookieVal + "0";
  } 

  setCookie('fish', fishCookieVal, 31);
  fishCookie = fishCookieVal;
}

if (bugCookie == null){
  var i = 0;
  var bugCookieVal = '';

  for (i = 0; i < 80; i++) {
    bugCookieVal = bugCookieVal + "0";
  } 

  setCookie('bug', bugCookieVal, 31);
  bugCookie = bugCookieVal;
}

if (fossilCookie == null){
  var i = 0;
  var fossilCookieVal = '';

  for (i = 0; i < 80; i++) {
    fossilCookieVal = fossilCookieVal + "0";
  } 

  setCookie('fossil', fossilCookieVal, 31);
  fossilCookie = fossilCookieVal;
}

if (artCookie == null){
  var i = 0;
  var artCookieVal = '';

  for (i = 0; i < 80; i++) {
    artCookieVal = artCookieVal + "0";
  } 

  setCookie('art', artCookieVal, 31);
  artCookie = artCookieVal;
}

if (darkModeCookie == null){
  setCookie('darkMode', 'false', 31);
  darkModeCookie = 'false';
}

$(document).ready(function(){
  toggleDarkMode(false);

  // Preloader
  $('.preloader').fadeOut(1000);
  console.log("Preload...");
  setTimeout(function () {
      $('.preloader-container').css('pointer-events', 'none').fadeOut(1000);
      loadContent();
      setTimeout(function () {
          $('.preloader-container').remove();
      }, 1000);
  }, 1000);

  // Dark / Light Mode
  $("body").delegate(".dm-nav-link", "click", function(){
    toggleDarkMode();
  });

  if( $('.search').length ) {
    changeHemi(true);
  }

  // Scroll to top
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 300) {
      $('.scroll-top-link').fadeIn();
    } else {
      $('.scroll-top-link').fadeOut();
    }
  });

  // Prevent closing drop down
  $('.filter-list').click(function(e) {
    e.stopPropagation();
  });

  // Toggle caught item
  $("body").delegate(".list-item-col", "click", function() {
    
    var id = $(this).find('.list-item-id').html();
    if( $(this).find(".got").hasClass("caught-false") )
    {
      $(this).find(".got").removeClass("caught-false").addClass("caught-true");
      $(this).find(".fa-times").removeClass("fa-times").addClass("fa-check");

      if( $('#fish-list').length ) {
        var splitVal = getCookie("fish").split('');
        splitVal[id - 1] = '1';
        setCookie('fish', splitVal.join(''), 31);
      }

      if( $('#bug-list').length ) {
        var splitVal = getCookie("bug").split('');
        splitVal[id - 1] = '1';
        setCookie('bug', splitVal.join(''), 31);
      }

      if( $('#fossil-list').length ) {
        var splitVal = getCookie("fossil").split('');
        splitVal[id - 1] = '1';
        setCookie('fossil', splitVal.join(''), 31);
      }

      if( $('#art-list').length ) {
        var splitVal = getCookie("art").split('');
        splitVal[id - 1] = '1';
        setCookie('art', splitVal.join(''), 31);
      }
    }
    else
    {
      $(this).find(".got").removeClass("caught-true").addClass("caught-false");
      $(this).find(".fa-check").removeClass("fa-check").addClass("fa-times");

      if( $('#fish-list').length ) {
        var splitVal = getCookie("fish").split('');
        splitVal[id - 1] = '0';
        setCookie('fish', splitVal.join(''), 31);
      }

      if( $('#bug-list').length ) {
        var splitVal = getCookie("bug").split('');
        splitVal[id - 1] = '0';
        setCookie('bug', splitVal.join(''), 31);
      }

      if( $('#fossil-list').length ) {
        var splitVal = getCookie("fossil").split('');
        splitVal[id - 1] = '0';
        setCookie('fossil', splitVal.join(''), 31);
      }

      if( $('#art-list').length ) {
        var splitVal = getCookie("art").split('');
        splitVal[id - 1] = '0';
        setCookie('art', splitVal.join(''), 31);
      }
    }

    if( $('#fossil-list').length ) {
      $('.progress-count').text($('.caught-true').length + " / 73");
      var barWidth = (($('.caught-true').length / 73) * 100);
      $('.progress-bar-fg').css("width", barWidth + "%")
    } else if( $('#art-list').length ) {
      $('.progress-count').text($('.caught-true').length + " / 38");
      var barWidth = (($('.caught-true').length / 38) * 100);
      $('.progress-bar-fg').css("width", barWidth + "%")
    } else {
      $('.progress-count').text($('.caught-true').length + " / 80");
      var barWidth = (($('.caught-true').length / 80) * 100);
      $('.progress-bar-fg').css("width", barWidth + "%")
    }

    filterList();
  });
    
  // Change sort order
  $("body").delegate(".sort-by-btn", "click", function() {
    $('#sort-order-txt').html("Sort By: " + $(this).html());
    $('.sort-by-btn').removeClass('bold');
    $(this).addClass('bold');

    if( $('#fish-list').length ) {
      sortFish($(this).html());
    }

    if( $('#bug-list').length ) {
      sortBugs($(this).html());
    }

    if( $('#fossil-list').length ) {
      sortFossils($(this).html());
    }

    if( $('#art-list').length ) {
      sortArt($(this).html());
    }
  });

  // Change hemisphere
  $("body").delegate(".hemi-select", "click", function() {
    changeHemi();
  });

  // Filter
  $('.filter-list .checkbox label input').change(function() {
    filterList();
  });

  // Search list
  $(".search").on("keyup", function() {
    
    $('.search-error').hide();
    var searchTerm = $(this).val().toLowerCase();
    var count = 0;

    $('.list-item-col').each(function() {
      var _this = $(this).parent();
      var title = _this.attr('id').replace('_', ' ');
      if( searchTerm == '' ) {
        _this.removeClass("search-hide");
        count++;
      } else if (title.indexOf(searchTerm) < 0) {
          _this.addClass("search-hide");
      } else {
        _this.removeClass("search-hide");
        count++;
      }
    });

    if( $('#fish-list').length ) {
      if( count > 80 ) { count = 80; }
    }

    if( $('#bug-list').length ) {
      if( count > 80 ) { count = 80; }
    }

    if( $('#fossil-list').length ) {
      if( count > 73 ) { count = 73; }
    }

    if( $('#art-list').length ) {
      if( count > 38 ) { count = 38; }
    }
    
    $('.showing-count').html(count);

    if( count == 0 )
    {
      $('.search-error').show();
    }
  });
});

function listFish() {
  $.getJSON('/acnh/resources/data/fish.json', function(data) {

    var i = 0;
    var x = 0;
    jQuery.each( data, function(y, val) {

      var details = $.map(val[0], function(value, index) {
        return [value];
      });

      var valClean = y.replace(' ', '_').replace(' ', '_').toLowerCase();
      var instance = $("#fish-template").clone();
      instance.attr("id", valClean );
      $('#fish-list').append(instance);

      if (details[2].indexOf(', ') > -1) { $("#" + valClean  + ' .fish-time').addClass('multi-times'); }
      if (details[4].indexOf(', ') > -1) { $("#" + valClean  + ' .months-north').addClass('multi-months'); }
      if (details[6].indexOf(', ') > -1) { $("#" + valClean  + ' .months-south').addClass('multi-months'); }

      details[1] = details[1].replace('(Clifftop)', '<small>(Clifftop)</small>');
      details[1] = details[1].replace('(Mouth)', '<small>(Mouth)</small>');
      details[1] = details[1].replace('(Rain)', '<small>(Rain)</small>');

      details[9] = details[9].replace('(Fin)', '<small>(Fin)</small>');

      $("#" + valClean  + ' .list-item-name').text(y);
      $("#" + valClean  + ' .list-item-image').css("background-image", 'url(' + "/acnh/resources/fish-img/" + details[0] + ".png" + ')');
      $("#" + valClean  + ' .list-item-id').text(details[0]);

      $("#" + valClean  + ' .fish-location').html(details[1]);
      $("#" + valClean  + ' .fish-time').text(details[2]);
      $("#" + valClean  + ' .fish-time-digits').text(details[3]);
      $("#" + valClean  + ' .months-north').text(details[4]);
      $("#" + valClean  + ' .months-north-digits').text(details[5]);
      $("#" + valClean  + ' .months-south').text(details[6]);
      $("#" + valClean  + ' .months-south-digits').text(details[7]);
      $("#" + valClean  + ' .list-item-price').text(details[8]);
      $("#" + valClean  + ' .fish-shadow').html(details[9]);

      var splitVal = fishCookie.split('');
      if( splitVal[i] == 1 ) {
        $("#" + valClean  + " .got").removeClass("caught-false").addClass("caught-true");
        $("#" + valClean  + " .fa-times").removeClass("fa-times").addClass("fa-check");
        x++;
      }

      i++;
    });

    $('.progress-count').text(x + " / 80");
    $('.progress-bar-fg').css({ width:((x/ 80) * 100) + "%"});

    $.each($('.list-item-col'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '10px'});
  
      setTimeout(function(){
          $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
          }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + (i * 40) - (i / 5 * 20) );

    });
  });
};

function listBugs() {
  $.getJSON('/acnh/resources/data/bugs.json', function(data) {

    var i = 0;
    var x = 0;
    jQuery.each( data, function(y, val) {
      var details = $.map(val[0], function(value, index) {
        return [value];
      });

      var valClean = y.replace(' ', '_').replace(' ', '_').replace("'", '').toLowerCase();
      var instance = $("#bug-template").clone();
      instance.attr("id", valClean );
      $('#bug-list').append(instance);

      if (details[2].indexOf(', ') > -1) { $("#" + valClean  + ' .bug-time').addClass('multi-times'); }
      if (details[4].indexOf(', ') > -1) { $("#" + valClean  + ' .months-north').addClass('multi-months'); }
      if (details[6].indexOf(', ') > -1) { $("#" + valClean  + ' .months-south').addClass('multi-months'); }

      details[1] = details[1].replace('(Hybrid Flowers)', '<small>(Hybrid Flowers)</small>');
      details[1] = details[1].replace('(Flowers)', '<small>(Flowers)</small>');
      details[1] = details[1].replace('(Purple Flowers)', '<small>(Purple Flowers)</small>');
      details[1] = details[1].replace('(Noise)', '<small>(Noise)</small>');
      details[1] = details[1].replace('(White)', '<small>(White)</small>');
      details[1] = details[1].replace('(Lights)', '<small>(Lights)</small>');
      details[1] = details[1].replace('(Palm)', '<small>(Palm)</small>');
      details[1] = details[1].replace('(Snowballs)', '<small>(Snowballs)</small>');
      details[1] = details[1].replace('(Leaf Item)', '<small>(Leaf Item)</small>');
      details[1] = details[1].replace('(Rocks)', '<small>(Rocks)</small>');
      details[1] = details[1].replace('(Rain)', '<small>(Rain)</small>');
      details[1] = details[1].replace('(Shell)', '<small>(Shell)</small>');

      y = y.replace("Queen Alexandra's Birdwing", "<span style='font-size: 15px;'>Queen Alexandra's Birdwing</span>");
      y = y.replace("Madagascan Sunset Moth", "<span style='font-size: 16px;'>Madagascan Sunset Moth</span>");
      y = y.replace("Citrus Long-horned Beetle", "<span style='font-size: 16px;'>Citrus Long-horned Beetle</span>");
      y = y.replace("Earth-boring Dung Beetle", "<span style='font-size: 16px;'>Earth-boring Dung Beetle</span>");

      $("#" + valClean  + ' .list-item-name').html(y);
      $("#" + valClean  + ' .list-item-image').css("background-image", 'url(' + "/acnh/resources/bug-img/" + details[0] + ".png" + ')');
      $("#" + valClean  + ' .list-item-id').text(details[0]);

      $("#" + valClean  + ' .bug-location').html(details[1]);
      $("#" + valClean  + ' .bug-time').text(details[2]);
      $("#" + valClean  + ' .bug-time-digits').text(details[3]);
      $("#" + valClean  + ' .months-north').text(details[4]);
      $("#" + valClean  + ' .months-north-digits').text(details[5]);
      $("#" + valClean  + ' .months-south').text(details[6]);
      $("#" + valClean  + ' .months-south-digits').text(details[7]);
      $("#" + valClean  + ' .list-item-price').text(details[8]);

      var splitVal = bugCookie.split('');
      if( splitVal[i] == 1 ) {
        $("#" + valClean  + " .got").removeClass("caught-false").addClass("caught-true");
        $("#" + valClean  + " .fa-times").removeClass("fa-times").addClass("fa-check");
        x++;
      }
      i++;
    });

    $('.progress-count').text(x + " / 80");
    $('.progress-bar-fg').css({ width:((x/ 80) * 100) + "%"});

    $.each($('.list-item-col'), function(i, el){
      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '10px'});
  
      setTimeout(function(){
         $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
         }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + (i * 40) - (i / 5 * 20) );

    });
  });
};

function listFossils() {
  $.getJSON('/acnh/resources/data/fossils.json', function(data) {
    var i = 0;
    var x = 0;
    jQuery.each( data, function(y, val) {

      var details = $.map(val[0], function(value, index) {
        return [value];
      });

      var valClean = y.replace(' ', '_').replace(' ', '_').replace("'", '').replace('.', '').toLowerCase();
      var instance = $("#fossil-template").clone();
      instance.attr("id", valClean );
      $('#fossil-list').append(instance);

      details[1] = details[1].replace('(Hybrid Flowers)', '<small>(Hybrid Flowers)</small>');

      y = y.replace("Queen Alexandra's Birdwing", "<span style='font-size: 15px;'>Queen Alexandra's Birdwing</span>");

      $("#" + valClean  + ' .list-item-name').html(y);
      $("#" + valClean  + ' .list-item-id').text(details[0]);
      $("#" + valClean  + ' .list-item-price').text(details[1]);

      var splitVal = fossilCookie.split('');
      if( splitVal[i] == 1 ) {
        $("#" + valClean  + " .got").removeClass("caught-false").addClass("caught-true");
        $("#" + valClean  + " .fa-times").removeClass("fa-times").addClass("fa-check");
        x++;
      }

      i++;
    });

    $('.progress-count').text(x + " / 73");
    $('.progress-bar-fg').css({ width:((x/ 73) * 100) + "%"});

    $.each($('.list-item-col'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '10px'});
      setTimeout(function(){
         $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
         }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + (i * 40) - (i / 5 * 20) );

    });
  });
};

function listArt() {
  $.getJSON('/acnh/resources/data/art.json', function(data) {
    var i = 0;
    var x = 0;
    jQuery.each( data, function(y, val) {

      var details = $.map(val[0], function(value, index) {
        return [value];
      });

      var valClean = y.replace('-', '').replace('  ', ' ').replace(' ', '_').replace(' ', '_').replace(' ', '_').replace("'", '').replace('.', '').toLowerCase();
      var instance = $("#art-template").clone();
      instance.attr("id", valClean );
      $('#art-list').append(instance);

      $("#" + valClean  + ' .list-item-name').html(y);
      $("#" + valClean  + ' .list-item-id').text(details[0]);
      $("#" + valClean  + ' .list-item-price').text(details[1]);
      $("#" + valClean  + ' .list-item-genuine').text(details[2]);

      var splitVal = artCookie.split('');
      if( splitVal[i] == 1 ) {
        $("#" + valClean  + " .got").removeClass("caught-false").addClass("caught-true");
        $("#" + valClean  + " .fa-times").removeClass("fa-times").addClass("fa-check");
        x++;
      }

      i++;
    });

    $('.progress-count').text(x + " / 38");
    $('.progress-bar-fg').css({ width:((x/ 38) * 100) + "%"});

    $.each($('.list-item-col'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '10px'});
      setTimeout(function(){
         $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
         }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + (i * 40) - (i / 5 * 20) );

    });
  });
};

function filterList()
{
    var notCaught = document.getElementById('not-caught').checked;
    var caught = document.getElementById('caught').checked;
    if( $('#catchable').length  ) {
    var catchable = document.getElementById('catchable').checked;
    } else {
      var catchable = false;
    }
   
    if( $('#leaving').length  ) {
      var leaving = document.getElementById('leaving').checked;
    } else {
      var leaving = false;
    }

    if( $('#new-this-month').length  ) {
      var newThisMonth = document.getElementById('new-this-month').checked;
    } else {
      var newThisMonth = false;
    }

    var filterCount = 0;
    if(notCaught) { filterCount++; }
    if(caught) { filterCount++; }
    if(catchable) { filterCount++; }
    if(leaving) { filterCount++; }
    if(newThisMonth) { filterCount++; }

    var filterText = 'filters';
    if( filterCount == 1 ) { filterText = 'filter'; }

    $('.filter-count').text(filterCount);
    $('.filter-text').text(filterText);

    var elements= [];
  
    if( $('#fish-list').length ) {
      $.each( $("#fish-list .list-item-col"), function() {
        var ele = [$(this).parent().attr('id'), $(this).find(".got"), $(this).find(".fish-time-digits").html(), $(this).find(".months-north-digits").html(), $(this).find(".months-south-digits").html()];
        elements.push(ele); 
      });
    }

    if( $('#bug-list').length ) {
      $.each( $("#bug-list .list-item-col"), function() {
        var ele = [$(this).parent().attr('id'), $(this).find(".got"), $(this).find(".bug-time-digits").html(), $(this).find(".months-north-digits").html(), $(this).find(".months-south-digits").html()];
        elements.push(ele); 
      });
    }

    if( $('#fossil-list').length ) {
      $.each( $("#fossil-list .list-item-col"), function() {
        var ele = [$(this).parent().attr('id'), $(this).find(".got")];
        elements.push(ele); 
      });
    }

    if( $('#art-list').length ) {
      $.each( $("#art-list .list-item-col"), function() {
        var ele = [$(this).parent().attr('id'), $(this).find(".got")];
        elements.push(ele); 
      });
    }

    var currentdate = new Date(); 
    var currentMonth = currentdate.getMonth();
    var currentHour = currentdate.getHours();

    var show;
    var hemiChar = $('.selected-hemi').html();
    var count = 0;
    var hemiNumber = 3;
    if( hemiChar == 'Southern' ) { hemiNumber = 4 }

    for (i = 0; i < elements.length; i++) {

      show = true;

      if(( notCaught ) && (elements[i][1].hasClass("caught-true")) ) { show = false; } // Hide caught fish
      if(( caught ) && (elements[i][1].hasClass("caught-false")) ) { show = false; } // Hide uncaught fish
      if( catchable ) { // Hide uncatchable fish

        if( elements[i][2][currentHour] == 0 ){ show = false; }
        else if( elements[i][hemiNumber][currentMonth] == 0 ) { show = false; }
      }
      if(( leaving ) && ( elements[i][hemiNumber][currentMonth] == 0 )) { show = false; } // NEEDS TESTING
      if(( leaving ) && ( elements[i][hemiNumber][currentMonth] == 1 ) && ( elements[i][hemiNumber][currentMonth + 1] == 1 )) { show = false; }

      if(( newThisMonth ) && ( elements[i][hemiNumber][currentMonth] == 0 )) { show = false; }
      if(( newThisMonth ) && ( elements[i][hemiNumber][currentMonth] == 1 ) && ( elements[i][hemiNumber][currentMonth - 1] == 1 )) { show = false; }

        if( !show ) {
          $(document.getElementById(elements[i][0])).addClass("filter-hide");
        } else {
          $(document.getElementById(elements[i][0])).removeClass("filter-hide");
          count++;
        }

        var elem = $($(document.getElementById(elements[i][0])));
        elem.remove();

        if( $('#fish-list').length ) {
          $(elem).appendTo("#fish-list");
        }

        if( $('#bug-list').length ) {
          $(elem).appendTo("#bug-list");
        }

        if( $('#fossil-list').length ) {
          $(elem).appendTo("#fossil-list");
        }

        if( $('#art-list').length ) {
          $(elem).appendTo("#art-list");
        }
    } 

    $('.showing-count').html(count);

    if( count == 0 )
    {
      $('.search-error').show();
    }
    else
    {
      $('.search-error').hide();
    }
}

function sortFish(listOrder) {
  var elements= [];

  $("#fish-list .list-item-col").each(function(){ 
    var ele = [$(this).parent().attr('id'), $(this).find(".list-item-id").html(), $(this).find(".fish-location").html(), $(this).find(".fish-time-digits").html(), $(this).find(".list-item-price").html().replace(',', ''), $(this).find(".fish-shadow").html().replace('<small>', '').replace('</small>', '')];
    elements.push(ele); 
  });

  switch( listOrder )
  {
    case 'Critterpedia Order - Asc': 
      elements.sort(numAscSort);
      break;

    case 'Critterpedia Order - Desc': 
      elements.sort(numDescSort);
      break;

    case 'A - Z': 
      elements.sort(azSort);
      break;

    case 'Z - A': 
      elements.sort(zaSort);
      break;

    case 'Shadow': 
      elements.sort(shadowSort);
      break;

    case 'Location': 
      elements.sort(locSort);
      break;

    case 'Time': 
      elements.sort(timeSort);
      break;

    case 'Value - Asc': 
      elements.sort(prcAscSort);
      break;

    case 'Value - Desc': 
      elements.sort(prcDescSort);
      break;
  }

  // Apply order
  for (i = 0; i < elements.length; ++i) {
    var elem = document.getElementById(elements[i][0]);
    elem.remove();
    $(elem).appendTo("#fish-list");
  } 

}

function sortBugs(listOrder) {
  var elements= [];

  $("#bug-list .list-item-col").each(function(){ 
    var ele = [$(this).parent().attr('id'), $(this).find(".list-item-id").html(), $(this).find(".bug-location").html(), $(this).find(".bug-time").html(), $(this).find(".list-item-price").html().replace(',', '')];
    elements.push(ele); 
  });

  switch( listOrder )
  {
    case 'Critterpedia Order - Asc': 
      elements.sort(numAscSort);
      break;

    case 'Critterpedia Order - Desc': 
      elements.sort(numDescSort);
      break;

    case 'A - Z': 
      elements.sort(azSort);
      break;

    case 'Z - A': 
      elements.sort(zaSort);
      break;

    case 'Location': 
      elements.sort(locSort);
      break;

    case 'Time': 
      elements.sort(timeSort);
      break;

    case 'Value - Asc': 
      elements.sort(prcAscSort);
      break;

    case 'Value - Desc': 
      elements.sort(prcDescSort);
      break;
  }

  // Apply order
  for (i = 0; i < elements.length; ++i) {
    var elem = document.getElementById(elements[i][0]);
    elem.remove();
    $(elem).appendTo("#bug-list");
  } 
}

  function sortFossils(listOrder) {
    var elements= [];
  
    $("#fossil-list .list-item-col").each(function(){ 
      var ele = [$(this).parent().attr('id'), $(this).find(".list-item-id").html(), null, null,  $(this).find(".list-item-price").html().replace(',', '')];
      elements.push(ele); 
    });
  
    switch( listOrder )
    {
      case 'A - Z': 
        elements.sort(azSort);
        break;
  
      case 'Z - A': 
        elements.sort(zaSort);
        break;
  
      case 'Value - Asc': 
        elements.sort(prcAscSort);
        break;
  
      case 'Value - Desc': 
        elements.sort(prcDescSort);
        break;
    }

  // Apply order
  for (i = 0; i < elements.length; ++i) {
    var elem = document.getElementById(elements[i][0]);
    elem.remove();
    $(elem).appendTo("#fossil-list");
  } 

}

function sortArt(listOrder) {
  var elements= [];

  $("#art-list .list-item-col").each(function(){ 
    var ele = [$(this).parent().attr('id'), $(this).find(".list-item-id").html(), null, null, null];
    elements.push(ele); 
  });

  switch( listOrder )
  {
    case 'A - Z': 
      elements.sort(azSort);
      break;

    case 'Z - A': 
      elements.sort(zaSort);
      break;
  }

  // Apply order
  for (i = 0; i < elements.length; ++i) {
    var elem = document.getElementById(elements[i][0]);
    elem.remove();
    $(elem).appendTo("#art-list");
  } 
}

function numAscSort(a, b){
  var aName = parseInt(a[1]);
  var bName = parseInt(b[1]); 
  return aName - bName;
}

function numDescSort(a, b){
  var aName = parseInt(a[1]);
  var bName = parseInt(b[1]); 
  return bName - aName;
}

function azSort(a, b){
  var aName = a[0].toLowerCase();
  var bName = b[0].toLowerCase(); 
  return aName > bName;
}

function zaSort(a, b){
  var aName = a[0].toLowerCase();
  var bName = b[0].toLowerCase(); 
  return aName < bName;
}

function shadowSort(a, b){
  var aName = shadowVal(a[5].toLowerCase());
  var bName = shadowVal(b[5].toLowerCase()); 
  return aName > bName;
}

function shadowVal(size) {

  switch(size){
    case "very small": return 1;
    case "small": return 2;
    case "medium": return 3;
    case "large":  return 4;
    case "large (fin)": return 5;
    case "very large": return 6;
    case "very large (fin)": return 7;
    case "huge": return 8;
    case "huge (fin)": return 9;
  }
}

function locSort(a, b){
  var aName = a[2].toLowerCase();
  var bName = b[2].toLowerCase(); 
  return aName > bName;
}

function timeSort(a, b){
  var aName = a[3].toLowerCase();
  var bName = b[3].toLowerCase(); 
  return aName < bName;
}

function prcAscSort(a, b){
  var aName = parseInt(a[4]);
  var bName = parseInt(b[4]); 
  return aName - bName;
}

function prcDescSort(a, b){
  var aName = parseInt(a[4]);
  var bName = parseInt(b[4]); 
  return bName - aName;
}

function loadContent() 
{
  if( $('#fish-list').length ) {
    listFish();
  }

  if( $('#bug-list').length ) {
    listBugs();
  }

  if( $('#fossil-list').length ) {
    listFossils();
  }

  if( $('#art-list').length ) {
    listArt();
  }

  if( $('.home-content').length ) {

    // Nav
    $('.home-nav').animate({
      'opacity':1.0,
    }, {
      duration: 700,
      complete: function () {
      }
    });

    $.each($('.home-nav-btn-container'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '2px'});
  
      setTimeout(function(){
        $(el).animate({
          'opacity':1.0,
          'top': '0px'
        }, {
          duration: 700,
          complete: function () {
          }
        });
      },i * 125);

    });
    
    // Fish
    var splitVal = getCookie("fish").split('');
    var cookie = getCookie("fish");
    var x = 0;
    for (var i = 0, length = cookie.length; i < length; i++) {
      if (cookie[i] === '1') {
        x++;
      }
    }

    $.each($('.overview-fish'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '2px'});
      if( splitVal[i] == 1 ) { $(el).addClass('overview-item-checked'); $(el).html('<i class="fas fa-check"></i>'); }
  
      setTimeout(function(){
        $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
        }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + ( (i * 5) + ( i / 10 * 80 ) ));

    });

    var $this = $('.fish-count');
      jQuery({ Counter: 0 }).animate({ Counter: x }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $this.text(Math.ceil(this.Counter) + " / 80");
          $('.fish-progress').css({ width:((Math.ceil(this.Counter) / 80) * 100) + "%"});
        }
      });

    // Bugs
    var splitVal = getCookie("bug").split('');
    var cookie = getCookie("bug");
    var x = 0;
    for (var i = 0, length = cookie.length; i < length; i++) {
      if (cookie[i] === '1') {
        x++;
      }
    }

    $.each($('.overview-bug'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '2px'});
      if( splitVal[i] == 1 ) { $(el).addClass('overview-item-checked'); $(el).html('<i class="fas fa-check"></i>'); }
  
      setTimeout(function(){
        $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
        }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + ( (i * 5) + ( i / 10 * 80 ) ));

    });

    var $thisB = $('.bug-count');
      jQuery({ Counter: 0 }).animate({ Counter: x }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $thisB.text(Math.ceil(this.Counter) + " / 80");
          $('.bug-progress').css({ width:((Math.ceil(this.Counter) / 80) * 100) + "%"});
        }
    });

    // Fossils
    var splitVal = getCookie("fossil").split('');
    var cookie = getCookie("fossil");
    var x = 0;
    for (var i = 0, length = cookie.length; i < length; i++) {
      if (cookie[i] === '1') {
        x++;
      }
    }

    $.each($('.overview-fossil'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '2px'});
      if( splitVal[i] == 1 ) { $(el).addClass('overview-item-checked'); $(el).html('<i class="fas fa-check"></i>'); }
  
      setTimeout(function(){
        $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
        }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + ( (i * 5) + ( i / 10 * 80 ) ));

    });

    var $thisC = $('.fossil-count');
      jQuery({ Counter: 0 }).animate({ Counter: x }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $thisC.text(Math.ceil(this.Counter) + " / 73");
          $('.fossil-progress').css({ width:((Math.ceil(this.Counter) / 73) * 100) + "%"});
        }
    });

    // Art
    var splitVal = getCookie("art").split('');
    var cookie = getCookie("art");
    var x = 0;
    for (var i = 0, length = cookie.length; i < length; i++) {
      if (cookie[i] === '1') {
        x++;
      }
    }

    $.each($('.overview-art'), function(i, el){

      $(el).css({'opacity':0, 'position': 'relative', 'bottom': '2px'});
      if( splitVal[i] == 1 ) { $(el).addClass('overview-item-checked'); $(el).html('<i class="fas fa-check"></i>'); }
  
      setTimeout(function(){
        $(el).animate({
          'opacity':1.0,
          'bottom': '0px'
        }, {
          duration: 450,
          complete: function () {
          }
        });
      },10 + ( (i * 5) + ( i / 10 * 80 ) ));

    });

    var $thisD = $('.art-count');
      jQuery({ Counter: 0 }).animate({ Counter: x }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $thisD.text(Math.ceil(this.Counter) + " / 38");
          $('.art-progress').css({ width:((Math.ceil(this.Counter) / 38) * 100) + "%"});
        }
    });
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

function toggleDarkMode( toggle = true) {
  if(( darkModeCookie == 'false' && toggle == true ) || ( darkModeCookie == 'true' && toggle == false )) {
    console.log("Toggling Dark Mode");
    // Dark Mode
    $('.dm-nav-link').html('<i class="fas fa-sun"></i>');
    $("#dark-css").attr("href", "/acnh/resources/main-dark.css");
    $('.home-anim').css("background-image", "url(/acnh/resources/home-gif-night.gif)"); 

    if( toggle ) {
      darkModeCookie = 'true';
      setCookie('darkMode', 'true', 31);
    }
    
  } else {
    console.log("Toggling Light Mode");
    // Light Mode
    $('.dm-nav-link').html('<i class="fas fa-moon"></i>');
    $("#dark-css").attr("href", "/acnh/resources/nothing-here.css");
    $('.home-anim').css("background-image", "url(/acnh/resources/home-gif.gif)");

    if( toggle ) {
      darkModeCookie = 'false';
      setCookie('darkMode', 'false', 31);
    }
  }
}

function changeHemi(useCookie = false) {
  if( !useCookie ) {
    if( $('.selected-hemi').html() == 'Northern' )
    {
      $('.selected-hemi').html('Southern');
      setCookie('hemi', 'south', 31);
      $('.months-north').each(function() {
        $(this).hide();
      });
      $('.months-south').each(function() {
        $(this).show();
      });
    }
    else
    {
      setCookie('hemi', 'north', 31);
      $('.selected-hemi').html('Northern');
      $('.months-south').each(function() {
        $(this).hide();
      });
      $('.months-north').each(function() {
        $(this).show();
      });
    }
    filterList();
  }
  else
  {
    if( hemiCookie == 'south' )
    {
      $('.selected-hemi').html('Southern');
      $('.months-north').each(function() {
        $(this).hide();
      });
      $('.months-south').each(function() {
        $(this).show();
      });
    }
  }
}

$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'overlay-slide-in-left',
    outClass: 'overlay-slide-out-right',
    inDuration: 100,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : true,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
});