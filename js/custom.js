// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
                this.$notify({
                    title: "芜湖！复制成功💡",
                    message: "快点去实践吧！如需转载请注明出处哈",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }, 300);
    
})

// F12按键
document.onkeydown = function () {
  // f12
  if (window.event && window.event.keyCode == 123) {
    debounce(function () {
        new Vue({
          data: function () {
              this.$notify({
                  title: "你小子，被发现了吧😜",
                  message: "小伙子，扒源记住要遵循GPL协议！",
                  position: 'top-left',
                  offset: 50,
                  showClose: true,
                  type: "warning",
                  duration: 5000
              });
          }
      })
    }, 300);
  }
}



// 设置文章统计 适配明暗模式
function switchPostChart () {
    // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
    let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)'
    if (document.getElementById('posts-chart') && postsOption) {
      try {
        let postsOptionNew = postsOption
        postsOptionNew.title.textStyle.color = color
        postsOptionNew.xAxis.nameTextStyle.color = color
        postsOptionNew.yAxis.nameTextStyle.color = color
        postsOptionNew.xAxis.axisLabel.color = color
        postsOptionNew.yAxis.axisLabel.color = color
        postsOptionNew.xAxis.axisLine.lineStyle.color = color
        postsOptionNew.yAxis.axisLine.lineStyle.color = color
        postsOptionNew.series[0].markLine.data[0].label.color = color
        postsChart.setOption(postsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('tags-chart') && tagsOption) {
      try {
        let tagsOptionNew = tagsOption
        tagsOptionNew.title.textStyle.color = color
        tagsOptionNew.xAxis.nameTextStyle.color = color
        tagsOptionNew.yAxis.nameTextStyle.color = color
        tagsOptionNew.xAxis.axisLabel.color = color
        tagsOptionNew.yAxis.axisLabel.color = color
        tagsOptionNew.xAxis.axisLine.lineStyle.color = color
        tagsOptionNew.yAxis.axisLine.lineStyle.color = color
        tagsOptionNew.series[0].markLine.data[0].label.color = color
        tagsChart.setOption(tagsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('categories-chart') && categoriesOption) {
      try {
        let categoriesOptionNew = categoriesOption
        categoriesOptionNew.title.textStyle.color = color
        categoriesOptionNew.legend.textStyle.color = color
        if (!categoryParentFlag) { categoriesOptionNew.series[0].label.color = color }
        categoriesChart.setOption(categoriesOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
  }
  document.getElementById("mode-button").addEventListener("click", function () { setTimeout(switchPostChart, 100) })




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
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
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
anzhiyu.reflashEssayWaterFall();


// 图片懒加载
window.onload = function () {
  // 获取图片列表，即 img 标签列表
  var imgs = document.querySelectorAll('img');
  // 获取到浏览器顶部的距离
  function getTop(e) {
      return e.offsetTop;
  }
  // 懒加载实现
  function lazyload(imgs) {
      // 可视区域高度
      var h = window.innerHeight;
      // 滚动区域高度
      var s = document.documentElement.scrollTop || document.body.scrollTop;
      for (var i = 0; i < imgs.length; i++) {
          //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
          if ((h + s) > getTop(imgs[i])) {
              // 真实情况是页面开始有2秒空白，所以使用 setTimeout 定时 2s
              (function (i) {
                  setTimeout(function () {
                      // 不加立即执行函数i会等于9
                      // 隐形加载图片或其他资源，
                      // 创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
                      var temp = new Image();
                      temp.src = imgs[i].getAttribute('data-src');//只会请求一次
                      // onload 判断图片加载完毕，真是图片加载完毕，再赋值给 dom 节点
                      temp.onload = function () {
                          // 获取自定义属性 data-src，用真图片替换假图片
                          imgs[i].src = imgs[i].getAttribute('data-src')
                      }
                  }, 2000)
              })(i)
          }
      }
  }
  lazyload(imgs);
  // 滚屏函数
  window.onscroll = function () {
      lazyload(imgs);
  }
}

/**
 * 切换背景
 */ 
// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_2") == undefined) {
  localStorage.setItem("reset_2", "1");
  localStorage.removeItem("reset_1");
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "提示🍒",
          message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}

// 清除localStorage配置项
function clearItem() {
  localStorage.removeItem('blogbg');
}

// 刷新窗口
function reload() {
  window.location.reload();
}

// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}


function getPicture_() {
  let bg = document.getElementById("web_bg");
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    bg.style.backgroundImage = link;
    localStorage.setItem("blogbg", link);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}

// 必应每日图片
if (localStorage.getItem("bing") == undefined) {
  localStorage.setItem("bing", "false");
}
if (localStorage.getItem("bing") == "true") {
  let bg = document.getElementById("web_bg");
  // 手机电脑分开
  let curUrl = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
  bg.style.backgroundImage = curUrl;
}
function setBing() {
  // 打开就设置
  if (document.getElementById("bingSet").checked) {
    let bg = document.getElementById("web_bg");
    // 手机电脑分开
    let curUrl = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
    bg.style.backgroundImage = curUrl;
    localStorage.setItem("bing", "true");
    localStorage.removeItem("blogbg");
  } else {
    // 关闭就移除并恢复默认壁纸
    localStorage.setItem("bing", "false");
    setTimeout(reload, 600);
  }
}

// 存数据
// name：命名 data：数据
function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  // 过期或有错误返回 0 否则返回数据
  if (d) {
      let t = Date.now() - d.time
      if (t < (time * 60 * 1000) && t > -1) return d.data;
  }
  return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
  let data = loadData('blogbg', 1440)
  if (data) changeBg(data, 1)
  else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
  let bg = document.getElementById('web_bg')
  if (s.charAt(0) == '#') {
      bg.style.backgroundColor = s
      bg.style.backgroundImage = 'none'
  } else bg.style.backgroundImage = s
  if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
  let div = document.createElement('div')
  document.body.appendChild(div)
  winbox = WinBox({
      id: 'changeBgBox',
      index: 999,
      title: "⚙️设置背景",
      x: "left",
      y: "center",
      minwidth: '300px',
      height: "60%",
      background: '#5fcdff',
      onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
      onrestore: () => { div.innerHTML = '' }
  });
  winResize();
  window.addEventListener('resize', winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
  <div class="settings" style="display: block;">
  <div id="article-container" style="padding:12px;">
  <br>
	<center>
    <p>
      <button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;">
        <i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景
      </button>
    </p>
	</center>

  <h2>1. 风景</h2>
  <details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.ladydaily.com/img/fj1.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://tuchuang.voooe.cn/images/2023/02/17/4ea1221c-78f0-4952-a3c6-f16acb33b57f.jpg)" class="imgbox" onclick="changeBg('url(https://tuchuang.voooe.cn/images/2023/02/17/4ea1221c-78f0-4952-a3c6-f16acb33b57f.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://tuchuang.voooe.cn/images/2023/02/17/follow.png)" class="imgbox" onclick="changeBg('url(https://tuchuang.voooe.cn/images/2023/02/17/follow.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://tuchuang.voooe.cn/images/2023/02/17/darkmodepicture70.jpg)" class="imgbox" onclick="changeBg('url(https://tuchuang.voooe.cn/images/2023/02/17/darkmodepicture70.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://tuchuang.voooe.cn/images/2023/02/17/170341-15534182211404-1.jpg)" class="imgbox" onclick="changeBg('url(https://tuchuang.voooe.cn/images/2023/02/17/170341-15534182211404-1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="imgbox" onclick="changeBg('url(https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a></div>
              </div>
            </details>

  <h2>2. 二次元</h2>
  <details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/home_bg.webp)" class="imgbox" onclick="changeBg('url(https\://sourcebucket.s3.ladydaily.com/img/home_bg.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://imgs.zhouenpei0523.top/i/2023/01/13/lzjcmy-2.jpg" class="imgbox" onclick="changeBg('url(https://imgs.zhouenpei0523.top/i/2023/01/13/lzjcmy-2.jpg)')"></a><a id="yinghuaBox" rel="noopener external nofollow" style="background-image:url(https://www.dmoe.cc/random.php)" class="box apiBox" onclick="changeBg('url(https://www.dmoe.cc/random.php)')"></a><a id="xiaowaierBox" rel="noopener external nofollow" style="background-image:url(https://api.ixiaowai.cn/api/api.php)" class="box apiBox" onclick="changeBg('url(https://api.ixiaowai.cn/api/api.php)')"></a><a id="motianyiBox" rel="noopener external nofollow" style="background-image:url(https://api.mtyqx.cn/tapi/random.php)" class="box apiBox" onclick="changeBg('url(https://api.mtyqx.cn/tapi/random.php)')"></a></div>
              </div>
            </details>

  <h2>3. 萌宠</h2>
  <details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/mc1.webp)" class="imgbox" onclick="changeBg('url(https://sourcebucket.s3.ladydaily.com/img/mc1.webp)')"></a></div>
              </div>
            </details>

  <h2>4. 渐变色</h2>
  <details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg,rgba(247,149,51,.1) 0,rgba(243,112,85,.1) 15%,rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,rgba(7,179,155,.1) 86%,rgba(109,186,130,.1) 100%)" onclick="changeBg('linear-gradient(90deg,rgba(247,149,51,.1) 0,rgba(243,112,85,.1) 15%,rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,rgba(7,179,155,.1) 86%,rgba(109,186,130,.1) 100%)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #005f58, #00205a)" onclick="changeBg('linear-gradient(to right, #005f58, #00205a)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)" onclick="changeBg('linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(135deg,#f02fc2,#6094ea)" onclick="changeBg('linear-gradient(135deg,#f02fc2,#6094ea)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(135deg,#c6ffdd,#fbd786,#f7797d)" onclick="changeBg('linear-gradient(135deg,#c6ffdd,#fbd786,#f7797d)')"></a></div>
              </div>
            </details>

  <h2>5. 纯色</h2>
  <details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #72c6ef" onclick="changeBg('#72c6ef')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #fbc7d4" onclick="changeBg('#fbc7d4')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9796f0" onclick="changeBg('#9796f0')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #faaca8" onclick="changeBg('#faaca8')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #fdeb71" onclick="changeBg('#fdeb71')"></a>  <input type="color" id="colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="#ea6060" oninput="changeBgColor()"></input></div>
              </div>
            </details>

  <h2>6. 适配手机</h2>
  <details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/1083807/pexels-photo-1083807.jpeg?auto=compress&cs=tinysrgb&w=600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/1083807/pexels-photo-1083807.jpeg?auto=compress&cs=tinysrgb&w=600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/1056252/pexels-photo-1056252.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/1056252/pexels-photo-1056252.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/3394159/pexels-photo-3394159.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/3394159/pexels-photo-3394159.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://images.pexels.com/photos/6686455/pexels-photo-6686455.jpeg?auto=compress&cs=tinysrgb&w=1600)" class="pimgbox" onclick="changeBg('url(https://images.pexels.com/photos/6686455/pexels-photo-6686455.jpeg?auto=compress&cs=tinysrgb&w=1600)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.xjh.me/random_img.php?return=302)" class="pimgbox" onclick="changeBg('url(https://img.xjh.me/random_img.php?return=302)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://sourcebucket.s3.ladydaily.com/img/mb4.webp)" class="pimgbox" onclick="changeBg('url(https\://sourcebucket.s3.ladydaily.com/img/mb4.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic2.zhimg.com/v2-dc38120209c19df05d0207ea9c17dc0d_b.jpg)" class="pimgbox" onclick="changeBg('url(https://pic2.zhimg.com/v2-dc38120209c19df05d0207ea9c17dc0d_b.jpg)')"></a>
              </div>
            </details>

  <h2>7. 随机壁纸API</h2>
  <details class="folding-tag" cyan><summary> 查看热门壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image:url(https://api.iculture.cc/api/bing)" class="box apiBox" onclick="changeBg('url(https://api.iculture.cc/api/bing)')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image:url(https://bing.img.run/rand_m.php)" class="box apiBox" onclick="changeBg('url(https://bing.img.run/rand_m.php)')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image:url(https://api.yimian.xyz/img?type=moe&size=1920x1080)" class="box apiBox" onclick="changeBg('url(https://api.yimian.xyz/img?type=moe&size=1920x1080)')"></a><a id="seovxBox" rel="noopener external nofollow" style="background-image:url(https://cdn.seovx.com/?mom=302)" class="box apiBox" onclick="changeBg('url(https://cdn.seovx.com/?mom=302)')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/1920/1080.webp)" class="box apiBox" onclick="changeBg('url(https://picsum.photos/1920/1080.webp)')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image:url(https://api.ixiaowai.cn/gqapi/gqapi.php)" class="box apiBox" onclick="changeBg('url(https://api.ixiaowai.cn/gqapi/gqapi.php)')"></a><a id="btstuBox" rel="noopener external nofollow" style="background-image:url(https://api.btstu.cn/sjbz/api.php)" class="box apiBox" onclick="changeBg('url(https://api.btstu.cn/sjbz/api.php)')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image:url(https://source.unsplash.com/random/1920x1080/)" class="box apiBox" onclick="changeBg('url(https://source.unsplash.com/random/1920x1080/)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://api.aagtool.top/api/sjtp?type=json&image=all)" class="box apiBox" onclick="changeBg('url(https://api.aagtool.top/api/sjtp?type=json&image=all)')"></a>
              </div>
            </details>

  <h2>8. 自定义背景</h2>
  <details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://tuchuang.voooe.cn/images/2023/02/15/city_in_the_clouds_by_tatasz_d8yebbu.png"></center></p><p><center><button type="button" onclick="getPicture()" style="background:#5fcdff;width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🥏切换背景🥏</button></center></p>
              </div>
            </details>

  <br>
  <center><div style="font-size:1.2em;color:#5fcdff;font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
  <br>

  </div>
  </div>
`;
}

// 恢复默认背景
function resetBg() {
  localStorage.removeItem('blogbg');
  reload();
}

// 恢复默认设置并刷新页面
function reset() {
  clearItem();
  reload();
}

// 适应窗口大小
function winResize() {
  var offsetWid = document.documentElement.clientWidth;
  if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
  } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
  else createWinbox();
}