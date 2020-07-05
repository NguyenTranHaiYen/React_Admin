import { URL_API } from '../config';

//#region Find all
export async function FindAll() {
    try {
        let response = await fetch(URL_API + "DanhSachKhuyenMai/getListKhuyenMai", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('promotion.js -  func FindAll - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region Insert
export async function Insert(promotion) {
    try {
        let response = await fetch(URL_API + "DanhSachKhuyenMai/them", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(promotion)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('promotion.js -  func Insert - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return "";
    }
}
//#endregion

//#region Update
export async function Update(promotion) {
    try {
        let response = await fetch(URL_API + "DanhSachKhuyenMai/updateKhuyenMai", {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(promotion)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('promotion.js -  func Update - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region Delete
export async function Delete(promotionId) {
    try {
        let response = await fetch(URL_API + "DanhSachKhuyenMai/deleteKhuyenMai/" + promotionId, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('promotion.js -  func Delete - response code ' + response.status);
        return null;
    } catch (error) {
        console.log(error);
        return "";
    }
}
//#endregion

//#region GetById
export async function GetById(id) {
    try {
        var url = new URL(URL_API + "DanhSachKhuyenMai/getMotKhuyenMai")

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
        console.log('promotion.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion
