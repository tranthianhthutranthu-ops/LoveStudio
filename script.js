// =====================================
// LOVE STUDIO
// =====================================


// Kiểm tra đang ở trang nào
const isLovePage =
    document.body.classList.contains("love-page");


// =====================================
// TRANG TẠO LOVE PAGE
// =====================================

if (!isLovePage) {

    const btn =
        document.getElementById("loveBtn");


    if (btn) {

        btn.addEventListener("click", () => {

            const inputs =
                document.querySelectorAll("input");

            const textarea =
                document.querySelector("textarea");


            const myName =
                inputs[0].value.trim();

            const loverName =
                inputs[1].value.trim();

            const message =
                textarea.value.trim();


            if (!myName || !loverName || !message) {

                alert(
                    "Hãy nhập đầy đủ thông tin nhé ❤️"
                );

                return;

            }


            // Lưu thông tin
            const data =
    new URLSearchParams();

data.set("from", myName);

data.set("to", loverName);

data.set("message", message);
localStorage.setItem(
    "lovePageLink",
    window.location.origin +
    window.location.pathname.replace("index.html", "") +
    "love.html?" +
    data.toString()
);

window.location.href =
    "love.html?" + data.toString();

        });

    }

}


// =====================================
// TRANG TỎ TÌNH
// =====================================

