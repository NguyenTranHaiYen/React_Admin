import { URL_API } from '../config';
//#region Insert
export async function Insert(product) {
    try {
        let response = await fetch(URL_API + "SanPham/insert", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('product.js -  func Insert - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region Delete
export async function Delete(productId) {
    try {
        var url = new URL(URL_API + "SanPham/getMotSanPham")

        var params = { id: productId }
        url.search = new URLSearchParams(params)
        let response = await fetch(url, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        console.log('product.js -  func Delete - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region GetById
export async function GetByProduct(id) {
    try {
        var url = new URL(URL_API + "SanPham/getMotSanPham")

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
        console.log('product.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion