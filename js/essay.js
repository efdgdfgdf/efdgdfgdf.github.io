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
function anzhiyuScrollFn() {
  var n = document.getElementById("waterfall");
  window.anzhiyuScrollFnToDo = btf.throttle((function() {
      n && (e = t % document.documentElement.clientHeight,
      100 + e >= document.documentElement.clientHeight ? (console.info(e, document.documentElement.clientHeight),
      setTimeout((function() {
          waterfall("#waterfall")
      }
      ), 500)) : setTimeout((function() {
          n && waterfall("#waterfall")
      }
      ), 500))
  }
  ), 48),
  window.addEventListener("scroll", anzhiyuScrollFnToDo)
}
var anzhiyu = {
  initIndexEssay: function() {
    setTimeout((()=>{
        let e = new Swiper(".essay_bar_swiper_container",{
            passiveListeners: !0,
            direction: "vertical",
            loop: !0,
            autoplay: {
                disableOnInteraction: !0,
                delay: 3e3
            },
            mousewheel: !0
        })
          , t = document.getElementById("bbtalk");
        null !== t && (t.onmouseenter = function() {
            e.autoplay.stop()
        }
        ,
        t.onmouseleave = function() {
            e.autoplay.start()
        }
        )
    }
    ), 100)
  },
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
  setPostLike: function() {
    var e = window.location.href
      , t = e.slice(e.lastIndexOf("/") + 1)
      , n = document.querySelector(".like-button")
      , a = JSON.stringify({
        postname: t
    });
    n && (n.disabled = !0);
    var s = new XMLHttpRequest;
    s.withCredentials = !0,
    s.addEventListener("readystatechange", (function() {
        if (1 != this.readyState && n && (n.disabled = !1),
        4 === this.readyState) {
            let e = JSON.parse(this.responseText);
            e.status ? (document.querySelector(".like-button .fa-regular.fa-thumbs-up") && (document.querySelector(".like-button .fa-regular.fa-thumbs-up").innerHTML = "  " + e.msg),
            void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow("读者大大真好人！")) : void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow("抱歉，点赞坏了。")
        }
    }
    ))
    // ,
    // s.open("POST", "https://qexo.shineyu.cn/pub/set_postlike/"),
    // s.setRequestHeader("Content-Type", "application/json"),
    // s.send(a)
  },
  getPostLike: function() {
    var e = window.location.href
      , t = e.slice(e.lastIndexOf("/") + 1)
      , n = document.querySelector(".like-button")
      , a = JSON.stringify({
        postname: t
    });
    n && (n.disabled = !0);
    var s = new XMLHttpRequest;
    s.withCredentials = !0,
    s.addEventListener("readystatechange", (function() {
        if (1 != this.readyState && n && (n.disabled = !1),
        4 === this.readyState) {
            let e = JSON.parse(this.responseText);
            e.status ? document.querySelector(".like-button .fa-regular.fa-thumbs-up") && (document.querySelector(".like-button .fa-regular.fa-thumbs-up").innerHTML = "  " + e.msg) : document.querySelector(".like-button .fa-regular.fa-thumbs-up") && (document.querySelector(".like-button .fa-regular.fa-thumbs-up").innerHTML = " 点赞坏啦~")
        }
    }
    )),
    s.open("POST", "https://qexo.shineyu.cn/pub/get_postlike/"),
    s.setRequestHeader("Content-Type", "application/json"),
    s.send(a)
  },
  commentText: function(e) {
    var t = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, t - 80),
    "undefined" != e && "null" != e || (e = "好棒！"),
    function t() {
        setTimeout((()=>{
            var n = document.getElementsByClassName("el-textarea__inner")[0];
            n || t();
            let l = document.createEvent("HTMLEvents");
            l.initEvent("input", !0, !0);
            let o = replaceAll(e, "\n", "\n> ");
            n.value = "> " + o + "\n\n",
            n.dispatchEvent(l),
            n.focus(),
            n.setSelectionRange(-1, -1),
            document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show")
        }
        ), 100)
    }()
  },
};
anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.changeTimeInAlbumDetail();
anzhiyu.reflashEssayWaterFall();
anzhiyuScrollFn();
anzhiyu.getPostLike();



