module.exports = {
  apps: [
    {
      script: "npm start",
    },
  ],

  deploy: {
    production: {
      key: "nextjsnVirg.pem",
      user: "ubuntu",
      host: "3.90.82.236",
      ref: "origin/main",
      repo: "https://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@github.com/DigniteStudios/MaidSimpl-Landing-WebApp.git",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
