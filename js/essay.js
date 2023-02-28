// 即刻短文
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  // 刷新即刻短文瀑布流
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  changeTimeInAlbumDetail: function() {
    document.querySelector("#album_detail") && document.querySelectorAll("#album_detail time").forEach(function(e) {
        var t = e.getAttribute("datetime");
        e.innerText = anzhiyu.diffDate(t, !0),
        e.style.display = "inline"
    })
  },
  // 即刻短文添加灯箱
  addMediumInEssay: function() {
    if (document.querySelector('#waterfall')) {
      mediumZoom(document.querySelectorAll('[data-zoomable]'))
    }
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
};

anzhiyu.changeTimeInEssay();
anzhiyu.changeTimeInAlbumDetail();
anzhiyu.reflashEssayWaterFall();


// 气泡特效
$(".author-content.author-content-item.single").append('<canvas id="header_canvas" style="position:absolute;bottom:0" width="844" height="346">'),
$(".author-content.author-content-item.single").parent().attr("class", "thumbnail_canvas"),
function() {
    var t, e, n, o, h, i = !0;
    if (t = document.getElementById("header_canvas"),
    l(),
    t) {
        e = t.getContext("2d"),
        h = [];
        for (var a = .04 * n, r = 0; r < a; r++) {
            var s = new d;
            h.push(s)
        }
        c()
    }
    function c() {
        if (i)
            for (var a in e.clearRect(0, 0, n, o),
            h)
                h[a].draw();
        requestAnimationFrame(c)
    }
    function l() {
        var a = document.querySelector(".thumbnail_canvas");
        a && (n = a.offsetWidth,
        o = a.offsetHeight,
        t.width = n,
        t.height = o)
    }
    function d() {
        var a = this;
        function t() {
            a.pos.x = Math.random() * n,
            a.pos.y = o + 100 * Math.random(),
            a.alpha = .1 + .5 * Math.random(),
            a.alpha_change = 2e-4 + 5e-4 * Math.random(),
            a.scale = .2 + .8 * Math.random(),
            a.scale_change = .002 * Math.random(),
            a.speed = .1 + .4 * Math.random()
        }
        a.pos = {},
        t(),
        this.draw = function() {
            a.alpha <= 0 && t(),
            a.pos.y -= a.speed,
            a.alpha -= a.alpha_change,
            a.scale += a.scale_change,
            e.beginPath(),
            e.arc(a.pos.x, a.pos.y, 10 * a.scale, 0, 2 * Math.PI, !1),
            e.fillStyle = "rgba(255,255,255," + a.alpha + ")",
            e.fill()
        }
    }
    window.onresize = function() {
        l()
    }
}();
