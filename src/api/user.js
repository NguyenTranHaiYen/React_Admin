import { URL_API } from '../config';

//#region Find all
export async function FindAll() {
    try {
        let response = await fetch(URL_API + "KhachHang/danhSach", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('user.js -  func FindAll - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion


//#region GetById
export async function GetById(id) {
    try {
        var url = new URL(URL_API + "KhachHang/getMot")

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
        console.log('user.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion
