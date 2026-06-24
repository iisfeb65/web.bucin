document
.getElementById("enterBtn")
.addEventListener("click",()=>{

document.querySelector("#opening")
.style.display="none";

window.scrollTo({
top:0,
behavior:"smooth"
});

});

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document
.querySelectorAll(".event")
.forEach(el=>observer.observe(el));

document
.querySelectorAll(".grid img")
.forEach((img,index)=>{

setTimeout(()=>{

observer.observe(img);

},index*800);

});

const loveBtn = document.getElementById("interactive-love");

loveBtn.addEventListener("click", (e) => {
  // Mendapatkan posisi eksak tombol untuk titik pusat ledakan
  const rect = loveBtn.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  // Menghasilkan 35 partikel sekaligus untuk efek "WAH"
  const particleCount = 35; 
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(startX, startY);
  }
});

function createParticle(x, y) {
  const el = document.createElement("div");
  // Variasi partikel agar tidak monoton
  const emojis = ["❤️", "💖", "✨", "💕", "🤍"];
  el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  el.classList.add("particle-heart");
  document.body.appendChild(el);

  // --- PARAMETER FISIKA ---
  const angle = Math.random() * Math.PI * 2; // Menyebar ke segala arah
  const velocity = 8 + Math.random() * 15; // Kecepatan ledakan awal
  let vx = Math.cos(angle) * velocity;
  let vy = Math.sin(angle) * velocity - 10; // Dorongan ekstra ke atas
  
  const gravity = 0.6; // Tarikan ke bawah
  const friction = 0.92; // Pelambatan horizontal

  let currentX = 0;
  let currentY = 0;
  let opacity = 1;
  let scale = 0.5 + Math.random() * 1.2;
  let rotation = Math.random() * 360;
  const rotationSpeed = (Math.random() - 0.5) * 25; // Kecepatan putar

  // Posisi awal elemen (harus digeser agar titik tengahnya pas di kursor)
  el.style.left = `${x - 15}px`;
  el.style.top = `${y - 15}px`;

  // --- LOOP ANIMASI ---
  function animate() {
    // Terapkan fisika
    vy += gravity; // Gravitasi menarik ke bawah
    vx *= friction; // Udara memperlambat gerakan horizontal
    vy *= friction;

    currentX += vx;
    currentY += vy;
    opacity -= 0.015; // Menghilang perlahan
    rotation += rotationSpeed;

    // Render ke layar menggunakan hardware acceleration (translate3d)
    el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
    el.style.opacity = opacity;

    if (opacity > 0) {
      // Panggil frame berikutnya jika belum transparan sepenuhnya
      requestAnimationFrame(animate);
    } else {
      // Hapus dari DOM untuk mencegah memory leak yang fatal
      el.remove();
    }
  }
  
  requestAnimationFrame(animate);
}