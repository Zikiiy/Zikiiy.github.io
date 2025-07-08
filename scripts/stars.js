class Star {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 4 + 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.lifespan = 0;
        this.maxLifespan = 1 * 600 + 100;
    }

    update() {
        this.lifespan++;
        this.rotation += 0.01;
        this.x += Math.sin(this.lifespan * 0.05) * 0.05;
        this.y += Math.cos(this.lifespan * 0.05) * 0.05;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        let opacity;
        if (this.lifespan < 200) {
            opacity = this.lifespan / 200;
        } else if (this.lifespan > this.maxLifespan - 400) {
            opacity = (this.maxLifespan - this.lifespan) / 200;
        } else {
            opacity = 1;
        }

        ctx.beginPath();

        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((i * 4 * Math.PI) / 5) * this.size,
                Math.sin((i * 4 * Math.PI) / 5) * this.size
            );
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.lifespan >= this.maxLifespan;
    }
}

function spawnStars(element, max = 200, spawnRate = 0.1) {
    const canvas = document.getElementById(element);
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars = stars.filter(star => {
            star.update();
            star.draw(ctx);
            return !star.isDead();
        });

        if (Math.random() < spawnRate && stars.length < max) stars.push(new Star(canvas.width, canvas.height));
        requestAnimationFrame(animate);
    }

    animate();
}