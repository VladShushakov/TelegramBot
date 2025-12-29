const tg = window.Telegram.WebApp;
tg.ready(); tg.expand();

const searchEl = document.getElementById('search');
const resultsEl = document.getElementById('results');
const playerEl = document.getElementById('player');
const backBtn = document.querySelector('.back-btn');

searchEl.addEventListener('keypress', handleSearch);
searchEl.focus();

const popularVideos = [
    {id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg'},
    {id: 'kJQP7kiw5Fk', title: 'Катенок играет с клубком', thumb: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg'},
    {id: '9bZkp7q19f0', title: 'Doja Cat - Say So (Official Video)', thumb: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg'},
    {id: 'PtAd8_5fRY8', title: 'Morat - No Se Va', thumb: 'https://img.youtube.com/vi/PtAd8_5fRY8/mqdefault.jpg'},
    {id: 'cMwwdCYXpgQ', title: 'BABYMONSTER - SHEESH', thumb: 'https://img.youtube.com/vi/cMwwdCYXpgQ/mqdefault.jpg'},
    {id: 'yub9Q3x0sNc', title: 'Katy Perry - Last Friday Night', thumb: 'https://img.youtube.com/vi/yub9Q3x0sNc/mqdefault.jpg'}
];

function handleSearch(e) {
    if (e.key === 'Enter') {
        const query = searchEl.value.trim().toLowerCase();
        if (!query) {
            showVideos(popularVideos);
            return;
        }

        const filtered = popularVideos.filter(v =>
            v.title.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            showVideos(filtered);
        } else {
            showVideos(popularVideos);
        }

        resultsEl.style.display = 'flex';
        searchEl.blur();
    }
}

function showVideos(videos) {
    resultsEl.innerHTML = '';
    videos.slice(0, 6).forEach((video, index) => {
        const div = document.createElement('div');
        div.className = 'video-card';
        div.style.animationDelay = `${index * 0.1}s`;
        div.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumb}" alt="${video.title}" loading="lazy">
                <div class="play-icon">▶</div>
            </div>
            <div class="video-title">${video.title}</div>
        `;
        div.onclick = () => playVideo(video.id);
        resultsEl.appendChild(div);
    });
}

function playVideo(id) {
    playerEl.src = `https://yewtu.be/embed/${id}?autoplay=1&rel=0`;
    playerEl.style.display = 'block';
    resultsEl.style.display = 'none';
    searchEl.style.display = 'none';
    backBtn.style.display = 'block';
    tg.MainButton.setText('⭐ Поделиться').show().onClick(() => tg.shareUrl(window.location.href));
}

function backToSearch() {
    playerEl.style.display = 'none';
    resultsEl.style.display = 'none';
    searchEl.style.display = 'block';
    searchEl.value = '';
    searchEl.focus();
    backBtn.style.display = 'none';
    tg.MainButton.hide();
}

// Загрузка видео
showVideos(popularVideos);