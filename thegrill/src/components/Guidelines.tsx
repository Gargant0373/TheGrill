import "./Guidelines.css";

function Guidelines() {
    const rules = {
        intro: {
            title: "GUIDELINES",
            subtitle: "Let's make something clear...",
            text: "The Grill is not a place for rules. We do not want to have rules when the sun is shining and beer is flowing. However, the last thing we want is to have the police or the fire department showing up. We are not in Romania, be civilized."
        },
        rulesList: [
            {
                title: "GRILLMASTER IS KING",
                text: "The grillmaster is the most important person at the grill. He is the one who makes sure the fire is burning and the meat is cooking. He is the one who feeds you. Always make sure there's someone to help him out"
            },
            {
                title: "NO STUDYING",
                text: "The Grill is a place for fun, not for studying. No laptops or notebooks. They are only allowed for writing poems."
            },
            {
                title: "YOU BRING, YOU EAT",
                text: "The balance of the grill relies on the fact that each individual contributes. If you bring something, you eat something. If you don't bring anything, you eat nothing. Your 'meat' might be enough for your girlfriend, not for us. Only exception from this rule is people who cross the lake swimming."
            },
            {
                title: "TRASH",
                text: "We are not savages. We clean up after ourselves. There are no trash cans around the lake so you're expected to bring some bags yourself."
            },
            {
                title: "SMOKING KILLS",
                text: "We believe in the freedom of lighting up a cigarette. We do not like your cigarette buds. Make sure beer corks and cigarette buns are not left behind."
            },
            {
                title: "MEN SWIM",
                text: "Men must take a bath before leaving the grill. The lake might not be warm, but the soul of the lovely ladies will be."
            }
        ]
    };

    return (
        <div className="rules">
            <div className="rules-header">
                <h1>{rules.intro.title}</h1>
                <p>{rules.intro.text}</p>
            </div>
            <div className="rules-content">
                {rules.rulesList.map((rule, index) => (
                    <Guideline key={index} title={rule.title} text={rule.text} />
                ))}
            </div>
        </div>
    );
}

function Guideline({ title, text }: { title: string; text: string }) {
    return (
        <div className="rule">
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

export default Guidelines;