/**
 * 要做什么功能？
 * 1.给登陆按钮注册点击事件
 * 2.在点击事件触发时获取用户名和密码的值
 * 3.表单校验判断用户名和密码是否为空 如果为空则不允许发请求
 * 4.使用jquery发ajax请求 把数据发给服务器
 */
define(['jquery','cookie'],function($){
    //1.注册事件
    var $sub = $('#sub')
    $sub.on('click',clickHandler)
    function clickHandler (e){
        e.preventDefault() //禁用默认事件
        //2.获取用户名和密码
        var username = $('#name').val()
        var pass = $('#pass').val()
        //3.表单校验
        if(!username.trim()||!pass.trim()) return
        //4.发送请求
        var options = {
            url:'/api/login',
            type:'post',
            data:{
                tc_name:username,
                tc_pass:pass
            },
            success:function(data){
                if(data.code === 200){
                    //window.alert('登陆成功！')
                    console.log(data)
                    $.cookie('userinfo',JSON.stringify(data.result),{expires:7,path:'/'})
                    window.location.href = '/views/index/dashboard.html'
                }
            }
        }
        $.ajax(options)
    }
})