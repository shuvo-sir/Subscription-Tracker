import dayjs from "dayjs";


import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js"; 

const REMINDERS = [7, 3, 1]; // Define the reminder intervals in days (e.g., 7 days before, 3 days before, 1 day before)

export const sendReminder = serve(async (context) => {
    const { subscriptionId } = context.requestPlayload; // Extract subscriptionId from the request payload
    const subscription = await fetchSubscription(context, subscriptionId); // Fetch the subscription details using the provided subscriptionId


    if (!subscription || !subscription.status === "active") return; // If the subscription doesn't exist or the subscription is not active, exit the function

    const renewalDate = dayjs(subscription.renewalDate); // Convert the renewal date to a dayjs object for easier manipulation

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has expired. No reminder sent.`); // Log that the subscription has expired and no reminder will be sent
        return;
    }


    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, "day"); // Calculate the date to send the reminder by subtracting daysBefore from the renewal date

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate); // Sleep until the calculated reminder date
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`); // Trigger the reminder action (e.g., send email, SMS, push notification)
    }
});



const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", () => {
        return Subscription.findById(subscriptionId).populate("user", "email name"); // Fetch the subscription from the database and populate the user field with email and name
    });
}


const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate()); // Sleep until the specified reminder date
}


const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // sent email, sms, push notification etc. to the user
    });
};