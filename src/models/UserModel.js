/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            default: "",
        },
        roles: [{
            type: String,
            default: "Customer",
        }],
        image: {
            type: String,
            require: true,
        },
        active: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNumber',
    start_seq: 1
});

module.exports = mongoose.model('User', userSchema);


/*user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
}*/