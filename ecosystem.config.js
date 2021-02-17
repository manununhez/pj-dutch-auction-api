module.exports = {
  apps : [{
        name: 'dutch-auction',
        script: './server-pj-auction.js',
        watch: true,
        env_production: {
            "PORT": 5001,
            "NODE_ENV": "production",
        }
  }],
};
