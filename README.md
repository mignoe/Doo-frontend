# Doo - Sistema de Gerenciamento de Tarefas

Este é um sistema web desenvolvido com Angular para gerenciar tarefas colaborativas. A ideia é facilitar a gestão de tarefas usando projetos com diversos usuários colaborando para a realização delas. As tarefas são agrupadas em sessões para facilitar a organização.

Cada projeto pode ter múltiplos usuários, que podem ser designados como usuários comuns ou administradores, permitindo um gerenciamento das permissões. Os administradores têm a capacidade de criar novas sessões, adicionar usuários e administradores ao projeto, enquanto os usuários comuns (assim como os administradores) podem criar tarefas marcá-las como concluídas e acompanhar o status (concluída ou não) de cada uma delas.

O sistema oferece uma interface intuitiva que facilita a navegação entre projetos e sessões, garantindo que todos os membros da equipe possam acessar rapidamente as informações necessárias.

## Instalação Back-end

1. Clone o repositório:

git clone https://github.com/mignoe/Doo.git

2. Acesse o diretório do projeto:

cd Doo

3. Instale as dependências:

npm install

## Execute o back-end

Execute os seguintes comandos:

npm run build

npm run start


## Instalação Front-end

1. Clone o repositório:

git clone https://github.com/mignoe/Doo-frontend.git

2. Acesse o diretório do projeto:

cd Doo-frontend

3. Instale o angular

npm install -g @angular/cli

4. Instale as dependências:

npm install


## Execução do front end

Para funcionar corretamente, por favor execute o back end como especificado anteriormente

Para iniciar o projeto, execute:

ng serve


Abra http://localhost:4200 em qualquer navegador.
