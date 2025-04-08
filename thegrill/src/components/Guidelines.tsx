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
                title: "The Grillmaster is King",
                text: "He controls the fire, the feast, and your fate. Respect him, or be left hungry."
            },
            {
                title: "No Studying",
                text: "Just chewing, books and laptops stay home"
            },
            {
                title: "You Bring, You Eat, You Drink",
                text: "We believe in generosity, not freeloading. Bring enough to share, but don’t come empty-handed."
            },
            {
                title: "No Trash Left Behind",
                text: "Clean up your bones, ashes, and bottles. We may be wild, but we leave no mess."
            },
            {
                title: "Smoke If You Must, But Don’t Litter",
                text: "The fire burns bright, but cigarette butts don’t belong in the embers. Even less so on the ground."
            },
            {
                title: "Take the Plunge",
                text: "Before you leave, take a dip in the lake. Wash off the smoke, the sweat, and the sins of The Grill."
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