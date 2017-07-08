require.config({
    //这里没有以.开头 所以不是相对于谁是绝对路径
    baseUrl:'/node_modules',
    paths:{
        //当设置了baseUrl属性后，这里的相对路径就是相对于baseUrl的路径之下
        //如果没有设置baseUrl属性，这里的相对路径就是相对于当前文件所在路径
        jquery:'./jquery/dist/jquery'
    }
})
