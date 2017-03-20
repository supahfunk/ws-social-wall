/*--------------------------------------------------
S E E J A Y   S O C I A L   W A L L
Website by Websolute
--------------------------------------------------*/


var codiceSocialWall = 'b17d6114643f2627f53de462565fda5e',
    accessToken = '634737799ba786bbfe74ff48a52b3f54725782e5eab78',
    socialWallUrl = 'http://www.seejay.co/api/v1.0/wall/content/' + codiceSocialWall + '?access_token=' + accessToken,
    maxFeed = 20,
    masonry = true,
    $grid = $('.social-wall-grid'),
    $data;


/*--------------------------------------------------
SocialWall
--------------------------------------------------*/
socialWall = {
    init: function () {
        $.ajax({
            url: socialWallUrl,
            dataType: 'json',
            sync: true,
            cache: false,
            crossDomain: true,
            success: function (data) {
                $data = data;
                socialWall.createGrid();
            }
        });
    },
    createGrid: function () {
        for (i = 0; i < maxFeed; i++) {

            var feed = $data.data.items[i],
                $box = $('<div class="grid-item"><div class="grid-wrap"><div class="box"></div></div></div>'),
                source = feed.source,
                feedID = feed.id,
                date = feed.date,
                text = urlify(feed.text),
                media = feed.media || undefined,
                user = feed.user,
                avatar = user.avatar.replace('https', 'http'),
                id = user.id,
                name = user.name,
                icon,
                socialUrl;

            switch (source) {
                case 'PT':
                    icon = '<i class="fa fa-pinterest" aria-hidden="true"></i>';
                    socialUrl = 'https://www.pinterest.com/';
                    break;
                case 'IG':
                    icon = '<i class="fa fa-instagram" aria-hidden="true"></i>';
                    socialUrl = 'http://instagram.com/';
                    break;
                case 'FB':
                    icon = '<i class="fa fa-facebook" aria-hidden="true"></i>';
                    socialUrl = 'http://facebook.com/';
                    break;
                case 'TW':
                    icon = '<i class="fa fa-twitter" aria-hidden="true"></i>';
                    socialUrl = 'https://twitter.com/';
                    break;
            }

            $('.box', $box).addClass('box-' + source);

            // Se non è Google Plus e contiene foto
            if (source != 'GP' && typeof media != 'undefined') {

                console.log(typeof media != 'undefined');
                
                // media
                $media = $('<div class="media"><figure><img src="' + media.url + '" /></figure></div>').appendTo($('.box', $box));

                // author 
                $avatar = $('<div class="author"><a href="' + (socialUrl + id) + '" target="_blank"><figure class="img"><img src="' + avatar + '" onError="$(this).remove();" class="avatar" /></figure><span class="author-name">' + name + '</span> <span class="author-username">' + id + '</span></a></div>').appendTo($('.box', $box));;

                // text
                $text = $('<div class="text"></div>').html(text).appendTo($('.box', $box));

                // extra
                $source = $('<div class="source"><span class="source">' + icon + '</span></div>').appendTo($('.box', $box));

                // append
                $box.appendTo($grid);

                
            }
        }

        if (masonry) {
            socialWall.masonry();
        }
    },
    masonry: function () {
        $wall = $grid.masonry({
            itemSelector: '.grid-item'
        });

        $wall.imagesLoaded().progress(function () {
            $wall.masonry('layout');
        });
    }
}


/*--------------------------------------------------
Urlify
--------------------------------------------------*/
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
}


/*--------------------------------------------------
DOC READY
--------------------------------------------------*/
$(function () {
    socialWall.init();
});