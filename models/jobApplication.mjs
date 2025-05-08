import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company:{type: String, },
    position:{type: String, },
    status:{type: String, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'], default: 'Applied'},
    dateApplied:{type: Date, default: Date.now},
    jobLink: {type: String},
    notes:{type: String}
})

const Application = mongoose.model('Application', ApplicationSchema)

export default Application 