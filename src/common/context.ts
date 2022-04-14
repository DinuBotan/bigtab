import { BackgroundMachineContext } from './types';

export const DEFAULT_CONTEXT: BackgroundMachineContext = {
  retries: 0,
  installedTimestamp: new Date().getTime(),
  version: '0.0.0-beta',
  tabs: [],
  groups: [],
  settings: {
    defaultClickAction: 'send_all_tabs',
  },
};

// {
//     "retries": 0,
//     "installedTimestamp": 1649892348576,
//     "version": "0.0.0-beta",
//     "tabs": [
//         {
//             "id": "IXqKxRNrP_Ana7n3XwnUq",
//             "url": "https://www.google.com/",
//             "title": "Google",
//             "group": "",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEVHcEz5+fr////7+/v////////7/Pz9/f/+/v/5+vr29vf////qOCc4gfUipUj1tLHrQTD8vgBOjfWs2Lj619QRo0SCqvcYdvS5zvrveXHS6df98fCjv/mcsC0Pm2LB38/ygRf/zVj80VvX69lsu39nuntYkfv+AAAAC3RSTlMAbElFbERs+NUdRxLWvs8AAACRSURBVBiVVY9ZEoMwDEMNA4SgmIQlZem+3f+KdWig9H3ZGlsjES3oNNX0I1MQVLbuJSLltveTc1MflQywxhlBbsKXQm+cFfUYfMQfeNzs6gJNOdA0MnHbtgcg34SBmRdBXu7nLlyPfAovYjr7WpQrDyqYUgF0vhYuI1DEYPPb16/nPupfdKLkWy7Z9dVVFet/APAqCZJLuA/1AAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "XjSnW3lVR2wrcv6TXvlY2",
//             "url": "https://www.youtube.com/",
//             "title": "YouTube",
//             "group": "",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAJ1BMVEVHcEz/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/////mJj/wcH/jY3aUCqcAAAACHRSTlMA8czbELSvDrGIfzkAAABCSURBVBiVY2AgA7CwMTMycgABIyMzGztQgIkDCTABBThQAEyAixtNgIeTkwu/AIYWZEMxrGVhZWaE8BiZWVnI8RoAJWEEDt2WmW4AAAAASUVORK5CYII="
//         },
//         {
//             "id": "F9NPREyQQaLaC6xPliltL",
//             "url": "https://www.twitch.tv/",
//             "title": "Twitch",
//             "group": "",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4jdWRwQ3CMAxFnytmC2swQaEHzrQToMAECK4M0DJBR+mRDpD0gCJCaEmgJ/7FluX3bcuCp6OyOwMliVo3IosxOK/j8GH5iNkvk31lAJ9gNynMXwzm6A8M/I+4vO9mbNB3cN2CgeprAwffO6qikRJAALSydgzIa2gv0J6fNWPRxU02SSe8wXDy4bhBCDeyCntkDHQnTUFJGxiLjsGT2itbpvYOiY9Duw6P5xAAAAAASUVORK5CYII="
//         },
//         {
//             "id": "p26ishQpKVaLI1X1UGdAB",
//             "url": "https://discord.com/",
//             "title": "Discord | Your Place to Talk and Hang Out",
//             "group": "",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1UlEQVQ4jZWTz2sTYRCGn9ls/Y1rQa2xIGm1RwvdQg8tRQgIBc9iDh4E0+Ax4Nn/QQpesvWenAoFISDkErwITUrTPyAUqlbbwHoIsm53PHy7STZasO9xeJ935pvdEcZUWPddlJIKeZRcXO6K0ACpVL3rrVG/DMGfV1DdUOGlDMtjUhQ8oFzznP4gwMDUEVbPIMdjmsBazXP6lqno2/+FTVdZBTYApFD0XYSd5DWZDCw8tLl9U2jthQC48zbfj5V2J+T0NJ5CFYRFW6E0+uZXLy6xsmQD8PzpxVTnT59D3r3/ZaYQQVVLFpBPDNNZawD/SytLNtNZa7SUt2DwqQbwSU+pbgUEAQQBVLcCTnoKwHK6QS4VN5vLALC7H7JdDzg4jDg4jNiuB+zum33cjz2JbKALzAFcu2p28Wh5grt3LB7MmPw3ry8zN2vAxBOrawONJKDdCZm5d4HjnvLlKCKKjOvbj4jJGxZTt4R2JxziQkMKRd9V2BExydkpC3c+w4ePv1OjPnk8QWsv5OuRxhUFWBSAZ0W/IiLrnEOKejXPKSVLLKPaPAfeBMoAFkBt0+krrKmqh+rZmCqq6qmaOwD+PrtC0XeBkpofLBcbuphlV6qbTuqc/wAwW6w+yzHv8gAAAABJRU5ErkJggg=="
//         },
//         {
//             "id": "iVa_nAgLqXf1CUtAN4wDA",
//             "url": "https://www.mozilla.org/en-US/firefox/new/?redirect_source=firefox-com",
//             "title": "Download Firefox Browser — Fast, Private & Free — from Mozilla",
//             "group": "",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5UlEQVQ4jYWTz4+ccxzHX5/v9/kxz8xOZ2fW7uwizQo2Yxu90JIWtUEp4qKJODgQB4JkOZQD0SYIDm4lcdhbhX/ATSKIH2lsnEhFVZmyv6Y7s/PMzDPPj+/HQSoNh76vr7xfp/dbuEJ08yGD5TlgP06fkas+HVzOzZUEFPl9qL6GcBTVx/+L/xXoqWuu1Y93zwLoZwc8AP3pYIUkXSbLpylcicKd0Pa99/9PoG/NzdNPVxjkd+uHdzzJFgcBip5r6c5oP8MhpBkU7mqcvqfnDh/WPx5uAlh9fk8JL38HiqMgC4g8FnebP+/bON3aXD2w3Dt33eKoMyFRbQMvGIEz06hZBGaOv3j9aXv8lul7UF5FNMLLm5T7pcwEt+30W4/GW62FuH2jdH69gTQdU5/7DWsdODuNsIC4M4ZB8CCDoI5nYSqASplKoz2575GX/d1Lp0gmlbGtYCODMQXsKMTikzFHwQOGQXgzgxD6ITiL7grZsns5my7xpz/PxahCR6v8+MXtjLohJDlsCyQOEtPyim65ah1wAUgMZ+fm+eSHl+jJHgJTpeI5SjZl2InonY+oznYhUahmEEeRl27V1kumQFRAlM6gzi8bBmprBGHMMPeYSHLqrkMYx7DmobUR0jXo0Nvyhpv1r/1gfMRTDLmwONFmsbTK99t7SYI+aW5x/YJbm9/SiHfAgpQVd6Gu5PYb+4I7tI3qkSDI6uKEMC+4yf+d0CWYfMSM/sWdE9+x1PyK0BuDKC6OKDZq5xnbEwLQrj37SqXRfWPXVM+aIIMgQ/2CzLOILfC9FKxCJLjIIxvOOPzS6+HJM2/+M9ms9EHcmWylqX2iWo9NWEoxfk5gC7AC1oIo6XpA0m+ohOWP/Ln8pFRWVS5tul1ZbjjJjkkwftqPkqkwGuP5OSKKKwxpUqIYVC6KC1e8snu70X6/AyCXH2OtfMzPZXzISfEUUtyF6Kwg4Oy6qPelUbtixX7eHLybXur8De7WRBKduXWdAAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "aG7XrEm-riNIPJ-xFlgcR",
//             "url": "https://lodash.com/docs/4.17.15#intersection",
//             "title": "Lodash Documentation",
//             "group": "lodash",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGFBMVEVHcExFvv9x//9Cwf9l//+g//9i1v8ymf8nos8oAAAAB3RSTlMAyTHWNyediaJ83gAAACFJREFUGJVjYBjWgI0RCTCzMjAwsyMDFgYGVhYmBGBhAAAQFQCgZJM3AQAAAABJRU5ErkJggg=="
//         },
//         {
//             "id": "EyRPHArpEi2j5ERraVxGV",
//             "url": "https://www.endclothing.com/us",
//             "title": "END. (US) | Style. Sneakers. Culture. Community.",
//             "group": "fashion",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4jWP8//8/AzJQUVBEFcAEjXce3G+AcZgIKCYIWAjIX2BgYPiAJvaAFAMK7z58cACfAoq9QLEBjARiAT0MCu8+fHABWQ+hMDBA4wugK6B5NBYyQLwBAxfQFRBMB4M/Ggl5oV9ZXgE9KV9ggIQNUQagRyMGoNgLAM3iJWcH9Ho9AAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "1-WuRGg9irfvoIIvwMf3i",
//             "url": "https://www.farfetch.com/key-worker-discount?clickref=1101lj6CpwPM&utm_source=gocertify&utm_medium=partnerships&utm_campaign=PHPARUS&pid=performancehorizon_int&c=gocertify&clickid=1101lj6CpwPM&af_siteid=1101l122990&af_sub_siteid=1011l274&af_cost_model=CPA&af_channel=partnerships&is_retargeting=true",
//             "title": "Key Worker Discount - Farfetch",
//             "group": "fashion",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKlBMVEVHcEwiIiIiIiIiIiIjIyMiIiIiIiIiIiIcHBwhISEiIiIdHR0SEhIiIiLdtezfAAAADXRSTlMAlMmmIzOCdg1Q2w8GUkX+jwAAAFJJREFUGJWNzUsOgCAMRdF+xAL69r9doRJSdKB31pO0JfqTYuYzA1XuqgNg6wawERX1JpR4owNDzpzzMaAkhabegMdbgE0gtrfCDV7fvkAjfHQBICADx+Stru0AAAAASUVORK5CYII="
//         },
//         {
//             "id": "CYTA07WLJXhZ5FzG-Ch1A",
//             "url": "https://stackoverflow.com/",
//             "title": "Stack Overflow - Where Developers Learn, Share, & Build Careers",
//             "group": "stack-overflow",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABXklEQVQ4jbWQv0sCYRjHv8/d1XmmJ+EWNLmabQ1BUzQk0eYUNIRCIcrpUtBYS0ueg1BLBObQ2NA/0FgQ5RA4Nyd6mT9f36dV8DyOoGd83+/zeT/fF/Ax3aKxPOtO8QMQEjXHCqb/DADLDMDnrZwe8w1wrGC6bQW3AcAsDxoEOlNUpcYpqP4MJH8AfO1YxgWnoIbtbgXgZmcpcDoZIy9zJxuOYm5UBSikKdiTqjKSI/nGhN1IqffsatDK6THHCt46eWPdrHx/mXY/CcajkHgRQiRAOALTzkyD5vFiRB32D4gpA8gxQbka6fqdNuwlmKlGLLfM8qDhr0IhsEGSDpmQBOhBUagUuvx5n8xoU0uW8USMTwbqzFTXVD4RAy3P82Lf7b2pk05xYXUsxwkCxQFeYVCcgDADrxG7tzlT96Z6zzOrZMPRdsFYc8u5VXABCRC7G08BTLvn+bGeAK8a/za/HFKIGF9CPeEAAAAASUVORK5CYII="
//         },
//         {
//             "id": "G7Z0yU3F50HunlgqeKxgq",
//             "url": "https://www.apple.com/services/",
//             "title": "Only on Apple - Services - Apple",
//             "group": "technology",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA80lEQVQ4jZ3TsUoEMRSF4W917QQLtbC1EHwFfQbBRp9AK0vBqdXGabexEkEQxC0sBEtBa1/AQrERFnHBQtBuLDYLYUycwQOBJDf3554kt1NVlbHKspTRPLZwigEURQEmchmRZnGHA3zXg90WgF0shwo+6sFcBTOYC/N7rKCPhTaAPTzhGUd4wypewv6Zka2khQ3EN1mEEWsTPQxTFeyk/NS0jYechaWG5C/cxht1wGQDYErkPwV4bQB0sY/pHOC6AQDrOMkBjvHeAnKVAwz8folHfEbrPi7Gi9RXvgzgNZzjBotG/2GIw/hwJ+7G/6hNN/6pH+ILLNtmJfWnAAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "z1iP8Jn_74W4mlGN8BWhG",
//             "url": "https://www.oneplus.com/",
//             "title": "OnePlus Official Site | OnePlus United States",
//             "group": "technology",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEX1BRT1AAD////1AhP1AxP0AAD1ABD2DB71AAv2BRr3IjH2EiL+3+L/9Pb9xMn/+Pn2JC74cXf3U1r+6ev9y8/2KzX7pqr5fYL5hIn90tX2PET4Y2qC50egAAAAg0lEQVQYlW2PyRaDMAhFAySQwaht7fz//1nAal30LjhwFw8I4QenuDaRlBi4DUA2EzgMjADR5o7KmCatQzKBVZoQt4rc2EXJMJ8gSwf2CBQ4X5akWzh8Rb7elsQyWqYLhruKhgfxeB5Fyfn11tBdzEUKSambsIuc7mI73aD1OdoJf/gAU5UEJ+69zagAAAAASUVORK5CYII="
//         },
//         {
//             "id": "t6YiwwO6phzSTdu53sJfP",
//             "url": "https://intellibus.com/",
//             "title": "INTELLIBUS",
//             "group": "very-long-long-long-long-group-name",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEUKVJUJVJURWJcRV5cAT5P///8ATJEASpELVJMATpAAUpQKVJc4aaFXf6xrjLWAm7+UqMamuM2mudMiW5jCz+C2ydytv9Ogs8uQqsPY5+wARJDF0t7x8/JZhrEAO4cARo/1/fsAM4dJc6NHdKxig6mAnrbR4+prj7M1aacAMIfl7/L+//uKo8SJpcG4ydeiuc0LafjhAAAAsUlEQVQYlW3PSxKCMBBF0QbSpPMBVCRAiCb4F0X3vzsVnVDlHZ7RewCzogT+AWNMpJxLUl8QOsuLxXJVqmgCluG6MnWDLZcfkLZzm61Pm7rpLKkYmMaA2gxh7DtjKQa5Q7EPzHt32LZHngDZ8dSfB+8pXAg1gSJbVdfatYPDcEsIIlD8dDcjt9eze/jPDpJiwLE2VYc7Fr9BESufy0WRZ1rI3xfJ0/R9YBoWzUsgnle+AE9UDGKLrC8lAAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "ixr9BbNC0SWkwR6SxWF6O",
//             "url": "https://www.bigparser.com/grids/",
//             "title": "BigParser - A New Way to Search your Data",
//             "group": "very-long-long-long-long-group-name",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUgoev///8hoezL6fpJse9QtfDr9v1kvfE6rO1Br+4qpetqwPE0qezj8/zD5fl1xfLw+f274vlVt++AyfPmeI7KAAAAV0lEQVQYlY2OQQ6AIAwEuwpVKgjq//9qUKGiHpzjJDtZoj+IyTgVMw44FtEDiTkBg4qRyAGLCiNiG3EyPcWtYb1fm8kryiGwNq5jaSvHvM0Yqde7ypfYARrqAkt8Um9vAAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "l5dZAm6XKCU_i15OX7ca_",
//             "url": "https://www.reddit.com/r/place/?cx=1189&cy=1566&px=199&ts=1649112460185",
//             "title": "place",
//             "group": "subreddits",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEVHcEz/RQD/RQD/QgD/RQD/RQD/RQD/RQD/RQD/RQD/////MgD/OgD/s5//z8P/a0T/5d3/VyH/iGr/qJP/mYD/+vcCA1U1AAAACnRSTlMAJP//y5WUn+ElsgVe0gAAAJFJREFUGJVtT1sOwyAMy0JpIa/C2t3/qjNQaT+zkMAmD5sIqLkwl1zpwcEPjsW3ScxMefv9m7u3WVNXdXJ9Q+BKGYRN+62miXmnMvg7WotT8SzE6ZQHHzkTL+HuIv2SKRTWkHCRC5eiJWOCSJvnNgzFWrtQ4iGuY+0wZt0jHFuWeVhPpmpwsf0PR/TaR/x9xv8CYoYGnu4Mr1kAAAAASUVORK5CYII="
//         },
//         {
//             "id": "9zl_7vfJFWuKDMgQQ30li",
//             "url": "https://www.reddit.com/r/httyd/",
//             "title": "How To Train Your Dragon",
//             "group": "subreddits",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEVHcEz/RQD/RQD/QgD/RQD/RQD/RQD/RQD/RQD/RQD/////MgD/OgD/s5//z8P/a0T/5d3/VyH/iGr/qJP/mYD/+vcCA1U1AAAACnRSTlMAJP//y5WUn+ElsgVe0gAAAJFJREFUGJVtT1sOwyAMy0JpIa/C2t3/qjNQaT+zkMAmD5sIqLkwl1zpwcEPjsW3ScxMefv9m7u3WVNXdXJ9Q+BKGYRN+62miXmnMvg7WotT8SzE6ZQHHzkTL+HuIv2SKRTWkHCRC5eiJWOCSJvnNgzFWrtQ4iGuY+0wZt0jHFuWeVhPpmpwsf0PR/TaR/x9xv8CYoYGnu4Mr1kAAAAASUVORK5CYII="
//         },
//         {
//             "id": "5LBMQBs5aus2DpytHRGnr",
//             "url": "https://www.google.com/search?q=how+tall+is+the+eiffel+tower&rlz=1C5CHFA_enUS953US953&oq=how+tall+is+the+eff&aqs=chrome.1.69i57j0i10l2j46i10i175i199j0i10l6.4343j1j7&sourceid=chrome&ie=UTF-8",
//             "title": "how tall is the eiffel tower - Google Search",
//             "group": "trip-to-paris",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEVHcEz5+fr////7+/v////////7/Pz9/f/+/v/5+vr29vf////qOCc4gfUipUj1tLHrQTD8vgBOjfWs2Lj619QRo0SCqvcYdvS5zvrveXHS6df98fCjv/mcsC0Pm2LB38/ygRf/zVj80VvX69lsu39nuntYkfv+AAAAC3RSTlMAbElFbERs+NUdRxLWvs8AAACRSURBVBiVVY9ZEoMwDEMNA4SgmIQlZem+3f+KdWig9H3ZGlsjES3oNNX0I1MQVLbuJSLltveTc1MflQywxhlBbsKXQm+cFfUYfMQfeNzs6gJNOdA0MnHbtgcg34SBmRdBXu7nLlyPfAovYjr7WpQrDyqYUgF0vhYuI1DEYPPb16/nPupfdKLkWy7Z9dVVFet/APAqCZJLuA/1AAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "ZkLuQ6nSpxOE67oRac2yG",
//             "url": "https://www.google.com/search?q=distance+to+france&rlz=1C5CHFA_enUS953US953&oq=distance+to+france&aqs=chrome..69i57j0i22i30l4j0i390.3860j0j7&sourceid=chrome&ie=UTF-8",
//             "title": "distance to france - Google Search",
//             "group": "trip-to-paris",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEVHcEz5+fr////7+/v////////7/Pz9/f/+/v/5+vr29vf////qOCc4gfUipUj1tLHrQTD8vgBOjfWs2Lj619QRo0SCqvcYdvS5zvrveXHS6df98fCjv/mcsC0Pm2LB38/ygRf/zVj80VvX69lsu39nuntYkfv+AAAAC3RSTlMAbElFbERs+NUdRxLWvs8AAACRSURBVBiVVY9ZEoMwDEMNA4SgmIQlZem+3f+KdWig9H3ZGlsjES3oNNX0I1MQVLbuJSLltveTc1MflQywxhlBbsKXQm+cFfUYfMQfeNzs6gJNOdA0MnHbtgcg34SBmRdBXu7nLlyPfAovYjr7WpQrDyqYUgF0vhYuI1DEYPPb16/nPupfdKLkWy7Z9dVVFet/APAqCZJLuA/1AAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "UsvlDoKNjGeU7B_cR9k9M",
//             "url": "https://www.google.com/search?q=best+restaurants+in+paris&rlz=1C5CHFA_enUS953US953&oq=best+restaurants+in+paris&aqs=chrome..69i57j0i512l4j0i457i512j0i512l4.7570j0j7&sourceid=chrome&ie=UTF-8",
//             "title": "best restaurants in paris - Google Search",
//             "group": "trip-to-paris",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEVHcEz5+fr////7+/v////////7/Pz9/f/+/v/5+vr29vf////qOCc4gfUipUj1tLHrQTD8vgBOjfWs2Lj619QRo0SCqvcYdvS5zvrveXHS6df98fCjv/mcsC0Pm2LB38/ygRf/zVj80VvX69lsu39nuntYkfv+AAAAC3RSTlMAbElFbERs+NUdRxLWvs8AAACRSURBVBiVVY9ZEoMwDEMNA4SgmIQlZem+3f+KdWig9H3ZGlsjES3oNNX0I1MQVLbuJSLltveTc1MflQywxhlBbsKXQm+cFfUYfMQfeNzs6gJNOdA0MnHbtgcg34SBmRdBXu7nLlyPfAovYjr7WpQrDyqYUgF0vhYuI1DEYPPb16/nPupfdKLkWy7Z9dVVFet/APAqCZJLuA/1AAAAAElFTkSuQmCC"
//         },
//         {
//             "id": "6joXSkglOxGBic_o3aa5e",
//             "url": "https://www.expedia.com/trips",
//             "title": "Trips list | Expedia",
//             "group": "trip-to-paris",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLUlEQVQ4jXWTTUiUURSGn/P9zEgkleQys5p0QiOQTCNa2BBiUnspq0U/oNEiiBYuElcujNwUZSCUOxcGQUiL0SCIylaVlPLhiNGvOIXY6OfMvbfFzDgz6ryry+E87znnco6wThWhphrLsa4YiACVgAAxMGNa9MDXzy8/5edL9hEKtQSTjt8nRjoQrPXGGWljeOCqwA3PG/XXDEKhlmDS9p+LSKQIWCAxJmqrYKvnjfoWQNLx+7LwrnLh4fUAjQeKNQFGJHIwnLoDIBWhphrLtj7kt501+fsP+p8meTel1+DGsEXnaQcR0R39iUP2jvJ9XQhH8yssJmDkteJYjU1Xm0t9Vdq7uz3A1VMuQ2OK20NJWVGiZHf4xEdBaou1++RmgOO1NgATU5pbg6vEfpr0KDDpgFRuBm4tgc4zLg3V9losH85oj7MZfLLOoud8gLJSYfBFitItcLbJYWl5Y64DZpbMCGWl0H3OpfWIw7O3irsjSeZ+G+qrrIyBWc/HHDESRahtPmzR0x7gzRdNc9cK3vdc8sxPQ0rB8mohLRB1HJuB3kvuNQvstl6fmR8bqrCwaPi2oAuDBq2VHrDj87H5X4nKncOvVMOfpc1+JK26/TajEyrHi74/Nz3+2AZwA9VjylKNAnuLGbyfViT8DGxM1FUlF+JxT9kA8binyreHh5WV2iZG6pHckWWV8NNtGzH3XBW8WHBM+cqs9mUjJpLbETMrRqJa6Udz3vhkfv5/fEDZ0Q3TlEMAAAAASUVORK5CYII="
//         },
//         {
//             "id": "Bpbzz6QSXnB86SO6_ZUNI",
//             "url": "https://www.nytimes.com/",
//             "title": "The New York Times - Breaking News, US News, World News and Videos",
//             "group": "news",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEVHcEwTExMSEhIYGBgSEhISEhISEhITExMTExMSEhISEhIVFRUTExMTExMSEhISEhISEhITExMSEhISEhISEhJ6ZmnvAAAAFHRSTlMAZ/gJSengWDOuxBuIFZqUuD930um8cCUAAABySURBVBiVdY5JFsMgDEMFAZuhmXX/s9bNY8imWvCsjxEC/qumMe4+5hOgNv/hI8/cQCnhkh8KDYRTHYLuMyPH5AXL8I7qeKPUDoTJwMWjA0tzFOh4FHkoN6zYZo9ilzX3HrZCih3r/PdpOnsAS9C3fesLjbQE1QPk4woAAAAASUVORK5CYII="
//         },
//         {
//             "id": "jR1pyHaR5-G9urWiMy7zm",
//             "url": "https://www.wsj.com/",
//             "title": "The Wall Street Journal - Breaking News, Business, Financial & Economic News, World News and Video",
//             "group": "news",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEX///8AAADb29u/v78vLy+6urqamprw8PDm5ubFxcVAQEDf39+IiIiurq5WVlaPj489PT11dXUaGhqioqJ8fHz5+fnPz88yMjI3NzdGRkYTExNKSkoDqd0NAAAAaklEQVQYla3PWxLCIBBE0UtgeGOMBDC6/32KKd1B5qv7fHTVwBUXpdxYvRXB3WXCJv6BDpUKJk0oe1PorpjFLBPSWGLSPA9+gAqrneGV/3DYoPA4RRsn5OIMuhG3Or6jSCcTrC6hvy95hA/OwgN0y2lwNQAAAABJRU5ErkJggg=="
//         },
//         {
//             "id": "YcijEmlE9_6CnD8IlkUAG",
//             "url": "https://www.washingtonpost.com/",
//             "title": "The Washington Post: Breaking News, World, US, DC News and Analysis",
//             "group": "news",
//             "firstCreated": 1649892387031,
//             "lastModified": 1649892387031,
//             "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVQ4jc3RMUpDQRAG4A81IBEUT6CNniBtwGAlmMLCShAkd/ACFmIRSCNC2lzATluvYCF2gmijllYiPos3T9dkA/JA8IdlZv/Z+fefXf4L1nCI5boCQxQZfi7JG7l8NuILeljEAEu4xR2u8Iab4B9xjVVcpLd9oIN+uOnjAU9RL2Kdx/rhuBtEJzkMpyGyEdxl8HvVmZkgjjPzQxPvaE+pfwnsjO0rzGMFR9MEqle+j7idiOwqv3U01rOOVs7JiXKunnL2AgdRP/P9Bs+R7+ccbSZ5N2ITW9H0qhx3wsFvUH1jLTSieaGuwN/hEzf9MFMNhMLkAAAAAElFTkSuQmCC"
//         }
//     ],
//     "groups": [
//         {
//             "id": "lodash",
//             "title": "Lodash",
//             "color": "blue"
//         },
//         {
//             "id": "fashion",
//             "title": "Fashion",
//             "color": "red"
//         },
//         {
//             "id": "stack-overflow",
//             "title": "Stack Overflow",
//             "color": "yellow"
//         },
//         {
//             "id": "technology",
//             "title": "Technology",
//             "color": "green"
//         },
//         {
//             "id": "very-long-long-long-long-group-name",
//             "title": "Very Long Long Long Long Group Name",
//             "color": "pink"
//         },
//         {
//             "id": "subreddits",
//             "title": "Subreddits",
//             "color": "purple"
//         },
//         {
//             "id": "trip-to-paris",
//             "title": "Trip to Paris",
//             "color": "cyan"
//         },
//         {
//             "id": "news",
//             "title": "News",
//             "color": "orange"
//         }
//     ],
//     "settings": {
//         "defaultClickAction": "send_all_tabs"
//     }
// }
