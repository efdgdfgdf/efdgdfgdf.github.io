var pathName = window.document.location.pathname
if (pathName === '/') {
  $(document).ready(function(){
      if ( $("#bber-talk").length > 0 ) {
        var jsonUrl = ''
        jsonUrl = "https://626c-blogpkly-13278c-1258453354.tcb.qcloud.la/json/bber.json"
        $.getJSON(jsonUrl+"?t="+Date.parse( new Date()),function(res){
          var bberHtml = ''
          $.each(res.data, function(i, item){
            var d = new Date(item.date)
            var date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
            var dataTime = timeago.format(date, 'zh_CN');
            var newdataTime = '<span class="datatime">'+dataTime+'</span>'
            bberHtml += '<li class="item item-'+(i+1)+'">'+'<a href="https://guole.fun/bb/" style="color: var(--font-color);/*font-weight: normal;*/">'+newdataTime+'： '+urlToLink(item.content)+'</a></li>'
          });
          $('#bber-talk').append('<span class="index-talk-icon" style="margin-right: 5px"><svg viewBox="0 0 550 550" width="15" height="15"><path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path></svg></span><ul class="talk-list">'+bberHtml+'</ul>')
        });
        function urlToLink(str) {
          var img_tag = /(<br>)|([[\s\S]*])|(\()|(\))/g;
          var re_forimg =/\<[img|IMG].*?src=[\'|\"](https\:\/\/.*?(?:[\.jpg|\.jpeg|\.png|\.gif|\.bmp]))[\'|\"].*?[\/]?>/g;
          var music = /(y.qq.com)|(music.163.com)/g;
          var music_url = /[a-zA-z]+:\/\/[^\s]*/g;
            if (music.test(str)) {
              str =str.replace(music_url,function () {
                return '<svg viewBox="0 0 1024 1024" width="18" height="18"><path d="M960 0H1024v736c0 88.3712-100.283733 160-224 160S576 824.3712 576 736s100.283733-160 224-160c62.685867 0 119.3472 18.397867 160 48.042667V256l-512 113.783467v494.216533c0 88.3712-100.283733 160-224 160S0 952.3712 0 864s100.283733-160 224-160c62.685867 0 119.3472 18.397867 160 48.042667V128L960 0z"></path></svg>音乐分享';
              });
            } else {}
          str =str.replace(re_forimg,'$1');
          var re_formd = /^!\[(.*)\]\((.*)\)/g;
          str = str.replace(re_formd,'$2');
          str = str.replace(img_tag,"");
          var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
          var re_forpic =/\bhttps?:\/\/.*?(\.gif|\.jpe?g|\.png|\.bmp|\.webp)/g;
          str =str.replace(re,function (website) {
            return '<svg viewBox="0 0 1025 1024" width="21" height="21"><path d="M333.06186 733.061768c-58.347896 52.210106-97.040127 49.051159-136.467091 9.492188l-45.156456-48.462758c-39.427988-39.541575-39.427988-103.667058 0-143.226029l193.260585-193.848986c39.426965-39.558971 103.355973-39.558971 142.78396 0l35.679617 35.794228c30.457686 30.555923 37.398772 75.762521 20.801768 112.997564l86.286202 66.040089c59.149145-59.33027 59.149145-155.517983 0-214.830857L523.162476 249.600755c-59.133795-59.33027-155.010423-59.33027-214.160591 0L44.350342 515.071965c-59.133795 59.313897-59.133795 155.50161 0 214.830857l107.08797 107.415428c59.133795 59.313897 155.026796 59.313897 214.176964 0l102.161774-105.647155-72.980151-70.034053L333.06186 733.061768zM987.196021 285.394982 880.1234 177.979554c-59.149145-59.33027-155.026796-59.33027-214.176964 0 0 0 4.223185-1.064238-57.988716 61.343113l71.113641 68.167542 31.604812-34.877345c39.427988-39.541575 103.356996-39.541575 142.78396 0l35.69599 35.8106c39.427988 39.541575 39.427988 103.667058 0 143.226029L714.818517 632.847345c-39.427988 39.541575-103.340623 39.541575-142.768611 0l-29.395494-48.462758c-61.883419-46.25344-42.865273-57.317427-37.611619-88.544639L426.548044 418.130076c-59.150168 59.33027-59.150168 155.517983 0 214.830857l107.072621 107.432825c59.149145 59.312874 155.026796 59.312874 214.176964 0l239.398392-240.166895C1071.582967 402.924769 987.196021 285.394982 987.196021 285.394982z"></path></svg>';
          });
          str =str.replace(re_forpic,function (imgurl) {
            return '<svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M821.6 120.93333333H195.4c-74.1 0-134.2 60.1-134.2 134.2v492c0 74.1 60.1 134.2 134.2 134.2h626.2c74.1 0 134.2-60.1 134.2-134.2v-492c0-74.1-60.1-134.2-134.2-134.2zM251.3 255.13333333c30.9 0 55.9 25 55.9 55.9s-25 55.9-55.9 55.9-55.9-25-55.9-55.9 25-55.9 55.9-55.9z m614.6 559.1H153.3c-37.3 0-58.2-43.1-35.1-72.4L302.1 508.33333333c17.9-22.7 52.4-22.7 70.3 0l76.5 97.2 148.6-260c17.2-30.1 60.5-30.1 77.7 0L904.8 747.33333333c17 29.8-4.5 66.9-38.9 66.9z"></path></svg>';
          });
          return str;
        }
        function Roll (){
          var list_li = $('.talk-list li'),cur_li = list_li.first(),last_li = list_li.last();
          last_li.after(cur_li);
        };
        setInterval(Roll,3000);
      }
    });
} else {}
