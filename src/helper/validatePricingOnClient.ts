/* eslint-disable @typescript-eslint/no-explicit-any */

export const validatePricingOnClient = (formData: FormData) => {
    const pricings: any[] = [];
    let p = 0;

    // Extract pricings from FormData to an array
    while (formData.has(`tourPricings[${p}][minGuests]`)) {
        pricings.push({
            minGuests: Number(formData.get(`tourPricings[${p}][minGuests]`)),
            maxGuests: Number(formData.get(`tourPricings[${p}][maxGuests]`)),
        });
        p++;
    }

    // Run the Overlap Check
    for (let i = 0; i < pricings.length; i++) {
        for (let j = i + 1; j < pricings.length; j++) {
            const tier1 = pricings[i];
            const tier2 = pricings[j];

            if (
                tier1.minGuests <= tier2.maxGuests &&
                tier1.maxGuests >= tier2.minGuests
            ) {
                const overlapStart = Math.max(tier1.minGuests, tier2.minGuests);
                const overlapEnd = Math.min(tier1.maxGuests, tier2.maxGuests);

                // 2. Format the message based on whether it's a single number or a range
                const overlapStr = overlapStart === overlapEnd
                    ? `"${overlapStart} guests"`
                    : `"${overlapStart} to ${overlapEnd} guests"`;
                return `Conflict Detected!
    
    You have two rules that cover ${overlapStr}:
    • Tier A: ${tier1.minGuests} - ${tier1.maxGuests} guests
    • Tier B: ${tier2.minGuests} - ${tier2.maxGuests} guests
    
    The system won't know which price to charge for this group size.
    👉 Fix: Please adjust the numbers so they don't touch or overlap (e.g., 1-4 and 5-10).`;
                // Return the error message if found
                // return `Pricing tiers overlap: [${tier1.minGuests}-${tier1.maxGuests}] and [${tier2.minGuests}-${tier2.maxGuests}]`;
            }
        }
    }
    return null; // No errors
};


