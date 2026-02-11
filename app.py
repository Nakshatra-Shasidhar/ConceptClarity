from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    word = data.get("word")

    dummy_text = f"This is a dummy explanation for '{word}'."

    return jsonify({
        "explanation": dummy_text
    })

if __name__ == "__main__":
    app.run(debug=True)
