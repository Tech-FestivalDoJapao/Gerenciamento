<div align="right">
  <img alt="GitHub Repository size" src="https://img.shields.io/github/repo-size/Tech-FestivalDoJapao/Gerenciamento">
  <img alt="CodeQL badge" src="https://github.com/Tech-FestivalDoJapao/Gerenciamento/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main">
</div>

# FJ Tech
O aplicativo FJ Tech visa atender as necessidades gerenciais identificadas no Festival do Japão, agilizando os processos referentes à gestão de voluntários e dos recursos utilizados por eles, como a distribuição de uniformes (hapis) e vouchers, para as próximas edições do evento

> [!IMPORTANT]
> Atualmente, o sistema está disponível apenas para **plataformas web**, de modo que é possível acessá-lo através dos links abaixo:
> - [Sistema de Gerenciamento](https://tech-festivaldojapao.github.io/Gerenciamento) 
>   - [Ficha de Inscrição para Voluntários](https://tech-festivaldojapao.github.io/Gerenciamento/voluntario.html) 
>   - [Ficha de Disponibilidade do Voluntário](https://tech-festivaldojapao.github.io/Gerenciamento/horas.html)

## Estrutura 
O esquema abaixo representa a estrutura de pastas do projeto:
```sh
fj-tech/
├── dist/
│   └── index.html
├── src/
│   ├── js/
│   │   ├── estandes/
│   │   ├── recursos/
│   │   ├── voluntarios/
│   │   │   └── festival/
│   │   └── main.js
│   └── scss/
│       └── styles.scss
├── test/
├── package-lock.json
├── package.json
└── webpack.config.js
```
> <small> Apenas os principais arquivos foram listados, navegue pelos diretórios para ver a estruturação dos arquivos na íntegra </small>

### Como rodar o projeto localmente
```sh
git clone https://github.com/Tech-FestivalDoJapao/Gerenciamento.git
cd fj-tech
npm install
npm run dev
```
