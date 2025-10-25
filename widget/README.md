# Lightweight Comment Widget

## Descrição

Widget de comentários leve e eficiente usando Web Components e PicoCSS. Desenvolvido para ser simples de integrar, rápido e compatível com uma ampla variedade de browsers e dispositivos.

Para documentação completa, consulte o [guia completo](../docs/COMPREHENSIVE_GUIDE.md) na pasta docs.

## Tecnologias

- JavaScript vanilla
- Web Components (Custom Elements + Shadow DOM)
- PicoCSS
- Fetch API
- HTML5

## Funcionalidades

- Carregar e exibir comentários
- Envio de novos comentários
- Validação de formulário
- Design responsivo
- Compatibilidade com browsers modernos
- Suporte a Markdown básico (negrito, itálico, links, cabeçalhos, código)

## Instalação

1. Adicione o arquivo JavaScript do widget à sua página:
   ```html
   <script src="dist/comment-widget.min.js"></script>
   ```

1.2. Adicione o CSS minificado:
   ```html
   <link rel="stylesheet" href="dist/widget.min.css">
   ```

2. Adicione o elemento do widget onde desejar exibir os comentários:
   ```html
   <comment-widget thread-id="123"></comment-widget>
   ```

## Configurações

| Atributo | Descrição |
|----------|-----------|
| `thread-id` | ID do tópico de comentários |
| `api-base-url` | URL base da API (opcional, padrão: `/api`) |

## Desenvolvimento

### Estrutura de Arquivos

```
lightweight-comment-widget/
├── README.md
├── index.html
├── src/
│   └── comment-widget.js
├── css/
│   ├── pico.min.css
│   └── widget.css
└── dist/
    ├── comment-widget.min.js
    └── widget.min.css
```

### Scripts

- `npm run build` - Compilação e minificação do widget
- `npm run dev` - Servidor de desenvolvimento com hot reload