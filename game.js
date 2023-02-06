
        // Create canvas
        let canvas = document.getElementById('canvas');

        // Create basket
        let basketX = canvas.width / 2;
        let basketY = canvas.height - 100;
        let basketImage = new Image();
        basketImage.src = 'basket.png';

        // Create fruits
        let fruitX = Math.random() * canvas.width;
        let fruitY = 0;
        let fruit2X = Math.random() * canvas.width;
        let fruit2Y = 0;
        let fruit3X = Math.random() * canvas.width;
        let fruit3Y = 0;

        // Create obstacles
        let obstacleX = Math.random() * canvas.width;
        let obstacleY = 0;
        let obstacle2X = Math.random() * canvas.width;
        let obstacle2Y = 0;
        let obstacle3X = Math.random() * canvas.width;
        let obstacle3Y = 0;

        // Create variables
        let score = 0;
        let isDragging = false;
        let startTime = Date.now();

        // Create event listener
        document.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', moveBasket);

        // Start dragging
        function startDrag(e) {
            isDragging = true;
        }

        // Stop dragging
        function stopDrag(e) {
            isDragging = false;
        }

        // Move basket
        function moveBasket(e) {
            if (isDragging) {
                basketX = e.clientX;
            }
        }

        // Draw on canvas
        function draw() {
            let ctx = canvas.getContext('2d');

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw basket
            ctx.drawImage(basketImage, basketX, basketY, 100, 100);

            // Draw fruits
            ctx.fillStyle = 'red';
            ctx.fillRect(fruitX, fruitY, 30, 30);
            ctx.fillStyle = 'green';
            ctx.fillRect(fruit2X, fruit2Y, 30, 30);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(fruit3X, fruit3Y, 30, 30);

            // Draw obstacles
            let obstacleImage = new Image();
            obstacleImage.src = 'obstacle.png';
            ctx.drawImage(obstacleImage, obstacleX, obstacleY, 30, 30);
            ctx.drawImage(obstacleImage, obstacle2X, obstacle2Y, 30, 30);
            ctx.drawImage(obstacleImage, obstacle3X, obstacle3Y, 30, 30);

            // Move fruits
            let speed = 4 + (score * 0.05);
            let speed2 = 5 + (score * 0.05);
            let speed3 = 4 + (score * 0.05);
            fruitY += speed;
            fruit2Y += speed2;
            fruit3Y += speed3;

            // Move obstacles
            obstacleY += 2.5 + (score * 0.05);
            obstacle2Y += 3 + (score * 0.05);
            obstacle3Y += 3.5 + (score * 0.07);

            // Check if fruit is caught
            if (fruitX > basketX && fruitX < basketX + 50 && fruitY > basketY && fruitY < basketY + 50) {
                score += 2;
                fruitX = Math.random() * canvas.width;
                fruitY = 0;
            }
            if (fruit2X > basketX && fruit2X < basketX + 50 && fruit2Y > basketY && fruit2Y < basketY + 50) {
                score += 4;
                fruit2X = Math.random() * canvas.width;
                fruit2Y = 0;
            }
            if (fruit3X > basketX && fruit3X < basketX + 50 && fruit3Y > basketY && fruit3Y < basketY + 50) {
                score += 6;
                fruit3X = Math.random() * canvas.width;
                fruit3Y = 0;
            }

            // Check if obstacle is caught
            if (obstacleX > basketX && obstacleX < basketX + 30 && obstacleY > basketY && obstacleY < basketY + 50) {
                score--;
                obstacleX = Math.random() * canvas.width;
                obstacleY = 0;
            }
            if (obstacle2X > basketX && obstacle2X < basketX + 30 && obstacle2Y > basketY && obstacle2Y < basketY + 50) {
                score-=2;
                obstacle2X = Math.random() * canvas.width;
                obstacle2Y = 0;
            }
            if (obstacle3X > basketX && obstacle3X < basketX + 30 && obstacle3Y > basketY && obstacle3Y < basketY + 50) {
                score-=3;
                obstacle3X = Math.random() * canvas.width;
                obstacle3Y = 0;
            }

            // Check if fruit is out of bounds
            if (fruitY > canvas.height) {
                fruitX = Math.random() * canvas.width;
                fruitY = 0;
            }
            if (fruit2Y > canvas.height) {
                fruit2X = Math.random() * canvas.width;
                fruit2Y = 0;
            }
            if (fruit3Y > canvas.height) {
                fruit3X = Math.random() * canvas.width;
                fruit3Y = 0;
            }

            // Check if obstacle is out of bounds
            if (obstacleY > canvas.height) {
                obstacleX = Math.random() * canvas.width;
                obstacleY = 0;
            }
            if (obstacle2Y > canvas.height) {
                obstacle2X = Math.random() * canvas.width;
                obstacle2Y = 0;
            }
            if (obstacle3Y > canvas.height) {
                obstacle3X = Math.random() * canvas.width;
                obstacle3Y = 0;
            }

            // Check if time is 10 sec
            let currentTime = Date.now();
            let elapsedTime = currentTime - startTime;
            if (elapsedTime >= 50000) {
                let popup = document.createElement('div');
                popup.style.position = 'absolute';
                popup.style.left = 0;
                popup.style.right = 0;
                popup.style.top = 0;
                popup.style.bottom = 0;
                popup.style.background = 'rgba(0,0,0,0.7)';
                popup.style.display = 'flex';
                popup.style.justifyContent = 'center';
                popup.style.alignItems = 'center';
                popup.innerHTML = `
                    <div style="width: 500px; height: 300px; background: white; padding: 30px; text-align: center; font-family: sans-serif; box-shadow: 0px 0px 10px #444;">
                        <h2>Bruhh time over!!</h2>
                        <p>Your score is ${score}.</p>
                        <button>Close</button>
                    </div>
                `;
                document.body.appendChild(popup);
                let closeBtn = popup.querySelector('button');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(popup);
                });
                return;
            }

            // Draw score
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 20);
            // Call draw function
            requestAnimationFrame(draw);
        }
        // Call draw function
        draw();