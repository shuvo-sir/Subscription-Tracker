import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        minlength: [3, "Subscription Name must be at least 3 characters long"],
        maxlength: [50, "Subscription Name must be at most 50 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Subscription Price is required"],
        min: [0, "Subscription Price must be a positive number"],
        max: [10000, "Subscription Price must be at most 10000"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "BDT", "INR", "CNY", "CHF", "SEK", "NZD"],
        default: "BDT",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["Entertainment", "Productivity", "Health & Fitness", "Education", "News & Magazines", "Social Media", "Utilities", "Other"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "cancelled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start Date must be in the past",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal Date must be after the Start Date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
        index: true, // Create an index on the user field for faster queries
    }


}, {timestamps : true,});


// auto calculate renewalDate based on startDate and frequency
subscriptionSchema.pre('save', function(next) {
    if (this.startDate && this.frequency) {
        const startDate = new Date(this.startDate);
        let renewalDate;

        switch (this.frequency) {
            case "daily":
                renewalDate = new Date(startDate);
                renewalDate.setDate(startDate.getDate() + 1);
                break;
            case "weekly":
                renewalDate = new Date(startDate);
                renewalDate.setDate(startDate.getDate() + 7);
                break;
            case "monthly":
                renewalDate = new Date(startDate);
                renewalDate.setMonth(startDate.getMonth() + 1);
                break;
            case "yearly":
                renewalDate = new Date(startDate);
                renewalDate.setFullYear(startDate.getFullYear() + 1);
                break;
            default:
                throw new Error("Invalid frequency");
        }

        this.renewalDate = renewalDate;
    }
    next();
    // auto update the status if renewalDate has passed
    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = "inactive";
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;