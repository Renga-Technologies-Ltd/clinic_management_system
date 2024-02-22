import ApiService from "./ApiService"

export async function yourApi (data) {
    return ApiService.fetchData({
        url: '/your-api-url',
        method: 'post',
        data
    })
}