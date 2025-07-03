# Jogo da Velha - Container Docker

Um jogo da velha simples e moderno que pode ser executado em um container Docker.

## Características

- Interface moderna e responsiva
- Sistema de pontuação
- Animações suaves
- Design adaptável para dispositivos móveis
- Fácil de executar com Docker

## Como Executar

### Opção 1: Usando Docker Compose (Recomendado)

1. Certifique-se de que o Docker e Docker Compose estão instalados
2. No diretório do projeto, execute:

```bash
docker-compose up -d
```

3. Acesse o jogo em: http://localhost:8080

### Opção 2: Usando Docker diretamente

1. Construa a imagem:
```bash
docker build -t jogo-velha .
```

2. Execute o container:
```bash
docker run -d -p 8080:80 --name jogo-velha kambura/jogo_velha:latest
```

3. Acesse o jogo em: http://localhost:8080

## Como Jogar

- Clique em qualquer célula vazia para fazer sua jogada
- Os jogadores alternam entre X e O
- O primeiro jogador a alinhar 3 símbolos (horizontal, vertical ou diagonal) vence
- Se todas as células forem preenchidas sem um vencedor, é empate
- Use o botão "Reiniciar Jogo" para começar uma nova partida
- O placar mantém a pontuação de cada jogador

## Comandos Úteis

### Parar o container:
```bash
docker-compose down
```

### Ver logs:
```bash
docker-compose logs jogo-velha
```

### Reconstruir a imagem:
```bash
docker-compose up -d --build
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (com Grid e Flexbox)
- JavaScript (ES6+)
- Nginx (servidor web)
- Docker

## Estrutura do Projeto

```
jogo_velha/
├── index.html      # Estrutura HTML do jogo
├── style.css       # Estilos CSS
├── script.js       # Lógica JavaScript
├── Dockerfile      # Configuração do container
├── docker-compose.yml  # Orquestração do container
└── README.md       # Este arquivo
``` 
