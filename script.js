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
function copyEmail() {
    const emailElement = document.getElementById('email-text');
    if (!emailElement) return;
    
    const email = emailElement.innerText;
    
    // Modern Clipboard API check
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showToast();
        }).catch(err => {
            // Error handling or fallback
            fallbackCopy(email);
        });
    } else {
        fallbackCopy(email);
    }
}

// Fallback for older browsers or if API fails
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

// Toast Notification
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.classList.remove('opacity-0', 'translate-y-10');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10');
    }, 3000);
}

// 3. Subtle Parallax / Cursor Effect (Optional)
const cards = document.querySelectorAll('.bento-card');

document.addEventListener('mousemove', (e) => {
    // 画面がロードされていなければ何もしないなどのガードを入れる場合もありますが、
    // ここではシンプルに実装します
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach(card => {
        // 必要に応じて視差効果を追加
        // const moveX = (x - 0.5) * 5;
        // const moveY = (y - 0.5) * 5;
        // card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
