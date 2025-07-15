# Jogo da Velha Moderno

Um jogo da velha web responsivo, personalizável, com efeitos, PWA, som de vitória e modo contra o computador.

## Funcionalidades
- Jogar X vs O ou contra o computador (IA simples)
- Efeitos de fogos de artifício ao vencer
- Som de vitória customizável (`vitoria.mp3`)
- Temas claro/escuro e cores personalizáveis
- Placar persistente e opção de zerar
- PWA: instalável no celular e funciona offline
- Preferências e estado do jogo salvos automaticamente

## Como rodar

### Python (simples)
```bash
python3 -m http.server 8081
```
Acesse: [http://localhost:8081/](http://localhost:8081/)

### Docker Compose
```bash
docker compose up -d
```
Acesse: [http://localhost:8081/](http://localhost:8081/)

> **Atenção:**
> - O arquivo `vitoria.mp3` deve estar na mesma pasta do projeto para o som de vitória funcionar.
> - Se acessar [http://localhost:8081/vitoria.mp3](http://localhost:8081/vitoria.mp3) e ouvir o som, está tudo certo!

## Personalização
- **Temas:** Claro, escuro e temas coloridos no menu de configurações.
- **Cores:** Escolha as cores do X, O e do tabuleiro.
- **Modo IA:** Ative "Jogar contra o computador" para desafiar a máquina.
- **Som de vitória:** Ative/desative no menu. Use seu próprio `vitoria.mp3`.
- **Zerar placar:** Botão no menu de configurações.

## PWA (Instalável)
- No celular ou desktop, clique em "Instalar App" ou "Adicionar à tela inicial" no navegador.
- Funciona offline após o primeiro acesso.

## Dicas
- O áudio só toca após o primeiro clique/touch na página (limitação dos navegadores).
- Todas as preferências e o estado do jogo são salvos automaticamente (inclusive após F5).
- Se o som não tocar, confira se o arquivo está presente e se o navegador permite áudio.

## Estrutura do Projeto
```
├── docker-compose.yml
├── Dockerfile
├── index.html
├── script.js
├── style.css
├── manifest.json
├── sw.js
├── vitoria.mp3  # (adicione seu arquivo de áudio aqui)
└── README.md
```

---

Feito com ❤️ para diversão e aprendizado! 