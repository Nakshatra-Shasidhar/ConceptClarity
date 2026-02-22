from flask import Flask, render_template, request, jsonify
from model import analyze_query

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    query = data.get("query", "")
    result = analyze_query(query)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
