from flask import Flask, render_template, request, jsonify
from utils import clean_output

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    term = data.get("word")

    if not term or not term.strip():
        return jsonify({
            "explanation": "Please enter a valid scientific term."
        })

    # Placeholder – will be replaced by AI model in Phase 2
    explanation = f"This is a dummy explanation for '{term}'."

    return jsonify({
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(debug=True)
