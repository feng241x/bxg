/**
 * 这里是完成其他页面公共要使用的功能
 * 功能1：判断用户是否登陆
 * 功能2：从cookie中读取用户的资料并且展示
 * 功能3：导航菜单交互（展开与收起）
 * 功能4：退出登录
 * 功能5：让页面打开时有进度条，让每个ajax发送过程有进度
 */

define(['jquery','nprogress','cookie'],function($,NProgress){
    NProgress.start()
    validSignIn()     //验证是否登录
    getInfo()         //获取用户资料并且展示
    navToggle()       //导航菜单交互
    signOut()         //退出登录
    globalAjaxEvent() //注册全局的ajax事件 添加进度条！

    //功能1：判断用户是否登陆
    function validSignIn (){
        // 思路是获取cookie中的PHPSESSID这个cookie，只要它的值存在，就说明登录了。
        var sessionId = $.cookie('PHPSESSID')
        if(!sessionId) window.location.href = '/views/index/login.html'
    }

    //功能2：从cookie中读取用户的资料并且展示
    function getInfo (){
        var userInfo = JSON.parse($.cookie('userinfo'))
        //头像
        $('.profile img').attr('src',userInfo.tc_avatar)
        //用户名
        $('.profile h4').text(userInfo.tc_name)
    }

    //功能3：导航菜单交互（展开与收起）
    /**
     * jQuery 动画效果切换：
     *   + fadeToggle([speed,[easing],[fn]]) 淡入淡出效果切换
     *   + slideToggle([speed],[easing],[fn]) 滑动效果切换  
     */
    function navToggle (){
        $('.navs li a').on('click',function(e){
            $(this).next('ul').stop().slideToggle()
        })
    }

    //功能4：退出登录
    function signOut (){
        //获取元素 为元素注册点击事件
        $('.fa-sign-out').closest('li').on('click',clickHandler)
        function clickHandler (){
            var options = {
                url:'/api/logout',
                type:'post',
                success:function(data){
                    if(data.code==200) window.location.href = '/views/index/login.html'
                }
            }
            $.ajax(options)
        }
    }

    //功能5：让页面打开时有进度条
    function globalAjaxEvent (){
        $(document).ajaxStart(function(){
            NProgress.start()
        })
        $(document).ajaxStop(function(){
            NProgress.done()
        })
        $(function(){
            NProgress.done()
        })
    }
})