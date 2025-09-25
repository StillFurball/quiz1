const BASE_PATH = '/quiz1'; 

const pages = {
    '/': {
        title: 'Homepage',
        content: `
            <h1>WELCOME TO MY WEBSITE</h1>
            <p>This is the first page of the website. Feel free to explore the menu above to learn more about me and my hometown.</p>
        `
    },
    '/profile': {
        title: 'Profile',
        content: `
            <h1>About Me</h1>
            <img src="https://media.licdn.com/dms/image/v2/D4E03AQHuf1EXCQEvsw/profile-displayphoto-scale_400_400/B4EZh5lpIBGYAo-/0/1754386569180?e=1761782400&v=beta&t=eVbWgGotJE6tPapOIgeNwm0TBT1J-Q4COY3N43bT5Dg" alt="Picture of me" 
             style="width:250px; height:250px; object-fit:cover; border-radius:60%; display:block; margin:0 auto;">
            <p><strong>Name:</strong> Rafi Attar Maulana</p>
            <p><strong>Hobby:</strong> Gaming</p> 
            <p><strong>Height:</strong> 1.7 m</p>
            <p><strong>Institution:</strong> Institut Teknologi Sepuluh Nopember</p>
            <p>
                <a href="https://www.linkedin.com/in/rafi-attar-maulana-002b98324/" 
                target="_blank" 
                style="color:#0a66c2; text-decoration:none; font-weight:bold;">
                LinkedIn
                </a>
            </p>
        `
    },
    '/hometown': {
        title: 'Hometown',
        content: `
            <h1>Hometown</h1>
            <img src="https://www.goersapp.com/blog/wp-content/uploads/2024/12/15-Rekomendasi-Wisata-Surabaya-yang-Murah-Tapi-Keren-2024.webp" 
             alt="Surabaya" 
             style="width:80%; max-width:600px; display:block; margin:0 auto; border-radius:12px;">
            <p>
                Surabaya is the capital of East Java and the second-largest city in Indonesia after Jakarta. 
                Located on the northeast coast of Java by the Madura Strait, it is one of Southeast Asia's 
                oldest port cities. With over 3 million residents (2024) and more than 10 million in its 
                metropolitan area, Surabaya is Indonesia's second-largest metropolitan region and the 
                sixth-largest economy in ASEAN.
            </p>
        `
    },
    '/food': {
        title: 'Foods',
        content: `
            <h1>Local Foods</h1>

            <h2>Rawon</h2>
            <img src="https://delishglobe.com/wp-content/uploads/2025/07/Rawon-Black-Beef-Soup-2048x1499.png" 
                alt="Rawon" 
                style="width:80%; max-width:500px; display:block; margin:10px auto; border-radius:12px;">
            <p>
                Rawon is a traditional black beef soup from Surabaya, famous for its rich flavor 
                from <i>keluwak</i> (black nuts) which gives it a dark color and unique taste.
            </p>

            <h2>Nasi Goreng</h2>
            <img src="https://beritajatim.com/cdn-cgi/image/quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2024/02/Screenshot_20240202_132422_Instagram-1.jpg" 
                alt="Nasi Goreng" 
                style="width:80%; max-width:500px; display:block; margin:10px auto; border-radius:12px;">
            <p>
                Nasi Goreng (fried rice) is one of Indonesia's most popular dishes. 
                In Surabaya, it often comes with a savory, slightly spicy flavor 
                and is served with fried egg, chicken, or satay.
            </p>

            <h2>Lontong Balap</h2>
            <img src="https://lifestyle.haluan.co/wp-content/uploads/2025/02/Lontong-Balap.webp" 
                alt="Lontong Balap" 
                style="width:80%; max-width:500px; display:block; margin:10px auto; border-radius:12px;">
            <p>
                Lontong Balap is a Surabaya specialty made with rice cakes, bean sprouts, fried tofu, 
                and savory broth. It is usually served with fried lentho (spiced mung bean cake).
            </p>
        `
    },
    '/tourist': {
        title: 'Tourist Guide',
        content: `
            <h1>Guide</h1>
            <h2>Jalan Tunjungan</h2>
            <img src="https://sewabussurabaya.com/wp-content/uploads/2019/08/Jalan-Tunjungan-Surabaya.jpg" 
                alt="Jalan Tunjungan Surabaya" 
                style="width:80%; max-width:600px; display:block; margin:10px auto; border-radius:12px;">
            <p>
                Jalan Tunjungan is one of the most iconic landmarks in Surabaya, 
                often referred to as the heart of the city. This historic street 
                gained its fame during the colonial era and has long been a symbol 
                of Surabaya's growth and modernity. 
            </p>
            <p>
                Today, Jalan Tunjungan is a lively hub filled with shopping centers, 
                luxury hotels, restaurants, and cultural landmarks. One of its most 
                famous buildings is the historic Hotel Majapahit, which played a key 
                role in Indonesia's independence history during the “Battle of Surabaya.” 
            </p>
            <p>
                At night, the street comes alive with colorful lights and a bustling 
                atmosphere, making it a perfect spot for both sightseeing and enjoying 
                local culinary experiences. For visitors, walking down Jalan Tunjungan 
                is like experiencing the blend of Surabaya's past and present in one place.
            </p>
        `
    }
};

const mainContent = document.getElementById('content');

function renderPage(path) {
    let normalizedPath = path;

    if (normalizedPath.startsWith(BASE_PATH)) {
        normalizedPath = normalizedPath.substring(BASE_PATH.length);
    }

    if (normalizedPath === '' || normalizedPath === '/index.html') {
        normalizedPath = '/';
    }
    
    if (normalizedPath !== '/' && !normalizedPath.startsWith('/')) {
        normalizedPath = '/' + normalizedPath;
    }


    const page = pages[normalizedPath];
    
    if (page) {
        document.title = page.title;
        mainContent.innerHTML = page.content;
    } else {
        document.title = '404 Not Found';
        mainContent.innerHTML = `
            <h1>404 Not Found</h1>
            <p>Halaman yang Anda minta tidak ditemukan. Path: ${path}</p>
        `;
    }
}

function handleNavigation(event) {
    event.preventDefault(); 
    const targetRoute = event.target.getAttribute('data-route');
    if (targetRoute) {
        const fullPath = BASE_PATH + targetRoute;
        history.pushState({}, '', fullPath);
        renderPage(fullPath); 
    }
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', handleNavigation);
});

window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
});

renderPage(window.location.pathname);