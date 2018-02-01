
// 和background脚本之间注册一个channel
const channel = chrome.runtime.connect({
    name: 'EXAMPLE_CHANNEL'
});

// 监听channel消息
channel.onMessage.addListener(result => {
    const { isSuccess, data, mssage } = result;
    if (!isSuccess) {
        document.querySelector('#error').innerHTML += mesage;
        return;
    }

    const { method, queryString, url, response } = data;
    document.querySelector('#result').innerHTML += url + '<br/>';
});
