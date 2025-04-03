//Script này giúp đọc, ghi, và cập nhật một file cấu hình JSON (config.json) bằng cách sử dụng Node.js.
import {promises as fs} from 'fs' //Sử dụng fs.promises để làm việc với file bất đồng bộ (async/await).

var config:any; //lưu trữ dữ liệu từ file config.json.

//Đọc file config.json, chuyển nội dung thành object và lưu vào biến config.
//Hàm này phải được gọi đầu tiên để load config vào bộ nhớ.
export async function initConfig() {

    console.log('init');

    config = JSON.parse((await fs.readFile('./config.json')).toString());

    return config;
}

export function getConfig() {

    return config;
}

//Cập nhật giá trị config.
export function setConfig(path: string, val: string) {

    console.log(config);

    const splitPath = path.split('.').reverse() //Tách path thành mảng.

    var ref = config;

    while (splitPath.length > 1) {

        let key = splitPath.pop(); //Lặp qua các cấp con trong object config để tìm key cần sửa.

        if (key) {

            if (!ref[key]) //Nếu key chưa tồn tại, tự động tạo object rỗng {}.
                ref[key] = {};

            ref = ref[key]; 
        } else {

            return;
        }
    }

    //Cập nhật giá trị cuối cùng.
    let key = splitPath.pop();

    if (key)
        ref[key] = val
}

//Ghi nội dung config hiện tại vào file config.json.
//Dùng JSON.stringify(config, null, 2) để định dạng file JSON dễ đọc.
export async function updateConfig() {

    console.log("write: ", JSON.stringify(config));

    return fs.writeFile('./config.json', JSON.stringify(config, null, 2));
}