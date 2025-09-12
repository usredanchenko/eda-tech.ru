module.exports = {
    apps: [{
        name: 'eda-tech-telegram-bot',
        script: 'telegram-bot.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: 3001
        },
        env_development: {
            NODE_ENV: 'development',
            PORT: 3001
        },
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        error_file: '/var/log/pm2/eda-tech-bot-error.log',
        out_file: '/var/log/pm2/eda-tech-bot-out.log',
        pid_file: '/var/run/pm2/eda-tech-bot.pid',
        merge_logs: true,
        min_uptime: '10s',
        max_restarts: 10,
        exec_mode: 'fork'
    }]
};
