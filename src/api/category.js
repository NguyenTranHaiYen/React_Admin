import { URL_API } from '../config';

//#region Find all
export async function FindAll() {
    try {
        let response = await fetch(URL_API + "DanhMucSanPham/danhSach", {
            method: "get",
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log(response);
    } catch (error) {
        console.log(error);
        return null;
    }
}
//#endregion

//#region Insert
export async function Insert(category) {
    try {
        let response = await fetch(URL_API + "DanhMucSanPham/them", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('category.js -  func Insert - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region Upload
export async function Update(category) {
    try {
        let response = await fetch(URL_API + "DanhMucSanPham/sua", {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('category.js -  func Update - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
//#endregion

//#region Delete
export async function Delete(categoryId) {
    try {
        var url = new URL(URL_API + "DanhMucSanPham/xoa")
        var params = { id: categoryId }
        url.search = new URLSearchParams(params)
        let response = await fetch(url, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status == 200) {
            return await response.json();
        }
        console.log('category.js -  func Delete - response code ' + response.status);
    } catch (error) {
        console.error(error);
        return null;
    }
}

//#endregion

//#region GetById
export async function GetById(id) {
    try {
        let response = await fetch(URL_API + "DanhMucSanPham/layMot/" + id, {
            method: "get",
        })
        console.log(response);
        
        if (response.status == 200) {
            return await response.json();
        }
        console.log('category.js -  func GetById - response code ' + response.status);
        return null;
    } catch (error) {
        console.error(error);
        return "";
    }
}
//#endregion