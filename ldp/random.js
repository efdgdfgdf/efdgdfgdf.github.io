var posts=["posts/1231/","posts/1342/","posts/f1a5/","posts/2892/","posts/0000/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};