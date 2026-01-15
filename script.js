// ============================================
// CONFIGURAÇÕES INICIAIS E ELEMENTOS DO DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio carregado! ✨');

    // --- Elementos Principais ---
    const botaoMenuMobile = document.querySelector('.cabecalho__botao-menu');
    const menuNavegacao = document.querySelector('.cabecalho__menu');
    const botaoTema = document.querySelector('.botao-tema');
    const botaoTopo = document.querySelector('.botao-topo');
    const formularioContato = document.getElementById('formContato');
    const filtrosProjetos = document.querySelectorAll('.filtro');
    const cardsProjeto = document.querySelectorAll('.projeto-card');
    const spanAnoAtual = document.getElementById('ano-atual');

    // ============================================
    // 1. MENU MOBILE (Hambúrguer)
    // ============================================
    if (botaoMenuMobile && menuNavegacao) {
        botaoMenuMobile.addEventListener('click', function() {
            // Alterna a classe 'ativo' no menu e no botão
            menuNavegacao.classList.toggle('ativo');
            botaoMenuMobile.classList.toggle('ativo');
            
            // Atualiza o atributo aria-expanded para acessibilidade
            const estaAberto = menuNavegacao.classList.contains('ativo');
            botaoMenuMobile.setAttribute('aria-expanded', estaAberto);
            
            // Opcional: Fecha o menu ao clicar em um link
            const linksMenu = menuNavegacao.querySelectorAll('a');
            linksMenu.forEach(link => {
                link.addEventListener('click', () => {
                    menuNavegacao.classList.remove('ativo');
                    botaoMenuMobile.classList.remove('ativo');
                    botaoMenuMobile.setAttribute('aria-expanded', 'false');
                });
            });
        });
    }

    // ============================================
    // 2. CONTROLE DE TEMA (Claro/Escuro)
    // ============================================
    if (botaoTema) {
        // Verifica a preferência salva no localStorage ou do sistema
        const temaSalvo = localStorage.getItem('temaPortfolio');
        const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Aplica o tema salvo ou a preferência do sistema
        if (temaSalvo === 'escuro' || (!temaSalvo && prefereEscuro)) {
            document.body.classList.add('modo-escuro');
            botaoTema.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71c0-1.69.53-3.26 1.438-4.56a.75.75 0 0 1 .12-.804zm2.5 1.378a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-5.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"/>
            </svg>`; // Ícone de sol (para voltar ao claro)
        } else {
            botaoTema.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7 7 0 1 0 14.53 10.53"/>
            </svg>`; // Ícone de lua (para ir ao escuro)
        }

        // Evento de clique para alternar o tema
        botaoTema.addEventListener('click', function() {
            const estaEscuro = document.body.classList.toggle('modo-escuro');
            
            // Atualiza o ícone do botão
            if (estaEscuro) {
                botaoTema.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71c0-1.69.53-3.26 1.438-4.56a.75.75 0 0 1 .12-.804zm2.5 1.378a.75.75 0 1 0 0 1.5.75.75 0 1 0 0-1.5m-5.5 0a.75.75 0 1 0 0 1.5.75.75 0 1 0 0-1.5"/>
                </svg>`;
                localStorage.setItem('temaPortfolio', 'escuro');
            } else {
                botaoTema.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7 7 0 1 0 14.53 10.53"/>
                </svg>`;
                localStorage.setItem('temaPortfolio', 'claro');
            }
        });
    }

    // ============================================
    // 3. FILTRO DE PROJETOS POR TECNOLOGIA
    // ============================================
    if (filtrosProjetos.length > 0 && cardsProjeto.length > 0) {
        filtrosProjetos.forEach(filtro => {
            filtro.addEventListener('click', function() {
                // Remove a classe ativa de todos os filtros
                filtrosProjetos.forEach(f => f.classList.remove('filtro--ativo'));
                // Adiciona a classe ativa no filtro clicado
                this.classList.add('filtro--ativo');
                
                const categoriaSelecionada = this.getAttribute('data-filtro');
                
                // Filtra os projetos
                cardsProjeto.forEach(card => {
                    const categoriasCard = card.getAttribute('data-categorias').split(' ');
                    
                    if (categoriaSelecionada === 'todos' || categoriasCard.includes(categoriaSelecionada)) {
                        card.style.display = 'flex';
                        // Pequena animação de fade in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // 4. FORMULÁRIO DE CONTATO (Simulação)
    // ============================================
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Impede o envio tradicional
            
            // Coleta os dados do formulário
            const dadosFormulario = new FormData(formularioContato);
            const nome = dadosFormulario.get('nome');
            const email = dadosFormulario.get('email');
            const mensagem = dadosFormulario.get('mensagem');
            
            // Validação básica
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simula o envio (em um projeto real, integraria com Formspree, EmailJS, etc.)
            console.log('📨 Dados do formulário (simulação):', { nome, email, mensagem });
            
            // Feedback visual para o usuário
            const botaoEnviar = formularioContato.querySelector('button[type="submit"]');
            const textoOriginal = botaoEnviar.textContent;
            
            botaoEnviar.textContent = 'Enviando...';
            botaoEnviar.disabled = true;
            
            // Simula uma requisição assíncrona
            setTimeout(() => {
                alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve entrarei em contato pelo e-mail ${email}.`);
                formularioContato.reset();
                botaoEnviar.textContent = textoOriginal;
                botaoEnviar.disabled = false;
            }, 1500);
        });
    }

    // ============================================
    // 5. BOTÃO "VOLTAR AO TOPO"
    // ============================================
    if (botaoTopo) {
        // Mostra/esconde o botão baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                botaoTopo.classList.add('visivel');
            } else {
                botaoTopo.classList.remove('visivel');
            }
        });
        
        // Evento de clique para voltar ao topo suavemente
        botaoTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 6. ATUALIZAÇÃO DO ANO NO RODAPÉ
    // ============================================
    if (spanAnoAtual) {
        spanAnoAtual.textContent = new Date().getFullYear();
    }

    // ============================================
    // 7. ANIMAÇÃO DE DIGITAÇÃO NO HERO (Bônus)
    // ============================================
    const tituloHero = document.querySelector('.hero__titulo .destaque');
    if (tituloHero && window.innerWidth > 768) {
        const textos = ['soluções digitais', 'experiências web', 'sistemas integrados', 'produtos escaláveis'];
        let indiceTexto = 0;
        let indiceCaractere = 0;
        let estaApagando = false;
        let velocidade = 100; // ms por caractere
        
        function digitarTexto() {
            const textoAtual = textos[indiceTexto];
            
            if (!estaApagando) {
                // Modo digitação
                tituloHero.textContent = textoAtual.substring(0, indiceCaractere + 1);
                indiceCaractere++;
                
                if (indiceCaractere === textoAtual.length) {
                    estaApagando = true;
                    velocidade = 1000; // Pausa no final
                }
            } else {
                // Modo apagando
                tituloHero.textContent = textoAtual.substring(0, indiceCaractere - 1);
                indiceCaractere--;
                
                if (indiceCaractere === 0) {
                    estaApagando = false;
                    indiceTexto = (indiceTexto + 1) % textos.length;
                    velocidade = 100;
                }
            }
            
            setTimeout(digitarTexto, velocidade);
        }
        
        // Inicia a animação após um breve delay
        setTimeout(digitarTexto, 1000);
    }

    // ============================================
    // 8. ANIMAÇÃO DE APARECIMENTO SUAVE NAS SEÇÕES
    // ============================================
    const observerOpcoes = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            }
        });
    }, observerOpcoes);
    
    // Observa todas as seções principais
    document.querySelectorAll('section').forEach(secao => {
        secao.classList.add('oculto-transicao');
        observer.observe(secao);
    });

    // Adiciona uma classe inicial para animação
    document.body.classList.add('carregado');
});

// Adiciona esta regra CSS dinamicamente para a animação de aparecimento
const estiloAnimacao = document.createElement('style');
estiloAnimacao.textContent = `
    .oculto-transicao {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .visivel {
        opacity: 1;
        transform: translateY(0);
    }
    
    body.carregado * {
        transition: background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease;
    }
`;
document.head.appendChild(estiloAnimacao);
