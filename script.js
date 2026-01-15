document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio carregado!');
    
    // Atualiza ano no rodapé
    document.getElementById('ano-atual').textContent = new Date().getFullYear();
    
    // Menu mobile
    const menuBtn = document.querySelector('.cabecalho__botao-menu');
    const menu = document.querySelector('.cabecalho__menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('ativo');
        });
    }
    
    // Filtro de projetos
    const filtros = document.querySelectorAll('.filtro');
    const projetos = document.querySelectorAll('.projeto-card');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => f.classList.remove('filtro--ativo'));
            filtro.classList.add('filtro--ativo');
            
            const categoria = filtro.dataset.filtro;
            
            projetos.forEach(projeto => {
                const categorias = projeto.dataset.categorias.split(' ');
                
                if (categoria === 'todos' || categorias.includes(categoria)) {
                    projeto.style.display = 'block';
                } else {
                    projeto.style.display = 'none';
                }
            });
        });
    });
    
    // Animação de digitação
    const digitarEl = document.querySelector('.digitar');
    if (digitarEl) {
        const textos = ['soluções digitais', 'experiências web', 'sistemas integrados'];
        let i = 0, j = 0, apagando = false;
        
        function digitar() {
            const textoAtual = textos[i];
            
            if (!apagando) {
                digitarEl.textContent = textoAtual.substring(0, j + 1);
                j++;
                if (j === textoAtual.length) {
                    apagando = true;
                    setTimeout(digitar, 1000);
                    return;
                }
            } else {
                digitarEl.textContent = textoAtual.substring(0, j - 1);
                j--;
                if (j === 0) {
                    apagando = false;
                    i = (i + 1) % textos.length;
                }
            }
            setTimeout(digitar, apagando ? 50 : 100);
        }
        setTimeout(digitar, 500);
    }
    
    // Botão voltar ao topo
    const btnTopo = document.querySelector('.botao-topo');
    if (btnTopo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnTopo.style.display = 'block';
            } else {
                btnTopo.style.display = 'none';
            }
        });
        
        btnTopo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
