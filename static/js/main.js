function sendQuery() {
    const query = document.getElementById("queryInput").value;

    fetch("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("resultBox").innerText = data.result;
    });
}
