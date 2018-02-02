// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- ajax

const sendAjax = {
    post: async ({ data, url }) => {
        const xhr = new XMLHttpRequest;
        xhr.responseType = 'json';
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        const response = await new Promise((res, rej) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(xhr.response);
                    return;
                }
            };
        });

        return response;
    },
    get: async ({ data, url }) => {
        const queryString = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');

        const xhr = new XMLHttpRequest;
        xhr.responseType = 'json';
        xhr.open('GET', `${url}?${queryString}`);
        xhr.send(null);

        const response = await new Promise((res, rej) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(xhr.response);
                    return;
                }
            };
        });

        return response;
    }
};

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- channel

// 与当前页面的DevTool Page之间建立一个channel
const channel = chrome.runtime.connect(null, {
    name: chrome.devtools.inspectedWindow.tabId.toString(),
});

// 监听channel消息
channel.onMessage.addListener(result => {
    const { isSuccess, data, mssage } = result;
    if (!isSuccess) {
        document.querySelector('#error').innerHTML += mesage;
        return;
    }

    const { method, queryString, url, response } = data;
    document.querySelector('#result').innerHTML += url + '<br>';
});

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// ---- ---- ---- ---- Panel页面中的事件

// 点击按钮，模拟发起ajax请求
document.querySelector('#button1').addEventListener('click', async () => {
    const urls = document.querySelector('#result').innerHTML.split('<br>');
    alert(JSON.stringify(urls, null, 4));

    // todo: 这里可以用sendAjax.get或者sendAjax.post发起ajax请求
    // 从而将以上保存的http url存到服务器端
});

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
