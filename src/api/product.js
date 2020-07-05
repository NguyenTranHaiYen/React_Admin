import { URL_API } from '../config';

//#region Find all
export async function FindAll(page) {
    try {
        var url = new URL(URL_API + "SanPham/DanhSach")
        var params = {
            page: page,
            size: 10
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
        console.log(response);
        console.log('product.js -  func FindAll - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

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

//#region 
export async function Update(product) {
    try {
        let response = await fetch(URL_API + "SanPham/update", {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('product.js -  func Update - response code ' + response.status);
        return null;
    } catch{
        return "";
    }
}
//#endregion

//#region Delete
export async function Delete(productId) {
    try {
        let response = await fetch(URL_API + "SanPham/delete/" + productId, {
            method: "delete",
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
export async function GetById(id) {
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

//#region GetByCategory
export async function GetByCategory(categoryId) {
    try {
        var url = new URL(URL_API + "SanPham/getTheoDanhMuc")

        var params = { id: categoryId }
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
        console.log('product.js -  func GetByCategory - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion