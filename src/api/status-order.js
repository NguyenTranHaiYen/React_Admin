import { URL_API } from '../config';

//#region Find all
export async function FindAll(page) {
    try {
        let response = await fetch(URL_API + "TinhTrangDonHang/danhsach", {
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