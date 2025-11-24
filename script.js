// 1. Time Update Logic
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Tokyo' 
    });
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        timeElement.textContent = `${timeString} JST`;
    }
}
// 初回実行とインターバル設定
updateTime();
setInterval(updateTime, 1000);


// 2. Email Copy Logic
// グローバルスコープに関数を公開する必要があるため、windowオブジェクトに紐付けるか、
// もしくはHTML側でイベントリスナーを使用する形が望ましいですが、
// 単純な移行であればこのままでも動作します（ブラウザの仕様による）。
// よりモダンな書き方としては、HTMLのonclick属性ではなく、以下のようにイベントリスナーを追加することを推奨します。

/*
document.addEventListener('DOMContentLoaded', () => {
    const emailButton = document.querySelector('.email-copy-trigger'); // クラスを追加する必要があります
    if(emailButton) {
        emailButton.addEventListener('click', copyEmail);
    }
});
*/

function copyEmail() {
    const emailElement = document.getElementById('email-text');
    if (!emailElement) return;
    
    const email = emailElement.innerText;
    
    // Modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showToast();
        }).catch(err => {
            fallbackCopy(email);
        });
    } else {
        fallbackCopy(email);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
}

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.classList.remove('opacity-0', 'translate-y-10');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10');
    }, 3000);
}

// 3. Subtle Parallax / Cursor Effect (Optional Polish)
const cards = document.querySelectorAll('.bento-card');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach(card => {
        // 必要に応じて視差効果のロジックをここに記述
        // const moveX = (x - 0.5) * 5;
        // const moveY = (y - 0.5) * 5;
        // card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
