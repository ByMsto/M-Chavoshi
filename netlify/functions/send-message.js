exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, subject, msg } = JSON.parse(event.body);

    const TOKEN   = '8399501231:AAEyATdkF38T-JJ9fW8PTOydB7A1Ooud_Jw';
    const CHAT_ID = '6012594959';
    const text    = '📩 پەیامی نوێ لە ماڵپەڕ\n\n👤 ناو: ' + name + '\n📧 ئیمەیڵ: ' + email + '\n📌 بابەت: ' + subject + '\n💬 پەیام:\n' + msg;

    const res = await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const data = await res.json();

    return {
        statusCode: data.ok ? 200 : 500,
        body: JSON.stringify({ ok: data.ok })
    };
};
