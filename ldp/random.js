var posts=["posts/f1a5/","posts/1342/","posts/1231/","posts/0000/","posts/2892/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};