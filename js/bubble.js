// 气泡特效
$("#essay_page .author-content.author-content-item.single").append('<canvas id="header_canvas" style="position:absolute;bottom:0" width="844" height="346">'),
$("#essay_page .author-content.author-content-item.single").parent().attr("class", "thumbnail_canvas"),
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
