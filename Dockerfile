# Usar nginx como servidor web
FROM nginx:alpine

# Copiar os arquivos do jogo para o diretório padrão do nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expor a porta 80
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"] 