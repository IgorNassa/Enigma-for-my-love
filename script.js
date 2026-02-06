// script.js - Funcionalidades para todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Configura a barra de progresso baseada na página atual
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const currentPage = window.location.pathname;
        let progressWidth = '25%';
        
        if (currentPage.includes('fase2.html')) {
            progressWidth = '50%';
        } else if (currentPage.includes('fase3.html')) {
            progressWidth = '100%';
        }
        
        progressBar.style.width = progressWidth;
    }
    
    // Efeito de digitação para a nota de amor (apenas na primeira página)
    const loveNote = document.querySelector('.love-note');
    if (loveNote && window.location.pathname.includes('index.html')) {
        const originalText = loveNote.textContent;
        loveNote.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                loveNote.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Inicia a animação após um breve delay
        setTimeout(typeWriter, 1000);
    }
    
    // Efeito de confete no carregamento (todas as páginas)
    setTimeout(() => {
        createHearts(10);
    }, 500);
    
    // Adiciona efeito de clique nos elementos interativos
    document.querySelectorAll('.polaroid, .riddle').forEach(el => {
        el.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Animações especiais para a página final
    if (window.location.pathname.includes('fase3.html')) {
        // Mais confetes para a finalização
        setTimeout(() => {
            createHearts(20);
        }, 1500);
        
        // Efeito especial para a mensagem de surpresa
        const surpriseMessage = document.querySelector('.surprise-message');
        if (surpriseMessage) {
            setTimeout(() => {
                surpriseMessage.style.animation = 'pulse 2s infinite';
            }, 1000);
        }
    }
});

// Função para criar corações flutuantes
function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'fixed';
        heart.style.color = '#FFD1DC'; // Pastel pink
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        
        // Animação do coração
        const duration = Math.random() * 3 + 2;
        const horizontalMovement = Math.random() * 200 - 100;
        
        heart.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0.7 },
            { transform: `translateY(-100vh) translateX(${horizontalMovement}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove o coração após a animação
        setTimeout(() => {
            if (heart.parentNode) {
                document.body.removeChild(heart);
            }
        }, duration * 1000);
    }
}