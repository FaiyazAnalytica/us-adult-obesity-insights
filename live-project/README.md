# Live Project

Static interactive dashboard organized for GitHub Pages.

**Live demo:** [https://faiyazanalytica.github.io/us-adult-obesity-insights/](https://faiyazanalytica.github.io/us-adult-obesity-insights/)

```text
live-project/
├── index.html
└── assets/
    ├── css/styles.css
    └── js/app.js
```

The repository-root `index.html` redirects visitors to this folder, allowing GitHub Pages to publish from the `main` branch root. Chart.js, D3, TopoJSON, Google Fonts, and map geometry load from public CDNs.

The optional AI-advisor demonstration asks users for their own API key in the browser. For a production deployment, replace this with a server-side proxy and never store secrets in client code.
