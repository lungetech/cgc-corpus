// REQUIRED: "jQuery Query Parser" plugin.
// https://github.com/mattsnider/jquery-plugin-query-parser
// Minified version here:
(function($){var pl=/\+/g,searchStrict=/([^&=]+)=+([^&]*)/g,searchTolerant=/([^&=]+)=?([^&]*)/g,decode=function(s){return decodeURIComponent(s.replace(pl," "));};$.parseQuery=function(query,options){var match,o={},opts=options||{},search=opts.tolerant?searchTolerant:searchStrict;if('?'===query.substring(0,1)){query=query.substring(1);}while(match=search.exec(query)){o[decode(match[1])]=decode(match[2]);}return o;};$.getQuery=function(options){return $.parseQuery(window.location.search,options);};$.fn.parseQuery=function(options){return $.parseQuery($(this).serialize(),options);};}(jQuery));

// YOUTUBE VIDEO CODE
$(document).ready(function(){

    // BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
    // Modal Window for dynamically opening videos
    $('a[href^="http://www.youtube.com"]').on('click', function(e){
        // Store the query string variables and values
        // Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
        var queryString = $(this).attr('href').slice( $(this).attr('href').indexOf('?') + 1);
        var queryVars = $.parseQuery( queryString );

        // if GET variable "v" exists. This is the Youtube Video ID
        if ( 'v' in queryVars )
        {
            // Prevent opening of external page
            e.preventDefault();

            // Variables for iFrame code. Width and height from data attributes, else use default.
            var vidWidth = 560; // default
            var vidHeight = 315; // default
            if ( $(this).attr('data-width') ) { vidWidth = parseInt($(this).attr('data-width')); }
            if ( $(this).attr('data-height') ) { vidHeight =  parseInt($(this).attr('data-height')); }
            var iFrameCode = '<iframe width="' + vidWidth + '" height="'+ vidHeight +'" scrolling="no" allowtransparency="true" allowfullscreen="true" src="http://www.youtube.com/embed/'+  queryVars['v'] +'?rel=0&wmode=transparent&showinfo=0&autoplay=1" frameborder="0"></iframe>';

            // Replace Modal HTML with iFrame Embed
            $('#mediaModal .modal-body').html(iFrameCode);
            // Set new width of modal window, based on dynamic video content
            $('#mediaModal').on('show.bs.modal', function () {
                // Add video width to left and right padding, to get new width of modal window
                var modalBody = $(this).find('.modal-body');
                var modalDialog = $(this).find('.modal-dialog');
                var newModalWidth = vidWidth + parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
                newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
                newModalWidth += 'px';
                // Set width of modal (Bootstrap 3.0)
                $(this).find('.modal-dialog').css('width', newModalWidth);
            });

            // Open Modal
            $('#mediaModal').modal();
        }
    });

    // Clear modal contents on close.
    // There was mention of videos that kept playing in the background.
    $('#mediaModal').on('hidden.bs.modal', function () {
        $('#mediaModal .modal-body').html('');
    });

});
