import service from'./request'
import http from'./request'

export function getcatelist(){
    return service({
        method:"post",
        url:"/api/get_cate_list"
    })
}

export function getarticlelist(cate_id,skip=0,limit=10){
    return service({
        method:"post",
        url:"/api/get_article_list",
        data:{ 
                cate_id,skip,limit
        }
    })
}

export function getuserInfo(params){
    return http.post("/user/getuserInfo", params)
}

export function addArtice(params){
    return http.post("/api/add_article", params)
}

export function getQiniuToken(){
    return http.get("/upload/token")
}

export function uploadqiniu(formdata){
    return http.post("https://upload-z1.qiniup.com",formdata )
}