module.exports = class Party {
    constructor(host, code) {
        this.host = host;
        this.guest = null;
        this.code = code;
        this.messages = [];
        this.createdAt = new Date();
    }

    static generateCode() {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    addUser(user) {
        if (this.isFull()) return false;
        
        if (!this.guest) {
            this.guest = user;
            return true;
        }
        return false;
    }

    sendMessage(user, content) {
        if (!this.isValidUser(user)) return false;
        
        this.messages.push({
            user: user,
            content: content,
            timestamp: new Date()
        });
        return true;
    }

    isValidUser(user) {
        return user === this.host || user === this.guest;
    }

    isFull() {
        return !!this.guest;
    }

    getUsers() {
        return {
            host: this.host,
            guest: this.guest
        };
    }
};