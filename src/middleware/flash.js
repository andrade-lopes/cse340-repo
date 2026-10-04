const flashMiddleware = (req, res, next) => {
    if (!req.session.flash) {
        req.session.flash = {
            success: [],
            error: [],
            warning: [],
            info: []
        };
    }

    req.flash = (...args) => {
        if (args.length === 2) {
            const [type, message] = args;

            if (!req.session.flash[type]) {
                req.session.flash[type] = [];
            }

            req.session.flash[type].push(message);
            return;
        }

        if (args.length === 1) {
            const [type] = args;
            const messages = req.session.flash[type] || [];

            req.session.flash[type] = [];

            return messages;
        }

        const messages = { ...req.session.flash };

        Object.keys(req.session.flash).forEach((type) => {
            req.session.flash[type] = [];
        });

        return messages;
    };

    next();
};

const flashViewMiddleware = (req, res, next) => {
    res.locals.flash = req.flash;
    next();
};

export {
    flashMiddleware,
    flashViewMiddleware
};