from flask import Flask, render_template, request, jsonify
from model import generate_text
from prompt import build_prompt
from utils import clean_output

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    term = data.get("word")

    # Handle empty input
    if not term or not term.strip():
        return jsonify({
            "explanation": "Please enter a valid scientific term."
        })

    try:
        # Step 1: Build prompt
        prompt = build_prompt(term)

        # Step 2: Generate AI output
        raw_output = generate_text(prompt)

        # Step 3: Clean output
        explanation = clean_output(raw_output)

    except Exception as e:
        explanation = "AI model failed. Please try again."

    return jsonify({
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(debug=True)

