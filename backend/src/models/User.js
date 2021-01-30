const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// name: { type: String, required: true },
// email: { type: String, required: true },
// password: { type: String, required: true }

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        timestamps: true
    });

// Encrypt password
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare user pass with the user pass saved in DB
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);
