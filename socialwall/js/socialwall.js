/*--------------------------------------------------
S E E J A Y   S O C I A L   W A L L
Website by Websolute
--------------------------------------------------*/


/*--------------------------------------------------
SocialWall
--------------------------------------------------*/
var $socialWallGrid = $('.social-wall-grid'),
    socialWall = {
        codiceSocialWall: $socialWallGrid.attr('data-code'),
        accessToken: '634737799ba786bbfe74ff48a52b3f54725782e5eab78',
        maxFeed: $socialWallGrid.attr('data-max-feed') || 10,
        withMasonry: $socialWallGrid.attr('data-masonry') || 'false',
        actualFeed: 0,
        tooManyFeeds: false,
        media: [],
        loadedImages: 0,
        $data: null,
        init: function () {
            $.ajax({
                url: 'http://www.seejay.co/api/v1.0/wall/content/' + socialWall.codiceSocialWall + '?access_token=' + socialWall.accessToken,
                dataType: 'json',
                sync: true,
                cache: false,
                crossDomain: true,
                success: function (data) {
                    socialWall.$data = data;

                    if (socialWall.withMasonry === 'true') {
                        socialWall.masonry();
                    }

                    socialWall.loadImages();

                }
            });
        },
        loadImages: function () {
            
            for (i = socialWall.actualFeed; i < socialWall.maxFeed; i++) {
                if (typeof socialWall.$data.data.items[i] != 'undefined') {

                    var feed = socialWall.$data.data.items[i],
                        media = feed.media || undefined;

                    var img = new Image();
                    socialWall.media.push(media.url);

                    img.onload = function () {
                        socialWall.loadedImages++;
                        console.log(socialWall.loadedImages);
                        if (socialWall.loadedImages == socialWall.maxFeed - 1) {
                            socialWall.createGrid();
                        }
                    }
                    img.onerror = function () {
                        inArray = $.inArray(this.src, socialWall.media);
                        socialWall.$data.data.items.splice(inArray, 1);
                    }
                    img.src = media.url;

                }

            }
        },
        createGrid: function () {

            console.log(socialWall.$data);

            if (socialWall.$data.data.items.length < socialWall.maxFeed) {
                socialWall.maxFeed = socialWall.$data.data.items.length;
                socialWall.tooManyFeeds = true;
            }

            for (i = socialWall.actualFeed; i < socialWall.maxFeed; i++) {

                if (typeof socialWall.$data.data.items[i] != 'undefined') {

                    var feed = socialWall.$data.data.items[i],
                        $box = $('<div class="grid-item"><div class="grid-wrap"><div class="box"></div></div></div>'),
                        source = feed.source,
                        feedID = feed.id,
                        permalink = feed.permalink,
                        date = new Date(parseInt(feed.date)),
                        text = urlify(feed.text),
                        media = feed.media || undefined,
                        user = feed.user,
                        avatar = user.avatar.replace('https', 'http'),
                        id = user.id,
                        userPermalink = user.permalink,
                        icon,
                        socialUrl;

                    // console.log(date.toString());

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

                        // media
                        $media = $('<div class="media"><a href="' + permalink + '" target="_blank"><figure><img src="' + media.url + '" /></figure></a></div>').appendTo($('.box', $box));

                        // author 
                        $avatar = $('<div class="author"><a href="' + userPermalink + '" target="_blank"><figure class="img"><img src="' + avatar + '" onError="$(this).remove();" class="avatar" /></figure><span class="author-name">' + name + '</span> <span class="author-username">' + id + '</span></a></div>').appendTo($('.box', $box));;

                        // text
                        $text = $('<div class="text"></div>').html(text).appendTo($('.box', $box));

                        // source
                        $source = $('<div class="source">' + icon + '</div>').appendTo($('.box', $box));

                        // append
                        $box.appendTo($socialWallGrid);

                        if (socialWall.withMasonry === 'true') {
                            $wall.masonry('appended', $box);
                            $wall.imagesLoaded().progress(function () {
                                $wall.masonry('layout');
                            });
                        }

                        socialWall.actualFeed++;

                    } else {
                        if (!socialWall.tooManyFeeds) {
                           socialWall.maxFeed++;
                        }
                    }

                }
            }

        },
        masonry: function () {
            $wall = $socialWallGrid.masonry({
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