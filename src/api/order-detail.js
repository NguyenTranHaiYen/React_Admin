import { URL_API } from '../config';

//#region GetById
export async function GetByOrder(id) {
    try {
        var url = new URL(URL_API + "ChiTietDonHang/getListMotDon")
        var params = { id: id }
        url.search = new URLSearchParams(params)
        let response = await fetch(url, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('order-detail.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion
