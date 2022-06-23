const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    musicCounter:{
        type:Number,
        default:0
    },
    podcastCounter:{
        type:Number,
        default:0
    },
    audiobookCounter:{
        type:Number,
        default:0
    },
    userCounter:{
        type:Number,
        default:0
    },
    contentCreatorCounter:{
        type:Number,
        default:0
    }
}
    )
module.exports = mongoose.model('counter',counterSchema )