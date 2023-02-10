var now1 = new Date();

function createtime1() {
    var grt = new Date("01/01/2023 00:00:00"); //此处修改你的建站时间或者网站上线时间
    now1.setTime(now1.getTime() + 250);
    var days = (now1 - grt) / 1000 / 60 / 60 / 24;
    var dnum = Math.floor(days);

    var ascll = [
        `欢迎来到CaptLin's Blog🍨の控制台!`,
        `Happy every day🍭🍭🍭`,
        `
        
.d8888b.                    888    888      d8b         d8b              888888b.   888                   
d88P  Y88b                   888    888      Y8P         88P              888  "88b  888                   
888    888                   888    888                  8P               888  .88P  888                   
888         8888b.  88888b.  888888 888      888 88888b. "  .d8888b       8888888K.  888  .d88b.   .d88b.  
888            "88b 888 "88b 888    888      888 888 "88b   88K           888  "Y88b 888 d88""88b d88P"88b 
888    888 .d888888 888  888 888    888      888 888  888   "Y8888b.      888    888 888 888  888 888  888 
Y88b  d88P 888  888 888 d88P Y88b.  888      888 888  888        X88      888   d88P 888 Y88..88P Y88b 888 
    "Y8888P"  "Y888888 88888P"   "Y888 88888888 888 888  888    88888P'      8888888P"  888  "Y88P"   "Y88888 
                    888                                                                                888 
                    888                                                                           Y8b d88P 
                    888                                                                            "Y88P"  
                                              
`,
        "小站已经苟活",
        dnum,
        "哇塞!",
        "©2023 By Sunshine",
    ];

    setTimeout(
        console.log.bind(
            console,
            `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            ""
        )
    );
}

createtime1();

function createtime2() {
    var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];

    setTimeout(
        console.log.bind(
            console,
            `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
            "color:white; background-color:#10bcc0",
            "",
            "",
            'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
        )
    );

    setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));

    setTimeout(
        console.warn.bind(
            console,
            "%c ⚡ Powered by CaptLin's Blog🍨 %c 注意注意！你已在CaptLin's Blog🍨の监控范围内，不要做坏事哦",
            "color:white; background-color:#f0ad4e",
            ""
        )
    );

    setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
    setTimeout(
        console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
    );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };