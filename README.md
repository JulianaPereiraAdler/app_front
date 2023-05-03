# Sistema de Controle e Classificação de Termos de Compromisso da CVM (MVP - Sprint 1) 

Esta API foi desenvolvida para entrega do MVP da Sprint 1 da Pós-Graduação em Engenharia de Software, PUC-RIO. 

O Sistema Controle Termos de Compromisso CVM é uma ferramenta desenvolvida em python para auxiliar as áreas de compliance de gestoras de investimentos. A sua funcionalidade principal é permitir o controle e a classificação dos termos de compromisso publicados pela CVM, garantindo que o compliance das gestoras estejam sempre atualizadas sobre o que está sendo julgado pela CVM e assim possam tomar providencias preventivas, evitando futuros erros.

A aplicação foi desenvolvida em HTML, CSS e JS e consome informações através de um API, desenvolvida em Flask e Python.

Utilizando de uma função de scrapping com Beautiful Soup, o sistema atualiza o banco de dados automaticamente com as informações disponíveis no site https://conteudo.cvm.gov.br/termos_compromisso/index.html. Além disso, ela oferece diversas funcionalidades, incluindo a possibilidade de adicionar, editar e deletar informações, a criação de _tags_ para facilitar a busca e filtragem dos termos de compromisso, e um acompanhamento das atividades realizadas em cada termo.

Outra funcionalidade importante é a possibilidade de resumir os pareceres dos termos de compromisso publicados. Isso pode ser feito passando a chave da API do Chat GPT como parâmetro ao realizar o login na aplicação. Essa funcionalidade utiliza tecnologia de processamento de linguagem natural para resumir os pareceres e fornecer um resumo enxuto.

## Como executar

Antes de poder usar a aplicação localmente, é preciso baixar o projeto da API no link abaixo e seguir as orientações de execução (no readme do repositório):

```
https://github.com/JulianaPereiraAdler/app_api.git
```

Quando estiver com a API executando, baixe este projeto e execute o arquivo index.html

Obs. É importante estar conectado a internet para ativar todas as libs.
