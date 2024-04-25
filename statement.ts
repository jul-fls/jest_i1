interface Performance {
    playID: string;
    audience: number;
}

interface Play {
    name: string;
    type: string;
}

interface Invoice {
    customer: string;
    performances: Performance[];
}

interface Plays {
    [key: string]: Play;
}

// Helper function to format currency values
function formatAsUSD(number: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(number);
}

// Function to calculate the amount for a single performance
function amountFor(perf: Performance, play: Play): number {
    let thisAmount = 0;
    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

// Function to calculate volume credits for a single performance
function volumeCreditsFor(perf: Performance, play: Play): number {
    let volumeCredits = Math.max(perf.audience - 30, 0);
    if (play.type === "comedy") {
        volumeCredits += Math.floor(perf.audience / 5);
    }
    return volumeCredits;
}

// The main statement function
function statement(invoice: Invoice, plays: Plays): string {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        const thisAmount = amountFor(perf, play);
        volumeCredits += volumeCreditsFor(perf, play);
        result += ` ${play.name}: ${formatAsUSD(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${formatAsUSD(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

export default statement;