if (isLovePage) {


    const params =
    new URLSearchParams(
        window.location.search
    );


const myName =
    params.get("from") || "Anh";


const loverName =
    params.get("to") || "Em";


const message =
    params.get("message") ||
    "Mình có một điều muốn nói với bạn...";


    const title =
    document.getElementById("loveTitle");

const storyText =
    document.getElementById("storyText");

const story =
    document.getElementById("story");


// Ban đầu chưa hiện câu chuyện

story.style.display = "none";


// ==============================
// CÁC CÂU TỎ TÌNH
// ==============================

const loveStory = [

    `${loverName} à...`,

    "Có một điều mình đã muốn nói với bạn từ rất lâu...",

    "Mình không biết bắt đầu từ lúc nào...",

    "Chỉ biết rằng từ khi bạn xuất hiện...",

    "Những ngày bình thường của mình trở nên đặc biệt hơn.",

    "Mỗi lần nhìn thấy bạn,", 

    "mình lại vô thức mỉm cười.",

    "Và hôm nay...",

    "mình muốn nói điều này thật rõ ràng.",

    "Mình thích bạn. ❤️"

];


// ==============================
// HIỆN TỪNG CÂU
// ==============================

function showStory() {

    story.style.display = "flex";

    let index = 0;


    function nextLine() {

        if (index >= loveStory.length) {

            showButtons();

            return;

        }


        storyText.style.opacity = "0";


        setTimeout(() => {

            storyText.innerHTML =
                loveStory[index];

            storyText.style.opacity = "1";

            index++;

        }, 500);


        setTimeout(
            nextLine,
            2800
        );

    }


    nextLine();

}


// ==============================
// HIỆN NÚT
// ==============================

function showButtons() {

    document.getElementById(
        "yesButton"
    ).style.display = "inline-block";


    document.getElementById(
        "thinkButton"
    ).style.display = "inline-block";

}


// Ban đầu ẩn nút

document.getElementById(
    "yesButton"
).style.display = "none";


document.getElementById(
    "thinkButton"
).style.display = "none";


    // =================================
    // NÚT MỞ LỜI NHẮN
    // =================================

    const openButton =
        document.getElementById("openLetter");


    if (openButton) {

        

                openButton.addEventListener(
    "click",
    () => {

        openButton.style.display =
            "none";

        // Bắt đầu pháo hoa
        startFireworks();


        // Chờ pháo hoa rồi bắt đầu câu chuyện
        setTimeout(() => {

            showStory();

        }, 4500);

    }
);    document.getElementById(
    "yesButton"
).addEventListener(
    "click",
    () => {

        // Ẩn câu chuyện

        story.style.display = "none";


        // Hiện màn hình đặc biệt

        const celebration =
            document.getElementById(
                "celebration"
            );

        celebration.style.display =
            "flex";


        // Điền tên

        document.getElementById(
            "finalMyName"
        ).textContent = myName;


        document.getElementById(
            "finalLoverName"
        ).textContent = loverName;


        // Tạo tim bay

        createFinalHearts();


        // Pháo hoa mạnh hơn

        createCelebrationFireworks();

    }
);
function createFinalHearts() {

    for (let i = 0; i < 80; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "final-heart";

            heart.innerHTML =
                ["❤️", "💕", "💗", "💖", "💘"]
                [
                    Math.floor(
                        Math.random() * 5
                    )
                ];


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.fontSize =
                (18 + Math.random() * 35)
                + "px";


            heart.style.animationDuration =
                (3 + Math.random() * 4)
                + "s";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 8000);


        }, i * 80);

    }

}  function createCelebrationFireworks() {

    // Tạo hiệu ứng click liên tục
    // trên canvas hiện tại

    const canvas =
        document.getElementById(
            "fireworks"
        );

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    function heartBurst(x, y) {

        const particles = [];


        // Hình trái tim
        for (
            let t = 0;
            t < Math.PI * 2;
            t += 0.08
        ) {

            const heartX =
                16 *
                Math.pow(
                    Math.sin(t),
                    3
                );


            const heartY =
                -(
                    13 *
                    Math.cos(t)
                    -
                    5 *
                    Math.cos(2 * t)
                    -
                    2 *
                    Math.cos(3 * t)
                    -
                    Math.cos(4 * t)
                );


            const scale =
                2 + Math.random() * 0.5;


            particles.push({

                x: x,

                y: y,

                tx:
                    heartX * scale,

                ty:
                    heartY * scale,

                life: 100,

                color:
                    `hsl(${Math.random() * 360},100%,65%)`

            });

        }


        function drawHeart() {

            particles.forEach(
                (p, index) => {

                    p.life--;


                    const progress =
                        1 -
                        p.life / 100;


                    const px =
                        p.x +
                        p.tx * progress;


                    const py =
                        p.y +
                        p.ty * progress;


                    ctx.globalAlpha =
                        p.life / 100;


                    ctx.beginPath();


                    ctx.arc(
                        px,
                        py,
                        2.5,
                        0,
                        Math.PI * 2
                    );


                    ctx.fillStyle =
                        p.color;


                    ctx.fill();


                    ctx.globalAlpha = 1;


                    if (p.life <= 0) {

                        particles.splice(
                            index,
                            1
                        );

                    }

                }
            );


            if (particles.length > 0) {

                requestAnimationFrame(
                    drawHeart
                );

            }

        }


        drawHeart();

    }


    // Tạo nhiều trái tim pháo hoa

    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            heartBurst(

                canvas.width *
                (0.2 +
                Math.random() * 0.6),

                canvas.height *
                (0.15 +
                Math.random() * 0.4)

            );

        }, i * 500);

    }

}
        storyText.innerHTML =
            "Cảm ơn bạn đã cho mình một cơ hội. ❤️";

        document.getElementById(
            "yesButton"
        ).style.display = "none";

        document.getElementById(
            "thinkButton"
        ).style.display = "none";


        // Pháo hoa lần cuối

        for (let i = 0; i < 8; i++) {

            setTimeout(
                launchRocket,
                i * 300
            );

        }

    }
  document.getElementById(
    "thinkButton"
).addEventListener(
    "click",
    () => {

        storyText.innerHTML =
            "Không sao cả. ❤️ Mình sẽ chờ câu trả lời của bạn.";

        document.getElementById(
            "yesButton"
        ).style.display = "none";

        document.getElementById(
            "thinkButton"
        ).style.display = "none";

    }
);

    }

   // ========================================
// BÀI 9 - PHÁO HOA KHI MỞ LỜI NHẮN
// ========================================

