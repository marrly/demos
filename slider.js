(function($){
    $.fn.slider = function(option){
        var defaultVal = {
            left: false,
            top: false,
            opacity: false,
            speed: 3000,
            index: 0,
            max: 1,
            min: 0,
            icon: false,
            timer: null,
            arrow: false,
            data: null,
            position: 1000,
            preIndex: -1

        };

        var opts = $.extend({},defaultVal,option);
        console.log(opts);
        var ul = $('<ul class="slide_list"></ul>');
        var div = $('<div class="slider_icon"></div>');
        var guide = $('<span id="left" class="arrow-icon"><<</span><span id="right" class="arrow-icon">>></span>');

        for(var i = 0; i < opts.data.length; i++){
            var li = $('<li class="slide_item"><div class="_img" style="background-image: url(' + opts.data[i].img +')" ></div></li>');
            var span = $('<span class="icon-item arrow-dot"></span>');
            ul.append(li);
            div.append(span);
        }
        $('.slider').append(ul,div,guide);

        // //核心方法，把当前index的图片和icon显示，把除此之外的图片和icon隐藏
        var isClick = false;
        var item =  $(".slide_item");
        var core = function() {

            // 小圆点
            $(".icon-item").eq(opts.index).addClass("active").siblings(".icon-item").removeClass("active");
            // 透明度
            if(opts.opacity){
                item .eq(opts.index).stop().animate({ "opacity": opts.max }, 500).siblings(".slide_item").css({"opacity": opts.min });
            }

            if(opts.left){
                if(opts.preIndex >= 0){
                    item.eq(opts.index).stop().animate({ "left": 0}, 1000);
                    item.eq(opts.preIndex).stop().animate({ "left": -opts.position + 'px' }, 1000);
                }else{
                    item .eq(opts.index).stop().animate({ "left": 0 }, 1000).siblings(".slide_item").css({"left": opts.position + 'px'});
                }
                item.eq(opts.preIndex -1 ).css({"left": opts.position + 'px'});
            }
            if(opts.top){
                $('.slider_icon').addClass('slider_icon_top');
                if(opts.preIndex >= 0){
                    item.eq(opts.index).stop().animate({ "top": 0}, 1000);
                    item.eq(opts.preIndex).stop().animate({ "top": -opts.position + 'px' }, 1000);
                }else{
                    item .eq(opts.index).stop().animate({ "top": 0 }, 1000).siblings(".slide_item").css({"top": opts.position + 'px'});
                }
                item.eq(opts.preIndex -1 ).css({"top": opts.position + 'px'});
            }
        };
        var index = null;
        // // 是否箭头
        if(opts.arrow){
            $(this).find('.arrow-icon').css({display: 'block'});
            //左边
            $(this).find("#left").bind("click", function() {
                index = opts.index - 1;
                --opts.index;
                opts.preIndex = opts.index - 1;
                overHandle();
                // 小圆点
                $(".icon-item").eq(index).addClass("active").siblings(".icon-item").removeClass("active");
                // 左右
                if(opts.left){
                    item.eq(index).css({ "left": 0}).siblings().css({"left": opts.position + 'px' });
                }
                // 上下
                if(opts.top){
                    item.eq(index).css({ "top": 0}).siblings().css({"top": opts.position + 'px' });
                }
            });
            //右边
            $(this).find("#right").bind("click", function() {
                index = opts.index + 1;
                ++opts.index;
                opts.preIndex = opts.index - 1;
                overHandle();
                // 小圆点
                $(".icon-item").eq(index).addClass("active").siblings(".icon-item").removeClass("active");
                // 左右
                if(opts.left){
                    item.eq(index).css({ "left": 0}).siblings().css({"left": opts.position + 'px' });
                }
                // 上下
                if(opts.top){
                    item.eq(index).css({ "top": 0}).siblings().css({"top": opts.position + 'px' });
                }
            });
        }else{
            $(this).find('.arrow-icon').css({display: 'none'});
        }

        // 是否小圆点
        if(opts.icon){
            $(this).find('.arrow-dot').css({display: 'block'});
            //每个icon分配事件
            $(this).find(".slider_icon").on("click", "span", function() {
                var item = $(".slide_item");
                if(opts.left){
                    opts.index = $(this).index();
                    opts.preIndex = $(this).index() - 1;
                    item.eq(opts.index).css({ "left": 0}).siblings().css({"left": opts.position + 'px' });
                    $(".icon-item").eq(opts.index).addClass("active").siblings(".icon-item").removeClass("active");
                }

                if(opts.top){
                    opts.index = $(this).index();
                    opts.preIndex = $(this).index() - 1;
                    item.eq(opts.index).css({ "top": 0}).siblings().css({"top": opts.position + 'px' });
                    $(".icon-item").eq(opts.index).addClass("active").siblings(".icon-item").removeClass("active");
                }
            });
        }else{
            $(this).find('.arrow-dot').css({display: 'none'});
        }
        //定时器
        var start = function() {
            clearInterval(opts.timer);
            opts.timer = setInterval(function() {
                ++opts.index;
                opts.preIndex = opts.index - 1;
                overHandle();
                core();
            }, opts.speed);
        };

        // 鼠标移入停止轮播
        $(this).hover(function() {
            clearInterval(opts.timer);
        }, function() {
            start();
        });

        core();
        start();

        // 条件判断
        function overHandle(){
            if(index > opts.data.length - 1){
                index = 0;
            }else if(index < 0){
                index = opts.data.length - 1;
            }

            if (opts.index > opts.data.length - 1) {
                opts.index = 0;
            } else if (opts.index < 0) {
                opts.index = opts.data.length - 1;
            }

            if (opts.preIndex > opts.data.length - 1) {
                opts.preIndex = 0;
            } else if (opts.preIndex < 0) {
                opts.preIndex = opts.data.length - 1;
            }
        }
    }
}(jQuery));
