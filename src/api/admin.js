import { URL_API } from '../config';


//#region Login
export async function Login(username, password) {
    try {
        let response = await fetch(URL_API + "Admin/DangNhap", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // {} to JSON
            body: JSON.stringify({
                user: username,
                pass: password
            })
        })
        console.log(response);
        if (response.status == 200) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