function startFireworks() {

    const canvas = document.getElementById("fireworks");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let rockets = [];
    let particles = [];

    // ==============================
    // PHÁO BAY LÊN
    // ==============================

    function launchRocket() {

        rockets.push({

            x: Math.random() * canvas.width,

            y: canvas.height + 20,

            vx: (Math.random() - 0.5) * 2,

            vy: -(8 + Math.random() * 3),

            target:
                canvas.height *
                (0.18 + Math.random() * 0.3)

        });

    }


    // ==============================
    // TẠO VỤ NỔ
    // ==============================

    function explode(x, y) {

        const color =
            `hsl(${Math.random() * 360},100%,65%)`;

        const count = 120;

        for (let i = 0; i < count; i++) {

            const angle =
                Math.PI * 2 * i / count;

            const speed =
                2 + Math.random() * 5;

            particles.push({

                x: x,

                y: y,

                vx:
                    Math.cos(angle) * speed,

                vy:
                    Math.sin(angle) * speed,

                life:
                    80 + Math.random() * 50,

                size:
                    1.5 + Math.random() * 2,

                color:
                    color

            });

        }


        // Nổ tầng thứ hai

        setTimeout(() => {

            for (let i = 0; i < 60; i++) {

                const angle =
                    Math.PI * 2 * i / 60;

                const speed =
                    1.5 + Math.random() * 3;

                particles.push({

                    x: x,

                    y: y,

                    vx:
                        Math.cos(angle) * speed,

                    vy:
                        Math.sin(angle) * speed,

                    life:
                        60 + Math.random() * 40,

                    size:
                        1 + Math.random() * 2,

                    color:
                        `hsl(${Math.random() * 360},100%,75%)`

                });

            }

        }, 180);

    }


    // ==============================
    // ANIMATION
    // ==============================

    function animate() {

        ctx.fillStyle =
            "rgba(2,4,13,0.18)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // PHÁO BAY

        rockets.forEach((rocket, index) => {

            rocket.x += rocket.vx;

            rocket.y += rocket.vy;

            rocket.vy += 0.05;


            // Vẽ đuôi pháo

            ctx.beginPath();

            ctx.arc(
                rocket.x,
                rocket.y,
                3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "white";

            ctx.fill();


            // Nổ

            if (rocket.y <= rocket.target) {

                explode(
                    rocket.x,
                    rocket.y
                );

                rockets.splice(index, 1);

            }

        });


        // HẠT PHÁO

        particles.forEach((p, index) => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += 0.035;

            p.vx *= 0.985;

            p.vy *= 0.985;

            p.life--;


            const alpha =
                Math.max(
                    p.life / 120,
                    0
                );


            ctx.globalAlpha = alpha;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                p.color;

            ctx.fill();

            ctx.globalAlpha = 1;


            if (p.life <= 0) {

                particles.splice(index, 1);

            }

        });


        requestAnimationFrame(animate);

    }


    // ==============================
    // BẮT ĐẦU
    // ==============================

    animate();


    // Bắn nhiều quả pháo đầu tiên

    launchRocket();

    setTimeout(launchRocket, 400);

    setTimeout(launchRocket, 800);

    setTimeout(launchRocket, 1200);

    setTimeout(launchRocket, 1700);

    setTimeout(launchRocket, 2200);


    // Sau đó tiếp tục

    const fireworkInterval =
        setInterval(
            launchRocket,
            1800
        );

}   function shareLovePage() {
    const url = "https://tranthianhthutranthu-ops.github.io/LoveStudio/love.html?from=thu&to=ngoc&message=yeu";

    navigator.clipboard.writeText(url)
        .then(function () {
            alert("❤️ Đã sao chép link Love Page!\n\nHãy gửi link này cho Ngọc 💌");
        })
        .catch(function () {
            prompt("❤️ Hãy sao chép link này:", url);
        });
}  document.getElementById("shareButton").addEventListener("click", shareLovePage);

        


function showLinkBox(url) {

    window.prompt(
        "❤️ Hãy sao chép link Love Page này:",
        url
    );

}