import { URL_API } from '../config';

//#region Find all
export async function FindAll(page) {
    try {
        var url = new URL(URL_API + "DonDatHang/danhsach")

        var params = {
            size: 10,
            page: page
        }
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
        console.log('order.js -  func FindAll - response code ' + response.status);
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
        var url = new URL(URL_API + "DonDatHang/hoaDon")

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
        console.log('order.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion



//#region GetById
export async function ChangeStatus(id, status) {
    try {
        var url = new URL(URL_API + "DonDatHang/chuyentrangthai")

        var params = { idDonHang: id, idTinhTrang: status }
        url.search = new URLSearchParams(params)
        let response = await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('order.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return "";
    }
}
//#endregion
