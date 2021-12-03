import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
})

const Country = mongoose.model('Countries', countrySchema);

export default Country;
