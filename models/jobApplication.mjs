import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
    company:{type: String, required: true},
    position:{type: String, required: true},
    status:{type: String, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'], default: 'Applied'},
    dateApplied:{type: Date, default: Date.now},
    jobLink: {type: String},
    notes:{type: String}
})

const Application = mongoose.model('Application', ApplicationSchema)

export default Application 