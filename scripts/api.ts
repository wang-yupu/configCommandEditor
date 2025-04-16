import { myfetch, baseURL } from '~/myfetch';
import type { Ref } from 'vue';

export const syncAndDownload = async (model: Ref, serror: ((msg: String) => void) | null = null, downloading: Ref | null = null, value: Ref | null = null, show: Ref | null = null) => {
    const id = model.value.sessionID;
    console.log(model);
    if (id == undefined) {
        if (serror) serror('会话ID不合法');
        return;
    }
    const [result, status] = await myfetch('GET', baseURL + 'obj/info/' + id);
    if (status == 404) {
        if (serror) serror('会话不存在');
        return;
    }
    console.log(result);
    model.value.name = result.name;
    model.value.author = result.author;
    model.value.server = result.server;
    model.value.createTime = result.createTime;
    model.value.lastEditTime = result.lastEditTime;

    if (downloading) downloading.value = true;

    const [contentResult, contentStatus] = await myfetch('GET', baseURL + 'obj/read/' + id);
    if (contentStatus == 404) {
        if (serror) serror('会话不存在(下载时)');
        return;
    }
    if (value) value.value = contentResult.content;
    if (downloading) downloading.value = false;
    if (show) show.value = false;
};

export const writeContent = async (model: Ref, content: string, serror: ((msg: String) => void) | null = null) => {
    if (model.value.sessionID == undefined || content == undefined) {
        if (serror) serror('ID和内容不能为空');
        return;
    }
    const [result, status] = await myfetch('PUT', baseURL + 'obj/write/' + model.value.sessionID, { content: content });
    if (status == 404) {
        if (serror) serror('会话不存在');
        return;
    }
    return true;
};
