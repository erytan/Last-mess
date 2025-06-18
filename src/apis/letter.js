import axios from "../axios";

export const apiGetLetter = (data) =>
    axios({
        url: "letter/",
        method: "get",
        data, // Sử dụng params cho GET thay vì data để đúng chuẩn
    });

export const apiCreateLetter = (data) =>
    axios({
        url: "letter/create",
        method: "post",
        data,
    });

export const apiUpdateLetter = (data, sid) =>
    axios({
        url: `letter/${sid}`,
        method: "put",
        data,
    });

export const apiDeleteLetter = (sid) =>
    axios({
        url: `letter/${sid}`,
        method: "delete",
    });